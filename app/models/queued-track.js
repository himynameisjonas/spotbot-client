import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  uri: DS.attr("string"),
  spotifyData: {},
  name: Ember.computed.alias("spotifyData.name"),
  duration: Ember.computed.alias("spotifyData.duration_ms"),
  artists: function(){
    if (this.get("spotifyData.artists")) {
      return this.get("spotifyData.artists").mapProperty("name");
    }
  }.property("spotifyData.artists"),
  image: function(){
    if (Ember.isEmpty(this.get("spotifyData.album.images"))) {
      return "http://freemusicarchive.org/img/generic/album-default-lp-transparent.png?method=crop&width=155&height=155"
    } else {
      return this.get("spotifyData.album.images")[1].url;
    }
  }.property('spotifyData.album.images.@each.url'),

  spotifyId: function(){
    return this.get("uri").split(":").slice(-1)[0];
  }.property("uri"),

  fetchSpotifyData: function(){
    Ember.$.get("https://api.spotify.com/v1/tracks/" + this.get("spotifyId")).then((data)=> {
      console.log(data);
      this.set("spotifyData", data);
    });
  }.observes("uri"),
});
