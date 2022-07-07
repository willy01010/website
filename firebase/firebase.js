

let url_com = "https://cgu-project-autobrake-default-rtdb.firebaseio.com/";
let url_key1 = ".json?auth=sdfsdfdknnMe2xsdfOCSXHZsLSFdqsdfshyXew43";
let url_key2 = ".json?auth=M3GknnMe2xY1LWQ01OCSXHZsLSFdq4f7phEyXKOP";
let url_key3 = ".json?auth=yTkFHPO2ThtIrT6UtwvR8vavup55NahV4294oEnj";

function firebaseGET(dic) {
    var url= url_com + dic + url_key3;
    return httpGET(url);
}

function httpGET(url) {
    var time = 0;
    
    do{
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );
        
        var inS = xmlHttp.responseText;
        if (inS == "null")
            return "";
        inS = inS.substring(1, inS.length-1);
        return inS;
        time++;
    }while(xmlHttp.status != 200 && time <= 5)
    
    if (time > 4){
        window.alert("Pls Contact engineer with \nerr code : GET - " + response.status);
    }
    return "";
}

  
function firebasePUT(dic , text) {
    var url= url_com + dic + url_key3;
    var time = 0;
    var backB = false;
    
    while(time <= 5){
        time ++;
        fetch(url,{
            method: 'PUT',
            header: {"Content-Type": "application/json"},
            body: '"' + text + '"'
        })
        .then(response => {
            console.log('response.status: ', response.status);
            if (response.status == 200 ){
                backB =  true;
                time = 9;
            }
            else if (time > 5){
                window.alert("Pls Contact engineer with \nerr code : PUT - " + response.status);
                time = 9;
            }
        });
        return backB;
    }
    return false;
}


function putTime(){
    firebasePUT("versions/renewTime/", getTime());
}


function getTime(){
    var nowtime = httpGET("http://worldtimeapi.org/api/timezone/Asia/Taipei");
    nowtime = nowtime.substring(nowtime.indexOf("datetime") + 11, nowtime.indexOf("+08:00\",\"day_of_week"));
    nowtime = nowtime.substring(0, nowtime.indexOf('.'));
    nowtime = nowtime.replace("T", " ");
    return nowtime;
}
