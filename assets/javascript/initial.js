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
//call the initial function
initial();