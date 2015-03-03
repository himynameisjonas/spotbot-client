import Ember from "ember";

export default Ember.Controller.extend({
  query: null,
  playing: false,
  shuffle: false,
  currentTrackUri: null,
  currentTrackData: null,

  init: function(){
    this.get("playingRef").on("value", (data)=>{
      if (data.val() === true) {
        this.set("playing", true);
      } else if (data.val() === false) {
        this.set("playing", false);
      }
    });
    this.get("shuffleRef").on("value", (data)=>{
      if (data.val() === true) {
        this.set("shuffle", true);
      } else if (data.val() === false) {
        this.set("shuffle", false);
      }
    });

    this.get("ref").child("player/current_track/uri").on("value", (data)=>{
      this.set("currentTrackUri", data.val());
    });
  },

  spotifyId: function(){
    var uri = this.get("currentTrackUri");
    if (Ember.isEmpty(uri)) {
      return null;
    } else {
      return this.get("currentTrackUri").split(":").slice(-1)[0];
    }
  }.property("currentTrackUri"),

  fetchSpotifyData: function(){
    var id = this.get("spotifyId");
    if (Ember.isEmpty(id)) {
      this.set("currentTrackData", null);
    } else {
      Ember.$.get("https://api.spotify.com/v1/tracks/" + this.get("spotifyId")).then((data)=> {
        this.set("currentTrackData", data);
      });
    }
  }.observes("currentTrackUri"),

  fetchPlaylistTracksData: function(){
    this.set("playlistTracksData", []);
    var array = this.get("playlistTrackIds");
    if (!Ember.isEmpty(array)) {
      var i,j,temparray,chunk = 50;
      for (i=0,j=array.length; i<j; i+=chunk) {
        temparray = array.slice(i,i+chunk);
        Ember.$.get("https://api.spotify.com/v1/tracks/", {ids: temparray.join(",")}).then((data)=> {
          this.get("playlistTracksData").pushObjects(data.tracks);
        });
      }
    }
  }.observes("playlistTracks.[]"),

  playlistTrackIds: function(){
    var tracks = this.get("playlistTracks");
    if (!Ember.isEmpty(tracks)) {
      return tracks.map(function(item){
        return item.split(":").slice(-1)[0];
      });
    }
  }.property("playlistTracks.[]"),


  ref: function(){
    return this.store.adapterFor("application").get("_ref");
  }.property(),

  playingRef: function(){
    return this.get("ref").child("player/playing");
  }.property("ref"),

  shuffleRef: function(){
    return this.get("ref").child("playlist/shuffle");
  }.property("ref"),

  queryObserver: Ember.debouncedObserver(function(){
    this.send("search");
  }, "query", 300),

  actions: {
    search: function(){
      if (Ember.isEmpty(this.get("query"))) {
        this.transitionToRoute("application");
      } else {
        this.transitionToRoute("search", {query: this.get("query")});
      }
    },
    play: function(){
      this.get("playingRef").set(true);
    },
    pause: function(){
      this.get("playingRef").set(false);
    },
    next: function(){
      this.get("ref").child("player/next").set(true);
    },
    shuffle: function(){
      this.get("shuffleRef").set(!this.get("shuffle"));
    },
  }
});
