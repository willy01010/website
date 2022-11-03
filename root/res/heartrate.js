console.log("heartrate.js loaded");

var heartrate = "";
var time = "";

heartrate = firebaseGET("BioInfo/HeartRateInFo/HeartRate", "integer");
time = firebaseGET("BioInfo/HeartRateInFo/Time", "integer");

console.log(heartrate+"\n"+time);


console.log("heartrate.js end");