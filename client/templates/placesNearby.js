Template.placesNearby.created = function () {

  if (!Session.get("placesNearby")) {
    IonLoading.show({
      customTemplate: '<i class="icon ion-loading-c"></i><br><h3>Finding you...</h3>'
    });

    Tracker.autorun(function(c){
      if (Geolocation.latLng()) {
        var loc = Geolocation.latLng();
        console.log(loc);
        Session.set("loc", loc);
        IonLoading.show({
          customTemplate: '<i class="icon ion-loading-c"></i><br><h3>Picking places to eat...</h3>'
        });
        c.stop();
        getPlaces(loc);
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

});


Template.placesNearby.events({

  "click .place-result": function (e,t) {
    var places = Session.get("placesNearby");
    var slug = this.id;

    console.log(slug);

    for (var i=0; i<places.length; i++) {
      if (places[i].id == slug) {
        console.log(places[i]);
        Session.set("place", places[i]);
        //Router.go("/nearby/"+slug);
      }
    }

  }

});
