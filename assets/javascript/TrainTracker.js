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
    var frequency = "";

    //On Submit button click run the following
    $("#add-train").on("click", function(event) {
      event.preventDefault();
      
      //Take user input and trim the values
      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTime = $("#firstTime-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      console.log(trainName);
      console.log(destination);
      console.log(firstTime);
      console.log(frequency);

      //Push input to database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        freqency: frequency
      });

    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTime-input").val("");
    $("#frequency-input").val("");

    });

    //Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTime);
      console.log(childSnapshot.val().frequency);
   });

      //
//       $("#full-member-list").append("<div class='well'><span id='nameOfTrain'> " + childSnapshot.val().trainName +
//         " </td><td id='trainDestination'> " + childSnapshot.val().destination +
//         " </td><td id='trainFrequency'> " + childSnapshot.val(). +
// //        " </td><td id='nextArrival'> " + childSnapshot.val().comment + " </span></div>");

//       //Address errors
//     }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });