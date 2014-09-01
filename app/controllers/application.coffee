`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  init: ->
    @set('ref', new Firebase('https://flower-spotify.firebaseio.com'))
    # @set('connectedRef' = ref.child('.info/connected');

`export default ApplicationController`
