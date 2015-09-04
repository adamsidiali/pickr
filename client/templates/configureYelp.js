Template.configureYelp.helpers({
  configureYelp: function() {
    return ConfigureYelp;
  },
  currentConfig: function() {
    Accounts.loginServiceConfiguration.findOne({service: 'yelp'});
  }
});
