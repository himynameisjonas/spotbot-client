import Ember from "ember";

export default Ember.Controller.extend({
  query: null,
  playing: false,

  init: function(){
    this.get("playingRef").on("value", (data)=>{
      if (data.val() === true) {
        this.set("playing", true);
      } else if (data.val() === false) {
        this.set("playing", false);
      }
    });
  },

  ref: function(){
    return this.store.adapterFor("application").get("_ref");
  }.property(),

  playingRef: function(){
    return this.get("ref").child("player/playing");
  }.property("ref"),

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

    },
  }
});
