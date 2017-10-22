  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyAQz6fyaAEzl7H30JF12bk7VQKUHtZV5Ow",
    authDomain: "employeetracker-7a915.firebaseapp.com",
    databaseURL: "https://employeetracker-7a915.firebaseio.com",
    projectId: "employeetracker-7a915",
    storageBucket: "employeetracker-7a915.appspot.com",
    messagingSenderId: "992234332893"
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
      trianName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTime = $("#firstTime-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      //Push input to database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        freqency: frequency
      });

    // $("#trainName-input").val("");
    // $("#destination-input").val("");
    // $("#firstTime-input").val("");
    // $("#frequency-input").val("");

    // });

    // Firebase watcher + initial loader HINT: .on("value")
   //  database.ref().on("child_added", function(childSnapshot) {

   //    // Log everything that's coming out of snapshot
   //    console.log(childSnapshot.val().trainName);
   //    console.log(childSnapshot.val().destination);
   //    console.log(childSnapshot.val().firstTime);
   //    console.log(childSnapshot.val().frequency);
   // });

      //
//       $("#full-member-list").append("<div class='well'><span id='nameOfTrain'> " + childSnapshot.val().trainName +
//         " </td><td id='trainDestination'> " + childSnapshot.val().destination +
//         " </td><td id='trainFrequency'> " + childSnapshot.val(). +
// //        " </td><td id='nextArrival'> " + childSnapshot.val().comment + " </span></div>");

//       //Address errors
//     }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });