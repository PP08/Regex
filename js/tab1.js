function addNewLine() {
    var $area = $(document.getElementById('samples'));
    // var input = document.getElementById('input').value;

    var d = new Date();
    var time = d.getTime();
    $area.append('<div id="' + time + '" style="display: none; margin-top: 20px;"></div>');
    var $new = $('#' + time);
    // area.innerHTML += '<div id="test">'+ input +'<span><button onClick="removeLine(event)">Remove - </button></span></div>';
    $new.append('<div class="row">' +
        '<div class="col-3"></div>' +
        '<div class="col-3"><input class="input-sample-tab1" type="text" oninput="check()" placeholder="Enter your sample here..."></div>' +
        '<div class="col-1"><div class="matching-state"></div></div>' +
        '<div class="col-2"><button class="btn-remove-sample-tab1" onClick="removeLine(event)">Remove</button></div>' +
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
        $target.fadeOut(1000)
    });
    setTimeout(function () {
        $target.remove();
    }, 500);
}

function check() {
    var input = document.getElementById('input-regex-tab1').value;
    var patt = new RegExp(input);
    console.log(patt)
    var samples = document.getElementsByClassName('input-sample-tab1');
    for (var i = 0; i < samples.length; i++) {
        var str = (samples[i].value);
        var state = samples[i].parentNode.parentNode.getElementsByClassName('matching-state')[0];
        if (str.length > 0 && input.length > 0) {
            var result = patt.test(str);
            if (result) {
                state.style.backgroundColor = "greenyellow";
            } else {
                state.style.backgroundColor = "crimson";
            }
        }else {
            state.style.backgroundColor = "grey";
        }

    }
}

// document.getElementById("btn-clear").onclick = function() {clearInput()};
//
// function clearInput(){
//     var input = document.getElementById('input');
//     if (input.value.length > 0){
//         input.value = "";
//     }
// }