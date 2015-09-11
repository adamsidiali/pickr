Meteor.startup(function() {
  GoogleMaps.load({ v: '3', key: 'AIzaSyC3ctMWGxQoqfbiPpFrFNeeaHgBW0eIqak', libraries: 'geometry,places' });
});

getPlaces = function (loc) {
  Meteor.call("searchYelp", "food", false, loc.lat, loc.lng, function (err,res) {
    if (err) {
      console.log(err);
    } else {
      Session.set("recommendedPlace", res.businesses[0]);
      Session.set("placesNearby", res.businesses);
      IonLoading.hide();
      console.log(res);
    }
  });
}
