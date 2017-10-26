  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhnUigJgCZi4UaXz2dppTe6FAbzmVreGc",
    authDomain: "train-280f2.firebaseapp.com",
    databaseURL: "https://train-280f2.firebaseio.com",
    projectId: "train-280f2",
    storageBucket: "train-280f2.appspot.com",
    messagingSenderId: "773012534928"
  };
  firebase.initializeApp(config);

    //Create a variable to reference the firebase database
    var database = firebase.database();

    //Initial Values
    var trainName = "";
    var destination = "";
    var firstTime = "";
    //var frequency
    var frequency = parseInt();

    //On Submit button click run the following
    $("#add-train").on("click", function(event) {
      event.preventDefault();
      
    //Take user input, trim values, console.log values
      trainName = $("#trainName-input").val().trim();
      console.log(trainName);
      destination = $("#destination-input").val().trim();
      console.log(destination);
      //firstTrain = moment(firstTime, "hh:mm").subtract(1, "years");
      //cosole.log(firstTrain);
      firstTime = $("#firstTime-input").val();
      console.log(firstTime);
      frequency = $("#frequency-input").val().trim();
      console.log(frequency);

      //Push input to database
      database.ref().push({
        trainName: trainName,
        destination: destination,
  //      firstTime: firstTime,
 //       freqency: frequency
      });

    //Clears user input fields
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTime-input").val("");
    $("#frequency-input").val("");

    //
    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      // console.log(childSnapshot.val().trainName);
      // console.log(childSnapshot.val().destination);
      // console.log(childSnapshot.val().firstTrain);
      // console.log(childSnapshot.val().frequency);

    //First train time converted
      var firstTrainConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      console.log(firstTrainConverted);

    //Current time to use as base point to calculate time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //Difference between the times
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime); 

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));   

    //Store values in variables
      var tblTrainName = childSnapshot.val().trainName;
      var tblTrainDestination = childSnapshot.val().destination;
      var tblTrainFrequency = childSnapshot.val().frequency;

      $("#train-table > tbody").append("<tr><td>" + tblTrainName + "</td><td>" + tblTrainDestination + "</td><td>" + tblTrainFrequency);

   });

});

   // childSnapshot();