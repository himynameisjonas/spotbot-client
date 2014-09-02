`import Ember from 'ember'`

IndexController = Ember.Controller.extend
  needs: ['application']
  playlist: Ember.computed.alias 'controllers.application.playlist'
  actions:
    add: (uri)->
      Ember.$.post "http://office-robot.local:3030/queue/tracks", uri: uri
    playlist: (uri)->
      Ember.$.post "http://office-robot.local:3030/playlist", uri: uri

`export default IndexController`
