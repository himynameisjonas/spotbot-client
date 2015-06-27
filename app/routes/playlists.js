import Ember from 'ember';
import Playlist from '../models/playlist';

export default Ember.Route.extend({
  playlists: [],

  playlistUrl: function(){
    return `https://api.spotify.com/v1/users/${this.get('session.currentUser.id')}/playlists?limit=50`;
  }.property('session.currentUser.id'),

  beforeModel: function(){
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('index');
    }
  },
  model: function(){
    var accessToken = this.get('session.accessToken');
    var playlists = this.get('playlists');
    var fetchPlaylists = function(url, resolve){
      Ember.$.ajax({
        url: url,
        headers: {'Authorization': 'Bearer ' + accessToken },
        success: (data)=>{
          playlists.pushObjects(data.items);
          if (data.next) {
            fetchPlaylists(data.next, resolve);
          } else {
            resolve(playlists.map(function(playlist){
              return Playlist.create(playlist);
            }));
          }
        }
      });
    };

    return new Ember.RSVP.Promise((resolve)=>{
      fetchPlaylists(this.get('playlistUrl'), resolve);
    });
  },
  actions: {
    enqueue: function(uri){
      this.store.adapterFor('application').get('_ref').child('playlist/uri').set(uri);
    },
  }
});
