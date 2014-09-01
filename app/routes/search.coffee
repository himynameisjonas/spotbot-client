`import Ember from 'ember'`

SearchRoute = Ember.Route.extend
  setupController: (controller, model)->
    controller.set('content', [])
    @controllerFor('application').set 'query', model.query
    Ember.$.get("https://api.spotify.com/v1/search", q: model.query, type: 'track').then (data)->
      controller.set 'content', data.tracks.items


`export default SearchRoute`
