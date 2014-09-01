`import Ember from 'ember'`

SearchRoute = Ember.Route.extend
  setupController: (controller, model)->
    controller.set('content', [])
    Ember.$.get("https://api.spotify.com/v1/search", q: model.query, type: 'track').then (data)->
      controller.set 'content', data.tracks.items
    controller.set 'query', model.query


`export default SearchRoute`
