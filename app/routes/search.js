import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model){
    this.controllerFor('application').set('query', model.query);
    controller.set('tracks', []);
    controller.set('albums', []);

    Ember.$.get("https://api.spotify.com/v1/search",{q: model.query, limit: 50, type: 'track', market: 'se'}).then(function(data){
      controller.set('tracks', data.tracks.items);
    });
    Ember.$.get("https://api.spotify.com/v1/search",{q: model.query, limit: 20, type: 'album', market: 'se'}).then(function(data){
      if(!Ember.isEmpty(data.albums.items)){
        Ember.$.get("https://api.spotify.com/v1/albums",{ids: data.albums.items.mapProperty('id').join(","), type: 'album'}).then(function(data){
          controller.set('albums', data.albums);
        });
      }
    });
  },
  actions: {
    enqueue: function(uri){
      this.store.createRecord("queued-track", {uri: uri}).save();
    },
  }
});
