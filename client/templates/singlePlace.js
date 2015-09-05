Template.singlePlace.helpers({

  "stateTitle": function () {
    return Session.get("stateTitle");
  },

  "place": function () {
    return Session.get("place");
  },


  "distanceInMiles": function (distance) {
    var mi = distance*.000621371;
    return mi.toFixed(1);
  },

});
