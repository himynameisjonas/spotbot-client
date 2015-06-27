import Ember from 'ember';

export default Ember.Object.extend({
  open: function(authentication){
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {'Authorization': 'Bearer ' + authentication.authorizationToken.access_token },
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      });
    }).then(function(user){
      return {
        currentUser: user
      };
    });
  }
});

