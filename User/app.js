var allQuestion = [];


let googleSignin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;

            var { displayName, email, phoneNumber, photoURL } = user;
            setUser(displayName, email, phoneNumber, photoURL);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            alert(errorMessage);
        });
}


function signin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            var { displayName, email, phoneNumber, photoURL } = user;
            setUser(displayName, email, phoneNumber, photoURL);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    //Setting the fields to be empty
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function signup() {
    var email = document.getElementById('uemail').value;
    var password = document.getElementById('upass').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    //Setting the fields to be empty    
    document.getElementById('uemail').value = '';
    document.getElementById('upass').value = '';
}

function setUser(userName, email, phone, photo) {
    var currentUser = {
        userName, email, phone, photo
    }
    console.log(currentUser);

    localStorage.setItem('currentUser',JSON.stringify(currentUser));
    window.location.href = "index.html";
}









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
