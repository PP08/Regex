var exercises;
function selectExercise(){

    $.getJSON("/samples/3.json", function (json) {
        exercises = json;
        var x = document.getElementById("exercise_select").value;
        document.getElementById("exercises").innerHTML = '<div class="row">\n' +
            '<div class="col-3"></div>\n' +
            '<div class="col-6">\n' +
            '<h5>' + exercises[x].question + '</h5>\n' +
            '<input autocomplete="off" type="text" placeholder="Enter your answer here..." id="answer" class="answer">\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="row">\n' +
            '<div class="col-5"></div>\n' +
            '<div class="col-2">\n' +
            '<button onclick="check_answer(event)" class="btn-check-answer">Check</button>\n' +
            '</div>\n' +
            '</div><div class="row">\n' +
            '            <div class="col-3"></div>\n' +
            '            <div class="col-6" id="result">\n' +
            '\n' +
            '            </div>\n' +
            '        </div>';
    });
}

function check_answer(event) {

    var answer_input_box = document.getElementById("answer");
    var answer_text = answer_input_box.value;
    var result = document.getElementById("result");

    if (answer_text.length > 0) {
        var x = document.getElementById("exercise_select").value;
        var regex = exercises[x].regex;
        var patt = new RegExp(regex);
        var is_match = patt.test(answer_text);
        if (is_match){
            result.innerHTML = '<p style="color: deeppink; font-size: 16pt;">Yayyy! your answer is correct!</p>' +
                '               <p>And here is our answer: '+ exercises[x].answer +'</p>';
        }else {
            result.innerHTML = '<p style="color: crimson; font-size: 16pt;">Ehhhhh! your answer is not correct!</p>' +
                '               <p>And here is our answer: '+ exercises[x].answer +'</p>';
        }
    }else {
        alert("You have to enter your answer before checking!");
    }
}