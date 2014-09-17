`import Ember from 'ember'`

SearchRoute = Ember.Route.extend
  setupController: (controller, model)->
    @controllerFor('application').set 'query', model.query
    controller.set 'tracks', []
    controller.set 'albums', []

    Ember.$.get("https://api.spotify.com/v1/search", q: model.query, limit: 50, type: 'track', market: 'se').then (data)->
      controller.set 'tracks', data.tracks.items
    Ember.$.get("https://api.spotify.com/v1/search", q: model.query, limit: 20, type: 'album', market: 'se').then (data)->
      return if Ember.isEmpty data.albums.items
      Ember.$.get("https://api.spotify.com/v1/albums", ids: data.albums.items.mapProperty('id').join(","), type: 'album').then (data)->
        controller.set 'albums', data.albums


`export default SearchRoute`
