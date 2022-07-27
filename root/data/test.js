console.log("test.js loaded");
var data02 ="";
var t="";

t = "20";

// window.setInterval(gogo,500);
// data02 = firebaseGET("CarInfo/Battery");

// window.setInterval(gogo2,500);

console.log("out"+data02);
console.log("out"+t);

console.log("test.js end");


function gogo(){
    data02 = firebaseGET("CarInfo/Battery");
    console.log(data02);
}

function gogo2(){
    data02 = firebasePUT("CarInfo/Battery" , t);
    console.log(t);
}