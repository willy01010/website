var map;
var InfoWindow;
var carmarker;
maphtmlinit();

function maphtmlinit(){
    getcarLocation();
}

function getcarLocation() {
  
    carla = firebaseGET("Map/CarLocation/Latitude", "string");
    carlo = firebaseGET("Map/CarLocation/Longitude", "string");
  
    carla = parseFloat(carla);
    carlo = parseFloat(carlo);
    carloc = { lat: carla, lng: carlo };
  
  }

function upcar(){
    var lng = document.getElementById('newfenceLongitude').value;
    var lat = document.getElementById('newfenceLatitude').value;
    firebasePUT("Map/CarLocation/Latitude", lat);
    firebasePUT("Map/CarLocation/Longitude", lng);
}

function initMap() {
    InfoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      scaleControl: true,
      center: carloc,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ["roadmap", "terrain", "satellite"],
      },
    });
  
  
  
    //呼叫一個新的marker
    carmarker = new google.maps.Marker({
      position: carloc,
      animation: google.maps.Animation.DROP,
      map: map //這邊的map指的是var map的map變數
    });
  
    //車子位置ICON
    carmarker.setIcon({
      path: 'M29-63.8C24.2-75.1,13-83,0-83c-17.4,0-31.5,14.1-31.5,31.5c0,7.5,4.2,16.4,9.4,24.6C-12.8-12.5,0,0,0,0s31.5-30.8,31.5-51.5C31.5-55.9,30.6-60,29-63.8z M0-30.8c-11.4,0-20.7-9.3-20.7-20.7S-11.4-72.2,0-72.2s20.7,9.3,20.7,20.7S11.4-30.8,0-30.8z M0-59.3c-5.8,0-10.5,8.2-10.5,14c0,5.8,4.7,7.1,10.5,7.1c5.8,0,10.5-1.3,10.5-7.1C10.5-51.1,5.8-59.3,0-59.3zM0.9-43.7v1c0,0.3-0.3,0.6-0.6,0.6h-0.5c-0.3,0-0.6-0.3-0.6-0.6v-0.9c-0.7-0.1-1.6-0.4-2.3-0.8c-0.3-0.2-0.3-0.5-0.2-0.8l0.5-0.8c0.2-0.3,0.5-0.3,0.8-0.2c0.6,0.4,1.1,0.5,1.7,0.5c0.8,0,1.1-0.3,1.1-0.9c0-1.2-4-1.4-4-4.1c0-1.6,0.9-2.6,2.4-2.9v-1c0-0.3,0.3-0.6,0.6-0.6h0.6c0.3,0,0.6,0.3,0.6,0.6v1c0.8,0.1,1.4,0.4,1.9,0.9C3-52.6,3.1-52.2,2.9-52l-0.6,0.7c-0.2,0.2-0.5,0.3-0.8,0.1c-0.4-0.3-0.8-0.4-1.2-0.4c-0.7,0-1,0.2-1,0.8c0,1.2,4,1.2,4,4C3.3-45.3,2.5-44.1,0.9-43.7z M-2.2-59.8c0.7-0.2,1.4-0.3,2.2-0.3c0.7,0,1.4,0.1,2.1,0.3l1.5-4.9c0.2-0.6-0.4-1-0.9-0.8L0-64l-2.7-1.4c-0.5-0.3-1.1,0.2-0.9,0.8L-2.2-59.8z',
      // path: 'M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm288 32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z',
      strokeWeight: 0,
      fillColor: '#ff6600',
      fillOpacity: 0.95,
      scale: 0.7,
      // scale: 0.07
    });
  
    //map button
    // Create the DIV to hold the control.
    const centerControlDiv = document.createElement("div");
    // Create the control.
    const centerControlCar = createCenterControl("car", map, InfoWindow);
    const centerControlLocation = createCenterControl("location", map, InfoWindow);
    // Append the control to the DIV.
    centerControlDiv.appendChild(centerControlCar);
    centerControlDiv.appendChild(centerControlLocation);
    // Add the DIV to the map TOP_CENTER.
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
  

  
    //Create the autocomplete search box and link it to the UI element.
    var input = document.getElementById('searchInput');
    var autocomplete = new google.maps.places.Autocomplete(input);
    SearchBoxAutoComplete(map, InfoWindow, autocomplete);
  
  
  
  
  
  }

  function MoveSearchCircle(circlefence, map, InfoWindow) {
    //當圓形移動時，重新取得圓形中心點的座標，並且顯示資料再HTML UI上
    console.log("MoveSearchCircle------------");
    // circlefence.setRadius() = document.getElementById('newfenceRadius').value;
    
    
    InfoWindow.setPosition(circlefence.getPosition());
    InfoWindow.setContent( '</strong><br>' + "經度：" + circlefence.getPosition().lat() + '<br>' + '緯度：' + circlefence.getPosition().lng());
    document.getElementById('newfenceLongitude').value = circlefence.getPosition().lng();
    document.getElementById('newfenceLatitude').value = circlefence.getPosition().lat();
  
  }

  //button on map center
