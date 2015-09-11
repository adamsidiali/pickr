Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'home',
  template: 'recommendedPlace',
  action: function () {
    this.render();
  }
});

Router.route('/nearby', {
  name: 'placesNearby',
  template: 'placesNearby',
  action: function () {
    this.render();
  }
});


Router.route('/nearby/:placeId', {
  name: 'singlePlace',
  template: 'singlePlace',
  data: function () {
    return Session.get("place");
  },
  action: function () {
    this.render();
  }
});


Router.route('/yelp', {
  name: 'yelp',
  template: 'configureYelp',
  action: function () {
    this.render();
  }
});
