`import Ember from 'ember'`

IndexController = Ember.Controller.extend
  needs: ['application']
  playlist: Ember.computed.alias 'controllers.application.playlist'
  actions:
    add: (uri)->
      Ember.$.post "#{window.SpotbotPlayerENV.SPOTBOT_HOST}/queue/tracks", uri: uri
    playlist: (uri)->
      Ember.$.post "#{window.SpotbotPlayerENV.SPOTBOT_HOST}/playlist", uri: uri

`export default IndexController`
