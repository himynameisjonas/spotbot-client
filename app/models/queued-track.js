import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  uri: DS.attr("string"),
  spotifyData: {},
  name: Ember.computed.alias("spotifyData.name"),
  artists: function(){
    if (this.get("spotifyData.artists")) {
      return this.get("spotifyData.artists").mapProperty("name");
    }
  }.property("spotifyData.artists"),

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
