console.log("fencedetect.js load");

var CarLo,CarLa,FLo,FLa,rad,result;
var fence = "";

let img = document.querySelector('img');
let batterybtn = document.querySelector('#battery');
let btn = document.getElementById(battery);

//指定點選batterybtn時會把html中的 第一個IMG 改成指定圖片
batterybtn.addEventListener("click" ,() =>{
    img.src="img/icon/Battery50.png";
});









function calc(){
    result = Math.sqrt(Math.pow(CarLa-FLa,2)+Math.pow(CarLo-FLo,2));
    if(result<=rad)
        fence="true";
    else
        fence="false";

    firebasePUT("CarInfo/FenceStatus");
    return fence;
}


console.log("fencedetect.js end");