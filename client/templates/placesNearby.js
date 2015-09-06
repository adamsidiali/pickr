Template.placesNearby.created = function () {

  if (Session.get("placesNearby") == null) {
    IonLoading.show({
      customTemplate: '<i class="icon ion-loading-c"></i><br><h3>Finding places...</h3>'
    });

    Tracker.autorun(function(c){
      if (Geolocation.latLng()) {
        var loc = Geolocation.latLng();
        console.log(loc);
        Meteor.call("searchYelp", "food", false, loc.lat, loc.lng, function (err,res) {
          if (err) {
            console.log(err);
          } else {
            Session.set("placesNearby", res.businesses);
            IonLoading.hide();
            console.log(res);
          }
          c.stop();
        });
      }
    });
  }

}


Template.placesNearby.helpers({

  "priceLevel": function (num) {
    if (num == 1) {
      return "$"
    } else if (num == 2) {
      return "$$"
    } else if (num == 3) {
      return "$$$"
    } else if (num == 4) {
      return "$$$$"
    } else {
      return "No pricing info."
    }

  },

  "distanceInMiles": function (distance) {
    var mi = distance*.000621371;
    return mi.toFixed(1);
  },

  "loc": function () {
    if (Geolocation.latLng()) {
      return Geolocation.latLng();
    }
  },

  "placesNearby": function () {
    if (Session.get("placesNearby")) {
      return Session.get("placesNearby");
    }
  }

})
