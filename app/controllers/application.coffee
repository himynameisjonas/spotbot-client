`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  query: null
  actions:
    search: ->
      @transitionToRoute 'search', query: @get('query')
    play: ->
      Ember.$.ajax(url: 'http://office-robot.local:3030/player/start', type: 'PUT')
    pause: ->
      Ember.$.ajax(url: 'http://office-robot.local:3030/player/stop', type: 'PUT')
    next: ->
      Ember.$.ajax(url: 'http://office-robot.local:3030/player/next', type: 'PUT')
    random: ->
      console.log 'random'

`export default ApplicationController`
