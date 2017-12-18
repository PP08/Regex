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
    // var input = document.getElementById('input-regex-tab2').value;
    // var result_txtarea = document.getElementById('textarea-result-tab2');
    // var state = document.getElementsByClassName('matching-state-tab2')[0];
    // if (checkRegExp(input)) {
    //     document.getElementById('input-regex-tab2').style.color = "green";
    //     // var patt = new RegExp(input);
    //     var regex = /\/(.*)\/(.*)$/;
    //     var found = input.match(regex);
    //     var patt = new RegExp(found[1], found[2]);
    //     var text = document.getElementById('textarea-tab2').value;
    //     console.log(text);
    //     var replace_str = document.getElementById('input-for-replacing').value;
    //     if (text.length > 0){
    //         var result = text.replace(patt, replace_str);
    //         console.log(result);
    //         result_txtarea.innerHTML = result;
    //         var ref_text = document.getElementById('textarea-ref-tab2').value;
    //         var pattern = new RegExp('^' + ref_text + '$');
    //         var match = pattern.test(result);
    //         if (match) {
    //             state.style.backgroundColor = 'greenyellow';
    //         }else {
    //             state.style.backgroundColor = 'red';
    //         }
    //     }else {
    //         result_txtarea.innerHTML = '';
    //     }
    // }
    // else {
    //     document.getElementById('input-regex-tab2').style.color = "red";
    //     result_txtarea.innerHTML = '';
    //     state.style.backgroundColor = 'grey';
    // }
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

            }else if(input.length === 0){
                result_input_box.value = '';
            }
        }
    }
    else {
        document.getElementById('input-regex-tab2').style.color = "red";
        // var states = document.getElementsByClassName('matching-state');
        // for (var j = 0; j < states.length; j++) {
        //     states[j].style.backgroundColor = "grey";
        // }
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