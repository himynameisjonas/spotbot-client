`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  query: null
  isChangingShuffle: true
  isShuffle: (->
    @get('playlist.shuffle')
  ).property('playlist.shuffle')

  isShuffleObserver: (->
    @set 'isChangingShuffle', false
  ).observes('isShuffle')

  actions:
    search: ->
      if Ember.isEmpty @get('query')
        @transitionToRoute 'index'
      else
        @transitionToRoute 'search', query: @get('query')
    play: ->
      Ember.$.ajax(url: 'http://office-robot.local:3030/player/start', type: 'PUT')
    pause: ->
      Ember.$.ajax(url: 'http://office-robot.local:3030/player/stop', type: 'PUT')
    next: ->
      Ember.$.ajax(url: 'http://office-robot.local:3030/player/next', type: 'PUT')
    random: ->
      @set 'isChangingShuffle', true
      if @get('isShuffle')
        Ember.$.ajax(url: 'http://office-robot.local:3030/playlist/shuffle', type: 'DELETE')

      else
        Ember.$.ajax(url: 'http://office-robot.local:3030/playlist/shuffle', type: 'PUT')

`export default ApplicationController`
