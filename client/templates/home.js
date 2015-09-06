Template.home.created = function () {
  Session.set("stateTitle", "Recommended For You");

  if (Session.get("place") == null) {
    IonLoading.show({
      customTemplate: '<i class="icon ion-loading-c"></i><br><h3>Finding you...</h3>'
    });

    Tracker.autorun(function(c){
      if (Geolocation.latLng()) {
        var loc = Geolocation.latLng();
        console.log(loc);
        Session.set("loc", loc);
        IonLoading.show({
          customTemplate: '<i class="icon ion-loading-c"></i><br><h3>Finding the best place to eat...</h3>'
        });
        c.stop();
        getPlaces(loc);
      }
    });
  }


}

Template.home.helpers({

  "place": function () {
    return Session.get("place");
  },

  "stateTitle": function () {
    return Session.get("stateTitle");
  },


});

var getPlaces = function (loc) {
  Meteor.call("searchYelp", "food", false, loc.lat, loc.lng, function (err,res) {
    if (err) {
      console.log(err);
    } else {
      Session.set("place", res.businesses[0]);
      IonLoading.hide();
      console.log(res);
    }
  });
}
