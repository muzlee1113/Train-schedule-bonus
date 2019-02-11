// Initialize Firebase
console.log("check")
var config = {
    apiKey: "AIzaSyDT4_Zcxk3ASLN5Hci6mrDMWj7uEo2lhfc",
    authDomain: "inclass-a64a4.firebaseapp.com",
    databaseURL: "https://inclass-a64a4.firebaseio.com",
    projectId: "inclass-a64a4",
    storageBucket: "inclass-a64a4.appspot.com",
    messagingSenderId: "967517833925"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

//authentication

var provider = new firebase.auth.GoogleAuthProvider();
var provider2 = new firebase.auth.GithubAuthProvider();


function googleSignin() {
    firebase.auth()

        .signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(token)
            console.log(user)
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
}

function githubSignin() {
    firebase.auth().signInWithPopup(provider2)

        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(token)
            console.log(user)
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
}

function googleSignout() {
    firebase.auth().signOut()

        .then(function () {
            console.log('Signout Succesfull')
        }, function (error) {
            console.log('Signout Failed')
        });
}


//to see if the firebase is empty or not
function checkFirebase() {
    database.ref().once("value")
        .then(function (snapshot) {
            var confirm = snapshot.hasChildren(); // true
            console.log(confirm)
            if (confirm === false) {
                //call the initial function
                initial();
                console.log("Database was empty")
            } else {
                console.log("Database has been filled with initialTrain Info")
            }

        });
}


var initialTrain = [
    {
        trainName: "Trenton Express",
        destination: "Trenton",
        firstTrain: "6:30",
        frequency: 25,
    },
    {
        trainName: "Oregon Trail",
        destination: "Salem, Oregon",
        firstTrain: "4:30",
        frequency: 10,
    },
    {
        trainName: "Midnight Carriage",
        destination: "Philadelpha",
        firstTrain: "8:30",
        frequency: 3,
    },
    {
        trainName: "Sing Sing caravan",
        destination: "Atlanta",
        firstTrain: "3:00",
        frequency: 45,
    },
    {
        trainName: "Boston Bus",
        destination: "Boston",
        firstTrain: "4:58",
        frequency: 7,
    },
    {
        trainName: "California Caravan",
        destination: "San Francisco",
        firstTrain: "9:46",
        frequency: 11,
    },
    {
        trainName: "Analben's Train",
        destination: "Florida",
        firstTrain: "9:32",
        frequency: 3600,
    }
];
//create a function to push initial data into firebase
function initial() {
    for (i in initialTrain) {
        trainName = initialTrain[i].trainName;
        destination = initialTrain[i].destination;
        firstTrain = initialTrain[i].firstTrain;
        frequency = initialTrain[i].frequency;

        // Code for handling the push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            // nextTrain: nextTrainConverted,
            // minutesAway: minutesAway,
            // dateAdded: moment(currentTime).unix()
        });
    }
}
