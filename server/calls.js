
var getYelpOauthBinding = function(url) {
  var config = Accounts.loginServiceConfiguration.findOne({service: 'yelp'});
  if (config) {
    config.secret = config.consumerSecret;
    var oauthBinding = new OAuth1Binding(config, url)
    oauthBinding.accessToken = config.accessToken;
    oauthBinding.accessTokenSecret = config.accessTokenSecret;

    return oauthBinding;
  } else {
    throw new Meteor.Error(500, 'Yelp Not Configured');
  }
}

Meteor.methods({

  "placeSearch": function (loc, dist) {
    this.unblock();
    var params = {
      key: "AIzaSyC3ctMWGxQoqfbiPpFrFNeeaHgBW0eIqak",
      location: loc,
      radius: dist,
      keyword: "food"
    };

    var result = HTTP.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        timeout:5000,
        params:params
      }
    );

    return result.data.results;

  },

  configureYelp: function(oauth_config) {
    check(oauth_config, ConfigureYelp);

    Accounts.loginServiceConfiguration.remove({
      service: "yelp"
    });

    Accounts.loginServiceConfiguration.insert({
      service: 'yelp',
      consumerKey: oauth_config.consumerKey,
      consumerSecret: oauth_config.consumerSecret,
      accessToken: oauth_config.accessToken,
      accessTokenSecret: oauth_config.accessTokenSecret
    });
  },

  searchYelp: function(search, isCategory, latitude, longitude) {
    this.unblock();

    console.log('Yelp search for userId: ' + this.userId + '(search, isCategory, lat, lon) with vals (', search, isCategory, latitude, longitude, ')');


    var yelp_base_url = "http://api.yelp.com/v2/"
    // Add REST resource to base URL
    var url = yelp_base_url + 'search';

    var oauthBinding = getYelpOauthBinding(url);

    // Build up query
    var parameters = {};
    // Search term or categories query
    if(isCategory)
      parameters.category_filter = search;
    else
      parameters.term = search;

    // Set lat, lon location, if available or default location
    if(longitude && latitude)
      parameters.ll = latitude + ',' + longitude;
    else
      parameters.location = 'Seattle';

    // Results limited to 5
    parameters.limit = 20;

    parameters.radius_filter = 8046;

    var data = oauthBinding.get(url, parameters).data;

    _.each(data.businesses, function (e) {
      if (Places.findOne({"id": e.id})) {
        return;
      } else {
        Places.insert(e,function (err, res) {
          console.log("inserted new place" + res);
        });
      }
    });

    // Only return .data because that is how yelp formats its responses
    return data;
  },

  yelpBusiness: function(id) {
    this.unblock();
    console.log('Yelp business for userId: ' + this.userId + '(id, lat, lon) with vals (', id, ')');
    var url = yelp_base_url + 'business/' + id;
    // Query OAUTH credentials (these are set manually)
    var oauthBinding = getYelpOauthBinding(url);

    // Only return .data because that is how yelp formats its responses
    return oauthBinding.get(url).data;
  }

});

/*
====================================
====================================
 Pubs
====================================
====================================
*/

Meteor.publish("places", function(){
  return Places.find();
});

Meteor.publish('yelpconfig', function() {
  return Accounts.loginServiceConfiguration.find({service: 'yelp'});
});

Places.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});

Places.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
