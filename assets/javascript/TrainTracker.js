$(".song").trigger('load');
  function play_audio(task) {
      if(task == 'play'){
           $(".song").trigger('play');
      }
      if(task == 'stop'){
           $(".song").trigger('pause');
           $(".song").prop("currentTime",0);
      }
 };

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

    //On Submit button click run the following
    $("#add-train").on("click", function(event) {
      event.preventDefault();
      
    //Take user input, trim values, console.log values
      var trainName = $("#trainName-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTime = $("#firstTime-input").val();
      var frequency = $("#frequency-input").val().trim();
      console.log(trainName);
      console.log(destination);
      console.log(firstTime);
      console.log(frequency);

      //Push input to database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
      });

    //Clears user input fields
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTime-input").val("");
    $("#frequency-input").val("");

  });

    //Function to calculate train times using moment.js
    database.ref().on("child_added", function(childSnapshot) {

    // //Store values in variables
      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
      var frequency = parseInt(childSnapshot.val().frequency);
      var firstTime = childSnapshot.val().firstTime;

    //First train time converted
    var firstTrainTime = moment(firstTime, "hh:mm").subtract(1, "years");
    //console.log(firstTrainTime);

    //Current time to use as base point to calculate time
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //Difference between the times
    var diffTime = moment().diff(moment(firstTime, "hh:mm"), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime); 

    //Time apart (remainder)
    var tRemainder = diffTime % frequency;
    //console.log(tRemainder);

    //Time until next train
    var waitUntilTrain = frequency - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + waitUntilTrain);

    //Next train arrival time
    var nextTrainArrival = moment().add(waitUntilTrain, "minutes");
    //console.log("ARRIVAL TIME: " + moment(nextTrainArrival).format("hh:mm"));   

    //Add train and calculations to table
      $("#train-table > tbody").append("<tr><td>" + 
        trainName + "</td><td>" + 
        destination + "</td><td>" + 
        frequency + "</td><td>" + 
        moment(nextTrainArrival).format("hh:mm") + "</td><td>" + 
        waitUntilTrain);

   });