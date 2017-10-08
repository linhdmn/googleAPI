var map;
$(document).ready(function(){
  map = new GMaps({
    el: '#map',
    lat: 10.7626391,
    lng: 106.6820268
  });
  map.setContextMenu({
    control: 'map',
    options: [{
      title: 'Add marker',
      name: 'add_marker',
      action: function(e){
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
        this.addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          title: 'New marker'
        });
        this.hideContextMenu();
      }
    }, {
      title: 'Center here',
      name: 'center_here',
      action: function(e){
        this.setCenter(e.latLng.lat(), e.latLng.lng());
      }
    }]
  });
  map.setContextMenu({
    control: 'marker',
    options: [{
      title: 'Center here',
      name: 'center_here',
      action: function(e){
        this.setCenter(e.latLng.lat(), e.latLng.lng());
      }
    }]
  });
});
//=======================================
// search
$("#button_search").click(function(event) {
    var str = $("#inputAddress").val();
    if(str !== ""){
      findAddress(str);
    }
});
$("#inputAddress").keyup(function(event) {
  var str = $("#inputAddress").val();
  if(event.keyCode == 13 && str !== "")
  {
    findAddress(str);
  }
});
function findAddress(str){
  GMaps.geocode({
    address: str,
    callback: function(results,status){
      if(status == 'OK'){
        var latlng = results[0].geometry.location;
        map.setCenter(latlng.lat(), latlng.lng());
        map.addMarker({
          lat: latlng.lat(),
          lng: latlng.lng()
        });
      }
    }
  });
};
//=========================================
//geolocation
$("#button_location").click(function(event) {
  GMaps.geolocate({
    success: function(position){
      map.setCenter(position.coords.latitude, position.coords.longitude);
      map.addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
    },
    error: function(error){
      alert('Geolocation failed: '+error.message);
    },
    not_supported: function(){
      alert("Your browser does not support geolocation");
    },
  });
});
