`import Ember from 'ember'`
`import Queue from 'spotbot-player/models/queue'`

ApplicationRoute = Ember.Route.extend
  setupController: ->
    @_super()
    ref = @controllerFor('application').get('ref')
    @controllerFor('queue').set 'model', Queue.create ref: ref.child('queue')

  renderTemplate: ->
    @render()
    @render "queue",
      controller: "queue"
      outlet: "queue"
      into: "application"

`export default ApplicationRoute`
