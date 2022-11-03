console.log("fence.js loaded");

var CarLo,CarLa,FLo,FLa,result;
var fence = "";

fence = firebaseGET("CarInfo/FenceStatus", "string");
CarLa = firebaseGET("Map/CarLoaction/Latitude", "string");
CarLo = firebaseGET("Map/CarLoaction/Longitude", "string");
FLo = firebaseGET("Map/Fence/Longitude", "string");
FLa = firebaseGET("Map/Fence/Latitude", "string");

console.log(fence+"\n"+CarLa+"\n"+CarLo+"\n"+FLo+"\n"+FLa);

if(fence == "true")
{
    // document.getElementById("battery");
}

// var searchPic = "img/Battery50.png";
// document.getElementById("battery").;



console.log("fence.js end");

