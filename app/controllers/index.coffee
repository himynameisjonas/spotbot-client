`import Ember from 'ember'`

IndexController = Ember.Controller.extend
  needs: ['application']
  playlist: Ember.computed.alias 'controllers.application.playlist'

`export default IndexController`
