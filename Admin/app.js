function createQuiz() {
    var quizName = document.getElementById('QuizName').value;
    var ques_quantity = document.getElementById('QuestionQuantity').value;
    var instructions = document.getElementById('Instructions').value;

    var newQuiz = {
        quizName: quizName,
        quantity: ques_quantity,
        instructions: instructions
    }

    showQuestion(quizName, ques_quantity);
}

var allQuestion = [];

function showQuestion(quizName, ques_quantity) {
    var content = `<div class="card mt-5">
                        <div class="card-header">
                            ${quizName}
                        </div>

                        <div class="card-body">
                            <div class="form-group">
                                <label for="Question" class="font-weight-bold ml-1">Quesion:
                                    <span id='Question'>1</span>
                                </label>
                                <textarea class="form-control" id="questionContent" rows="3"
                                    placeholder="Write Question Here ..."></textarea>
                            </div>

                            <div class="form-row">
                                <div class="col-md-6 form-group">
                                    <input type="text" class="form-control" placeholder="option - A" id="option1">
                                </div>
                                <div class="col-md-6 form-group">
                                    <input type="text" class="form-control" placeholder="option - B" id="option2">
                                </div>
                                <div class="col-md-6 form-group">
                                    <input type="text" class="form-control" placeholder="option - C" id="option3">
                                </div>
                                <div class="col-md-6 form-group">
                                    <input type="text" class="form-control" id="option4" placeholder="option - D">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="Correct" class="font-weight-bold ml-1">Correct Answer:</label>
                                <input type="text" class="form-control" id="Correct" placeholder="Write Correct Answer">
                            </div>

                        </div>

                        <div class="card-footer">
                        <button class="btn btn-dark float-right" onclick="Finish('${quizName}')" disabled="true" id="finish" >Finish</button>
                        <button class="btn btn-dark float-right mr-2" id="next"  onclick="setQuestion(${ques_quantity})">Next Question</button> 
                        
                        </div>
                    </div>`;
    document.getElementById('main').innerHTML = content;
}

// showQuestion('quizName', 3);

function setQuestion(ques_quantity) {
    var question = allQuestion.length + 2;
    var questionContent = document.getElementById('questionContent').value;
    var option1 = document.getElementById('option1').value;
    var option2 = document.getElementById('option2').value;
    var option3 = document.getElementById('option3').value;
    var option4 = document.getElementById('option4').value;
    var correct = document.getElementById('Correct').value;

    var newQuestion = {
        question: questionContent,
        options: {
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4
        },
        correct: correct
    }

    document.getElementById('Question').innerHTML = question;
    allQuestion.push(newQuestion);


    if (ques_quantity == allQuestion.length) {
        var finish = document.querySelector("#finish");
        var next = document.querySelector("#next");

        finish.disabled = false;
        next.disabled = true;
    }

    document.getElementById('questionContent').value = "";
    document.getElementById('option1').value = "";
    document.getElementById('option2').value = "";
    document.getElementById('option3').value = "";
    document.getElementById('option4').value = "";
    document.getElementById('Correct').value = "";
}


function Finish(quizName) {

    // Generating Random Key 
    var numb = Math.random() * 1000000000;
    var mykey = numb.toFixed()
    var quizkey = quizName + mykey;

    localStorage.setItem('question', JSON.stringify(allQuestion));
    var ques = localStorage.getItem('question');

    let quizData = JSON.parse(ques);

    for (i = 0; i < quizData.length; i++) {
        var { question, options, correct } = quizData[i];
        writeUserData(question, options, correct, quizkey);
    }

    setTimeout(function () {
        localStorage.clear();
        location.reload();
    },
        2000);

}


// // Write Data to Firebase
function writeUserData(question, options, correct, quizName) {
    firebase.database().ref('quiz').child(quizName).push({
        question: question,
        options: options,
        correct: correct
    });
}

//Fetch Data From Firebase
function ListenData() {
    var myref = firebase.database().ref('quiz');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var objkey = Object.keys(childData)
            var total_questions = objkey.length;
            // console.log(total_questions);


            var genHTML = `<div class="card col-md-4 m-3">
                                <div class="card-body">
                                <h5 class="card-title">Quiz Name : </h5>
                                <h6 class="card-subtitle mb-2 text-muted">${childKey}</h6>
                                <p class="card-text"> Total Questions: ${total_questions}</p>
                                
                                </div>
                            </div>`;

                            document.getElementById('main').innerHTML += genHTML;

            // console.log(childKey);
            // console.log(childData);
            
           

            // console.log(childData[hello].options)

        });
    });

    
}

ListenData();