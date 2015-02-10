import Ember from "ember";

export default Ember.Component.extend({
  tracksData: [],
  newPlaylistUri: null,
  name: Ember.computed.alias("data.name"),
  uri: Ember.computed.alias("data.uri"),

  fetchSpotifyData: function(){
    this.set("tracksData", []);
    var array = this.get("spotifyIds");
    if (!Ember.isEmpty(array)) {
      var i,j,temparray,chunk = 50;
      for (i=0,j=array.length; i<j; i+=chunk) {
        temparray = array.slice(i,i+chunk);
        Ember.$.get("https://api.spotify.com/v1/tracks/", {ids: temparray.join(",")}).then((data)=> {
          this.get("tracksData").pushObjects(data.tracks);
        });
      }
    }
  }.observes("data.tracks.[]"),

  spotifyIds: function(){
    var tracks = this.get("data.tracks");
    if (!Ember.isEmpty(tracks)) {
      return tracks.map(function(item){
        return item.split(":").slice(-1)[0];
      });
    }
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
