import Ember from 'ember';

export default Ember.Component.extend({
  tracksData: [],

  fetchSpotifyData: function(){
    Ember.$.get("https://api.spotify.com/v1/tracks/", {ids: this.get("spotifyIds").join(",")}).then((data)=> {
      this.get("tracksData").pushObjects(data.tracks);
    });
  }.observes("data.tracks.[]"),


  spotifyIds: function(){
    return this.get("data.tracks").map(function(item){
      return item.split(":").slice(-1)[0];
    });
  }.property("data.tracks.[]"),
});
