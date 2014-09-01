`import Ember from 'ember'`

IndexController = Ember.ArrayController.extend
  actions:
    add: (uri)->
      console.log("add!!!111")
      Ember.$.post "http://office-robot.local:3030/queue/tracks", uri: uri

`export default IndexController`
