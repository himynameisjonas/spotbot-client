import Ember from "ember";

export default Ember.Component.extend({
  name: Ember.computed.alias("data.name"),
  uri: Ember.computed.alias("data.uri"),
  store: Ember.inject.service(),
  queueable: true,
  showTracks: false,

  style: function() {
    return `background-image: url(${ this.get("image")})`;
  }.property("image"),

  artists: function(){
    if (this.get("data.artists")) {
      return this.get("data.artists").map(function(artist){
        return {name: artist.name, search: `artist:${artist.name}`};
      });
    }
  }.property("data.artists"),

  released: function(){
    var date = this.get("data.release_date");
    if (!Ember.isEmpty(date)) {
      return date.substring(0,4);
    }
  }.property("data.release_date"),

  image: function(){
    if (Ember.isEmpty(this.get("data.images"))) {
      return "http://freemusicarchive.org/img/generic/album-default-lp-transparent.png?method=crop&width=155&height=155";
    } else {
      return this.get("data.images")[1].url;
    }
  }.property("data.images.@each.url"),

  tracks: function(){
    return this.get('data.tracks.items');
  }.property('data.tracks.items.[]'),

  ref: function(){
    return this.get('store').adapterFor("application").get("_ref");
  }.property("store"),

  actions: {
    enqueue: function(){
      this.get("ref").child("playlist/uri").set(this.get("uri"));
      this.set("queueable", false);
    },
    showTracks: function(){
      this.toggleProperty("showTracks");
    },
  }
});
