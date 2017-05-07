// VARIABLES
var config = {
    apiKey: "AIzaSyBflWGtz8doiG4lrYHtwsG9TzZk9VpgdE8",
    authDomain: "train-scheduler-41cee.firebaseapp.com",
    databaseURL: "https://train-scheduler-41cee.firebaseio.com",
    projectId: "train-scheduler-41cee",
    storageBucket: "train-scheduler-41cee.appspot.com",
    messagingSenderId: "424854584769"
  };
  firebase.initializeApp(config);


var database = firebase.database();

var firstTrainTime = "";
var frequency = 0;
var trainName = "";
var destination = "";




$("#addTrain").on("click", function() {

  trainName = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

    return false;
});


// Initial Code
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment(); 

  var differenceTime = nowMoment.diff(firstTrainMoment, 'minutes');
  var remainderDifference = differenceTime % frequency;
  var minutesAway = frequency - remainderDifference;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  // add table
  var tr = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  tr.append(a).append(b).append(c).append(d).append(e);
  $('#newTrains').append(tr);


  // }, function (errorObject) {

  // // In case of error this will print the error
  //   console.log("The read failed: " + errorObject.code);

});
