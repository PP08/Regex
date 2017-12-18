function addNewLine() {
    var $area = $(document.getElementById('samples'));
    // var input = document.getElementById('input').value;

    var d = new Date();
    var time = d.getTime();
    $area.append('<div id="' + time + '" style="display: none; margin-top: 20px;"></div>');
    var $new = $('#' + time);
    $new.append('<div class="row">' +
        '<div class="col-3"></div>' +
        '<div class="col-3"><input class="input-sample-tab1" type="text" oninput="check()" placeholder="Enter your sample here..."></div>' +
        '<div class="col-1"><div class="matching-state"></div></div>' +
        '<div class="col-2"><button class="btn-remove-sample" onClick="removeLine(event)">Remove</button></div>' +
        '</div>');
    $new.fadeIn(1000);

}

function removeLine(event) {
    var $target = $(event.currentTarget.parentNode.parentNode);
    $target.slideUp("slow", function () {
        $target.fadeOut(1000)
    });
    setTimeout(function () {
        $target.remove();
    }, 1000);
}

function removeLastLine(event) {
    var $target = $("#samples").children().last();
    $target.slideUp("slow", function () {
        $target.fadeOut(1000);
    });
    setTimeout(function () {
        $target.remove();
    }, 500);
}

function check() {
    var input = document.getElementById('input-regex-tab1').value;

    if (checkRegExp(input)) {
        document.getElementById('input-regex-tab1').style.color = "green";
        var samples = document.getElementsByClassName('input-sample-tab1');
        for (var i = 0; i < samples.length; i++) {
            var str = (samples[i].value);
            var state = samples[i].parentNode.parentNode.getElementsByClassName('matching-state')[0];
            if (str.length > 0 && input.length > 0) {
                var regex = /\/(.*)\/(.*)$/;
                var found = input.match(regex);
                var patt = new RegExp(found[1], found[2]);
                var result = patt.test(str);
                if (result) {
                    state.style.backgroundColor = "greenyellow";
                } else {
                    state.style.backgroundColor = "crimson";
                }

            } else {
                state.style.backgroundColor = "grey";
            }
        }
    }
    else {
        document.getElementById('input-regex-tab1').style.color = "red";
        var states = document.getElementsByClassName('matching-state');
        for (var j = 0; j < states.length; j++) {
            states[j].style.backgroundColor = "grey";
        }
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