function createCenterControl(btn, map, InfoWindow) {
    const carButton = document.createElement("button");
    const locationButton = document.createElement("button");
  
    // Set CSS for the control.
    CenterButtonCSS(locationButton, "#fff", "我的位置", "rgb(25,25,25)", "Pan to Current Location");
    CenterButtonCSS(carButton, "#fff", "車輛位置", "rgb(25,25,25)", "Click to search the car");
  
  
    // Setup the click event listeners: set the map to car.
    carButton.addEventListener("click", () => {
      // Mapupdatecar();****
      map.setZoom(17);
      map.setCenter(carloc);
      // carmarker.Animation = google.maps.Animation.DROP;
    });
  
    //定位使用者位置onclick listenevent
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            //是否有別的寫法可以取代????????????????????????????
            marker = new google.maps.Marker({
              position: pos,
              animation: google.maps.Animation.DROP,
              map: map //這邊的map指的是var map的map變數
            });
  
            InfoWindow.setPosition(pos);
            InfoWindow.setContent("您的位置");
            InfoWindow.open(map);
            map.setZoom(17);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, InfoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, InfoWindow, map.getCenter());
      }
    });
  
    //決定回傳哪個button
    if (btn == "car") {
      return carButton
    } else if (btn == "location") {
      return locationButton;
    }
  }
  
  function CenterButtonCSS(btn, backgroundColor, text, txtcolor, title) {
    btn.style.backgroundColor = backgroundColor;
    btn.style.border = "2px solid #fff";
    btn.style.borderRadius = "3px";
    btn.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    btn.style.color = txtcolor;
    btn.style.cursor = "pointer";
    btn.style.fontFamily = "Roboto,Arial,sans-serif";
    btn.style.fontSize = "16px";
    btn.style.lineHeight = "38px";
    btn.style.margin = "8px 0 22px";
    btn.style.padding = "0 5px";
    btn.style.textAlign = "center";
  
    btn.textContent = text;
    btn.title = title;
    btn.type = "button";
  }

  function SearchBoxAutoComplete(map, InfoWindow, autocomplete) {
    //  autocomplete.bindTo('bounds', map);
  
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
      draggable: true,
    });
  
    var sermark = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });
  

  
    autocomplete.addListener('place_changed', function () {

      document.getElementById('newfenceLongitude').value = "";
      document.getElementById('newfenceLatitude').value = "";
      InfoWindow.close();
      marker.setVisible(false);
      sermark.setVisible(false);
      var place = autocomplete.getPlace();
  
      console.log("place_changed" + place.name);
  
      if (!place.geometry) {
        window.alert("請直接選擇建議內容" + place.name + "的地址");
        return;
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
  
      marker.setIcon(({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
        
      }));
  
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      marker.addListener('mouseup', () => MoveSearchCircle(marker, map, InfoWindow));
  
      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
  
      InfoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      InfoWindow.open(map, marker);
  
      //Location details 資料顯示
      searchloc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }

      document.getElementById('newfenceLongitude').value = place.geometry.location.lng();
      document.getElementById('newfenceLatitude').value = place.geometry.location.lat();
      console.log(searchloc);
      //  for (var i = 0; i < place.address_components.length; i++) {
      //      if(place.address_components[i].types[0] == 'postal_code'){
      //          document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
      //      }
      //      if(place.address_components[i].types[0] == 'country'){
      //          document.getElementById('country').innerHTML = place.address_components[i].long_name;
      //      }
      //  }       
      //  document.getElementById('location').innerHTML = place.formatted_address;
      //  document.getElementById('lat').innerHTML = place.geometry.location.lat();
      //  document.getElementById('lon').innerHTML = place.geometry.location.lng();
  
  
    });
  
  
  }

