import DS from 'ember-data';

export default DS.Adapter.extend({
  findRecord: function(){},
  createRecord: function(){},
  updateRecord: function(){},
  deleteRecord: function(){},
  findAll: function(){
    var accessToken = this.get('session.accessToken');
    var playlists = [];
    var playlistUrl = `https://api.spotify.com/v1/users/${this.get('session.currentUser.id')}/playlists?limit=50`;
    var fetchPlaylists = function(url, resolve){
      Ember.$.ajax({
        url: url,
        headers: {'Authorization': 'Bearer ' + accessToken },
        success: (data)=>{
          playlists.pushObjects(data.items);
          if (data.next) {
            fetchPlaylists(data.next, resolve);
          } else {
            resolve(playlists);
          }
        }
      });
    };
    return new Ember.RSVP.Promise((resolve)=>{
      fetchPlaylists(playlistUrl, resolve);
    });
  },
  query: function(){},
});
