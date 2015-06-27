import Ember from 'ember';

export default Ember.Object.extend({
  open: function(authentication){
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {'Authorization': 'Bearer ' + authentication.authorizationToken.access_token },
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, function(error){
          localStorage.removeItem("hasSpotify");
          reject(error);
        })
      });
    }).then(function(user){
      localStorage.setItem("hasSpotify", true);
      return {
        accessToken: authentication.authorizationToken.access_token,
        currentUser: user,
      };
    });
  }
});

