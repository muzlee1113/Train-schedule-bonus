// Initialize Firebase
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

// Initial Values
//pull current time from moment js
var currentTime;


// update train information when refresh or changes were made
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val());
    //prepare the firstTrain and frequency variables for the math function
    firstTrain = childSnapshot.val().firstTrain
    frequency = childSnapshot.val().frequency
    // Run the math function
    math(firstTrain, frequency);
    // append full list of the trains to the screen
    $("#trainList").append(
        "<tr class='train'>" +
        "<td>" + childSnapshot.val().trainName + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + childSnapshot.val().frequency + "</td>" +
        "<td>" + nextTrainConverted + "</td>" +
        "<td>" + minutesAway + "</td>" +
        "</tr>")
})

//create a function to calculate next arrival and minutes away
function math(firstTrain, frequency) {
    currentTime = moment()
    //formating current time for display
    var now = moment(currentTime).format("HH:mm")
    $("#now").text("Now is: " + now)
    console.log("now is: " + now)
    //formating First Train Time for calculation
    firstTrainConverted = moment(firstTrain, "HH:mm")
    if (firstTrainConverted < moment()) {
        //use moment js difference to count the duration between first train and now in minutes
        var diff = moment().diff(moment(firstTrainConverted), "minutes")
        //use the result to calculate the minutes away
        minutesAway = frequency - (diff % frequency)
        //use the result to calculate next arrival
        nextTrain = moment().add(minutesAway, "minutes");
        //formating next arrival time for display
        nextTrainConverted = moment(nextTrain).format("HH:mm")
        console.log("The train will arrive in " + minutesAway + " min")
        console.log("Arrival time will be " + nextTrainConverted)
    } else {
        // next train is the first train
        firstTrainConverted = moment(firstTrain, "HH:mm")
        nextTrainConverted = firstTrain
        // use moment js difference to count the duration between first train and now in minutes
        var diff = moment().diff(moment(firstTrainConverted), "minutes")
        minutesAway = diff
    }
}

//create a function to grab user input and push it to firebase
$("#add-train").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text boxes
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val();
    frequency = $("#frequency").val().trim();

    // push new train object to firebase
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });
});

//function for the time picker of frist train
$('#firstTrain').datetimepicker({
    format: 'HH:mm'
});

