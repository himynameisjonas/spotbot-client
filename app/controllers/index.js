import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ["application"],
  queue: [],
  playlistName: Ember.computed.alias("controllers.application.playlistName"),
  playlistUri: Ember.computed.alias("controllers.application.playlistUri"),
  playlistTracks: Ember.computed.alias("controllers.application.playlistTracks"),
  playlistTracksData: Ember.computed.alias("controllers.application.playlistTracksData"),

  ref: function(){
    return this.store.adapterFor("application").get("_ref");
  }.property("store"),

  actions: {
    changePlaylist: function(){
      this.toggleProperty('changePlaylist');
    },
    newPlaylist: function(){
      var uri = this.get("newPlaylistUri");
      if (!Ember.isEmpty(uri)) {
        this.get("ref").child("playlist/tracks").remove();
        this.get("ref").child("playlist/name").set("Loading...");
        this.get("ref").child("playlist/uri").set(uri);
        this.set('changePlaylist', false);
      }
    },
  }
});
