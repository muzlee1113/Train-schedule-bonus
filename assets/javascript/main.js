// update every 1 min
setInterval(updateAll, 60000);

//authentication
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

// Initial Values
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
        "<td>" +
        '<button type="button" class="btn btn-primary float-left" id ="' + childSnapshot.val().trainName + '">Remove</button>'
        + "</td>" +
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
        minutesAway = -diff
    }
}

function updateAll() {
    database.ref().once("value").then(function (snapshot) {
        $(".train").remove()
        console.log(snapshot)
        snapshot.forEach(function (childSnapshot) {
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
                "<td>" +
                '<button type="button" class="btn btn-primary float-left control" id ="' + childSnapshot.val().trainName + '">Remove</button>'
                + "</td>" +
                "</tr>")
        });
    })
}


//click handlers
//submit button
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


//update button
$("#update").on("click", function () {
    console.log("click")
    updateAll()
})

//remove button
$("#trainList").on("click", "button", function(){
    console.log("remove clicked")
    var id = $(this).attr("id")
    database.ref().orderByChild('trainName').equalTo(id)
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        childSnapshot.ref.remove();
        updateAll()
    });
});
})

//function for the time picker of frist train
$('#firstTrain').datetimepicker({
    format: 'HH:mm'
});

