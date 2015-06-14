import Ember from "ember";

export default Ember.Component.extend({
  tracks: [],
  tracksData: [],
  newPlaylistUri: null,
  name: null,
  uri: null,
  store: Ember.inject.service,

  ref: function(){
    return this.store.adapterFor("application").get("_ref");
  }.property("store"),

  actions: {
    newPlaylist: function(){
      var uri = this.get("newPlaylistUri");
      if (!Ember.isEmpty(uri)) {
        this.get("ref").child("playlist/tracks").remove();
        this.get("ref").child("playlist/name").set("Loading...");
        this.get("ref").child("playlist/uri").set(uri);
      }
    },
  }
});
