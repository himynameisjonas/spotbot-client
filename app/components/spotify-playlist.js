import Ember from "ember";

export default Ember.Component.extend({
  tracksData: [],
  newPlaylistUri: null,

  fetchSpotifyData: function(){
    var array = this.get("spotifyIds");
    var i,j,temparray,chunk = 50;
    for (i=0,j=array.length; i<j; i+=chunk) {
      temparray = array.slice(i,i+chunk);
      Ember.$.get("https://api.spotify.com/v1/tracks/", {ids: temparray.join(",")}).then((data)=> {
        this.get("tracksData").pushObjects(data.tracks);
      });
    }
  }.observes("data.tracks.[]"),


  spotifyIds: function(){
    return this.get("data.tracks").map(function(item){
      return item.split(":").slice(-1)[0];
    });
  }.property("data.tracks.[]"),

  ref: function(){
    return this.store.adapterFor("application").get("_ref");
  }.property("store"),

  actions: {
    newPlaylist: function(){
      var uri = this.get("newPlaylistUri");
      if (!Ember.isEmpty(uri)) {
        this.get("ref").child("playlist/uri").set(uri);
      }
    },
  }
});
