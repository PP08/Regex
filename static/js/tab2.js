function rendDefaultSamplesTab2() {
    var $area = $(document.getElementById('samples-2'));
    $.getJSON("/samples/2.json", function (json) {
        var regex = json.regex;
        var input = document.getElementById('input-regex-tab1');
        input.value = regex;
        input.style.color = 'green';

        json.values.forEach(function (sample) {
            var d = new Date();
            var time = d.getTime();
            $area.append('<div id="' + time + '" style="display: none; margin-top: 20px;"></div>');
            var $new = $('#' + time);
            var color;
            if (sample.answer === sample.expectation) {
                color = "greenyellow";
            } else {
                color = "crimson";
            }

            $new.append('<div class="row">' +
                '<div class="col-1"></div>' +
                '<div class="col-3"><input class="input-sample-tab2" type="text" oninput="check_tab2()" placeholder="Enter your sample here..." value="'+ sample.regex + '"></div>' +
                '<div class="col-3"><input class="result-sample-tab2" type="text" disabled placeholder="Result of replacing" value="' + sample.answer + '" style="background-color: '+ color +'"></div>' +
                '<div class="col-3"><input class="ref-sample-tab2" type="text" oninput="check_tab2()" placeholder="Reference" value="' + sample.expectation +  '"></div>' +
                '<div class="col-1"><button class="btn-remove-sample" onClick="removeSample(event)">Remove</button></div>' +
                '</div>');
            $new.fadeIn(1000);

        }); // this will show the info it in firebug console
    });
}

rendDefaultSamplesTab2();

function addNewSample() {
    var $area = $(document.getElementById('samples-2'));
    // var input = document.getElementById('input').value;

    var d = new Date();
    var time = d.getTime();
    $area.append('<div id="' + time + '" style="display: none; margin-top: 20px;"></div>');
    var $new = $('#' + time);
    $new.append('<div class="row">' +
        '<div class="col-1"></div>' +
        '<div class="col-3"><input class="input-sample-tab2" type="text" oninput="check_tab2()" placeholder="Enter your sample here..."></div>' +
        '<div class="col-3"><input class="result-sample-tab2" type="text" disabled placeholder="Result of replacing"></div>' +
        '<div class="col-3"><input class="ref-sample-tab2" type="text" oninput="check_tab2()" placeholder="Reference"></div>' +
        '<div class="col-1"><button class="btn-remove-sample" onClick="removeSample(event)">Remove</button></div>' +
        '</div>');
    $new.fadeIn(1000);

}

function removeSample(event) {
    var $target = $(event.currentTarget.parentNode.parentNode);
    $target.slideUp("slow", function () {
        $target.fadeOut(1000);
    });
    setTimeout(function () {
        $target.remove();
    }, 1000);
}

function removeLastSample(event) {
    var $target = $("#samples-2").children().last();
    $target.slideUp("slow", function () {
        $target.fadeOut(1000);
    });
    setTimeout(function () {
        $target.remove();
    }, 500);
}

function check_tab2() {
    var input_regex = document.getElementById('input-regex-tab2').value;
    var replacing_input = document.getElementById('input-for-replacing').value;

    if (checkRegExp(input_regex)) {
        document.getElementById('input-regex-tab2').style.color = "green";
        var samples = document.getElementsByClassName('input-sample-tab2');
        for (var i = 0; i < samples.length; i++) {
            var input = (samples[i].value);
            var result_input_box = samples[i].parentNode.parentNode.getElementsByClassName('result-sample-tab2')[0];
            var ref_text = samples[i].parentNode.parentNode.getElementsByClassName('ref-sample-tab2')[0].value;
            if (input.length > 0 && input_regex.length > 0) {
                var regex = /\/(.*)\/(.*)$/;
                var found = input_regex.match(regex);
                var patt = new RegExp(found[1], found[2]);
                var result_text = input.replace(patt, replacing_input);
                result_input_box.value = result_text;

                var pattern = new RegExp('^' + result_text + '$');
                var match = pattern.test(ref_text);
                if (match) {
                    result_input_box.style.backgroundColor = 'greenyellow';
                } else {
                    result_input_box.style.backgroundColor = 'red';
                }

            } else if (input.length === 0) {
                result_input_box.value = '';
            }
        }
    }
    else {
        document.getElementById('input-regex-tab2').style.color = "red";
    }
}

function checkRegExp(value) {
    var regex = /^\/.*\/(?:([igmy])(?!\1)){0,4}$/;
    if (regex.test(value)) {
        return true;
    } else {
        return false;
    }
}