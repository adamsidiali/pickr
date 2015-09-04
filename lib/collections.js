Places = new Mongo.Collection("places");

ConfigureYelp = new SimpleSchema({
  consumerKey: {
    type: String,
    label: "Yelp Consumer Key"
  },
  consumerSecret: {
    type: String,
    label: "Yelp Consumer Secret"
  },
  accessToken: {
    type: String,
    label: "Yelp Access Token"
  },
  accessTokenSecret: {
    type: String,
    label: "Yelp Access Token Secret"
  }
});
