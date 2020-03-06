$(document).ready(function() {

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCMDO40C21CdkbPguqb6o3x8pOVa8vAAYo",
        authDomain: "abojoproject.firebaseapp.com",
        databaseURL: "https://abojoproject.firebaseio.com",
        projectId: "abojoproject",
        storageBucket: "abojoproject.appspot.com",
        messagingSenderId: "65907136976",
        appId: "1:65907136976:web:fb59187940febc5941c1d5"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let database = firebase.database();

    let trainName = "";
    let destination = "";
    let firstTrainTime = "";
    let frequency = "";
    let m = moment();
    let nextArrival = "";
    let minutesAway = "";

    database.ref('train').on("child_added", function(snapshot) {
        
        let trainDifference = 0;
        let remainder = 0;
        let timeUntilTrain = 0;
        let trainETA = 0;
        let trainFrequency = snapshot.val().frequency;


        trainDifference = m.diff(moment.unix(snapshot.val().firstTrainTime), "minutes");

        remainder = trainDifference % trainFrequency;

        timeUntilTrain = trainFrequency - remainder;

        trainETA = moment().add(timeUntilTrain, "m").format("HH:mm");

        let trainRow = $("<tr class='tableRows'>").append(
            $("<td>").text(snapshot.val().trainName),
            $("<td>").text(snapshot.val().destination),
            $("<td>").text(trainFrequency),
            $("<td>").text(trainETA),
            $("<td>").text(timeUntilTrain)
        );
        $("#trainTable").append(trainRow);

    });

    $("#currentTime").text(moment(m).format("HH:mm"))

    //Pseduocode frequency and arrival

    // three variables

    
    // difference
    // remainder
    // minutes until arrival

    // function to add next train time and minutes away variables to table (pass in train name as parameter){

    // }

    // for loop to iterate through all train data {

    // }

    $("#addTrain").on("click", function(snapshot) {

        event.preventDefault();

        trainName = $("#nameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        database.ref('train').push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            nextArrival: nextArrival,
            minutesAway, minutesAway
        });

        $("#newTrainForm")[0].reset();

    });

});