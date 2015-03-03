import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ["application"],
  queue: [],
  playlistName: Ember.computed.alias("controllers.application.playlistName"),
  playlistUri: Ember.computed.alias("controllers.application.playlistUri"),
  playlistTracks: Ember.computed.alias("controllers.application.playlistTracks"),
  playlistTracksData: Ember.computed.alias("controllers.application.playlistTracksData"),
});
