
const google = google;

function App(){

  //can bind to event listener .bind(this)(locatin, marker)
  this.addInfoWindowForLocation = function(location, marker) {
    google.maps.event.addListener(marker, 'click', () => {
      if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
      this.infoWindow = new google.maps.InfoWindow({
        content: `<img src="${ location.picture }" style="width: 200px;"><p>${ location.name }</p>`
      });
      this.infoWindow.open(this.map, marker);
    });
  };

  this.createMarkerForLocation = function(index, location){
    const latlng = new google.maps.LatLng(location.lat, location.lng);
    const marker = new google.maps.Marker({
      position: latlng,
      map: this.map
    });
    this.addInfoWindowForLocation(location, marker);
  };

  this.loopThroughLocations = function(data){
    data.locations.forEach((location, index) => {
      googleMap.createMarkerForLocation(index, location);
    });
  };

  this.getLocations = function(){
    $.get('http://localhost:3000/api/locations').done(this.loopThroughLocations);
  };

  this.mapSetup = function(){
    const canvas = document.getElementById('map-canvas');
    const mapOptions = {
      zoom: 3,
      center: new google.maps.LatLng(51.634943, -0.110356),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(canvas, mapOptions);
    this.getLocations();
  };
}

const googleMap = new App();

$(googleMap.mapSetup.bind(googleMap));
