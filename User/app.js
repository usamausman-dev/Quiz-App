var allQuestion = [];

function ListenData() {
    var myref = firebase.database().ref('quiz');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            localStorage.setItem(childKey, JSON.stringify(childData));

            var objKeys = Object.keys(childData);
            var genHTML = `<div class="card col-md-3 m-3">
                                <div class="card-body">
                                <h5 class="card-title">Quiz Name : </h5>
                                <h6 class="card-subtitle mb-2 text-muted">${childKey}</h6>
                                <p class="card-text"> Total Questions:${objKeys.length}</p>
                                <button class="btn btn-primary" data-toggle="modal" data-target="#Quiz" 
                                onclick="run('${childKey}')">Attempt Quiz</button>
                            </div>`;

            document.getElementById('main').innerHTML += genHTML;
        });
    });
}


function run(childKey) {
    window.location.href = "quizsection.html?data=" + childKey;
}
