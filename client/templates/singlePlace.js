Template.singlePlace.created = function () {
  Session.set("stateTitle", "This looks good...");
}

Template.singlePlace.helpers({

  "distanceInMiles": function (distance) {
    var mi = distance*.000621371;
    return mi.toFixed(1);
  },


  "place": function () {
    return Session.get("place");
  }


});
