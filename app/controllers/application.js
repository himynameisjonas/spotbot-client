import Ember from "ember";

export default Ember.Controller.extend({
  query: null,
  playing: false,
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

    this.get("ref").child("player/current_track").on("value", (data)=>{
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

  ref: function(){
    return this.store.adapterFor("application").get("_ref");
  }.property(),

  playingRef: function(){
    return this.get("ref").child("player/playing");
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
  }
});
