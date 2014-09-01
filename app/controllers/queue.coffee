`import Ember from 'ember'`

QueueController = Ember.ArrayController.extend
  actions:
    add: (uri)->
      Ember.$.post "http://office-robot.local:3030/queue/tracks", uri: uri

`export default QueueController`
