console.log("fence.js loaded");

var CarLo,CarLa,FLo,FLa,result;
var fence = "";

fence = firebaseGET("CarInfo/FenceStatus");
CarLa = firebaseGET("Map/CarLoaction/Latitude");
CarLo = firebaseGET("Map/CarLoaction/Longitude");
FLo = firebaseGET("Map/Fence/Longitude");
FLa = firebaseGET("Map/Fence/Latitude");

console.log(fence+"\n"+CarLa+"\n"+CarLo+"\n"+FLo+"\n"+FLa);

if(fence == "true")
{
    // document.getElementById("battery");
}

// var searchPic = "img/Battery50.png";
// document.getElementById("battery").;



console.log("fence.js end");

