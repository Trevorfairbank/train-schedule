// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCVLu1m5hbl9ku6rTNYCkrOni5tO10xcEw",
    authDomain: "testproject-8447b.firebaseapp.com",
    databaseURL: "https://testproject-8447b.firebaseio.com",
    projectId: "testproject-8447b",
    storageBucket: "testproject-8447b.appspot.com",
    messagingSenderId: "722747434698",
    appId: "1:722747434698:web:c8607c45dbfba956"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var database = firebase.database();


$("#button").on("click", function (event) {
    event.preventDefault();
    console.log("YOU CLICKED!")

    //grabs user input
    var trainName = $("#train-input").val();
    var destination = $("#destination-input").val();
    var time = $("#time-input").val();
    var frequency = $("#frequency-input").val();
    //var nArrival = 1200;
    //var minutes = 12;

    database.ref().push({
        train: trainName,
        destination: destination,
        time: time,
        //nArrival : nArrival,
        frequency: frequency,
        //minutes: minutes
    });

    //alert("Train added");
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);


    //clears user input fields
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;
    //var nArrival = childSnapshot.val().nArrival;
    //var minutes = childSnapshot.val().minutes;

    //First Time one year ago so it is listed before.
    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % frequency;

    var minutes = frequency - tRemainder;

    var currentTime = moment();
    
    var nArrivalFormat = moment(currentTime).add(minutes, "minutes");

    var nArrival = moment(nArrivalFormat).format('HH:mm');



    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nArrival),
        $("<td>").text(minutes),
    );

    $("#tableBody").append(newRow);

});