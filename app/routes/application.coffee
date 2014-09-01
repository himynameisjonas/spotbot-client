`import Ember from 'ember'`
`import Queue from 'spotbot-player/models/queue'`
`import Track from 'spotbot-player/models/track'`


ApplicationRoute = Ember.Route.extend
  setupController: ->
    @_super()
    ref = new Firebase('https://flower-spotify.firebaseio.com')
    @controllerFor('index').set 'queue', Queue.create ref: ref.child('queue')
    @controllerFor('index').set 'playlist', Track.create ref: ref.child('playlist')
    @controllerFor('current-track').set 'model', Track.create ref: ref.child('current_track')

  renderTemplate: ->
    @render()
    @render "current-track",
      controller: "current-track"
      outlet: "current-track"
      into: "application"

`export default ApplicationRoute`
