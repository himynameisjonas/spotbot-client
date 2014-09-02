`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  setupController: ->
    @controllerFor('application').set('query', '')

`export default IndexRoute`
