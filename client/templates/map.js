Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 15,
        disableDefaultUI: true,
        draggable: false
      };
    }
  }
});


Template.map.onCreated(function() {
  IonLoading.show({
    customTemplate: '<i class="icon ion-loading-c"></i>'
  });
  Session.set("stateTitle", "Finding you...");

  GoogleMaps.ready('map', function(map) {
    IonLoading.hide();
    Session.set("stateTitle", "Pickr");
    var latLng = Geolocation.latLng();
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      map: map.instance,
      animation: google.maps.Animation.DROP,
      title: "My Location",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "blue",
        scale: 10,
        strokeWeight: 14
      }
    });
  });

});
