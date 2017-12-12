function check_tab2() {
    var input = document.getElementById('input-regex-tab2').value;
    var result_txtarea = document.getElementById('textarea-result-tab2');
    var state = document.getElementsByClassName('matching-state-tab2')[0];
    if (checkRegExp(input)) {
        document.getElementById('input-regex-tab2').style.color = "green";
        // var patt = new RegExp(input);
        var regex = /\/(.*)\/(.*)$/;
        var found = input.match(regex);
        var patt = new RegExp(found[1], found[2]);
        var text = document.getElementById('textarea-tab2').value;
        console.log(text);
        var replace_str = document.getElementById('input-for-replacing').value;
        if (text.length > 0){
            var result = text.replace(patt, replace_str);
            console.log(result);
            result_txtarea.innerHTML = result;
            var ref_text = document.getElementById('textarea-ref-tab2').value;
            var pattern = new RegExp('^' + ref_text + '$');
            var match = pattern.test(result);
            if (match) {
                state.style.backgroundColor = 'greenyellow';
            }else {
                state.style.backgroundColor = 'red';
            }
        }else {
            result_txtarea.innerHTML = '';
        }
    }
    else {
        document.getElementById('input-regex-tab2').style.color = "red";
        result_txtarea.innerHTML = '';
        state.style.backgroundColor = 'grey';
    }
}