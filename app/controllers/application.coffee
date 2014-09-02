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

  queryObserver: Ember.debouncedObserver 'query', 300, ->
    @send 'search'

  actions:
    search: ->
      if Ember.isEmpty @get('query')
        @transitionToRoute 'index'
      else
        @transitionToRoute 'search', query: @get('query')
    play: ->
      Ember.$.ajax(url: "#{window.SpotbotPlayerENV.SPOTBOT_HOST}/player/start", type: 'PUT')
    pause: ->
      Ember.$.ajax(url: "#{window.SpotbotPlayerENV.SPOTBOT_HOST}/player/stop", type: 'PUT')
    next: ->
      Ember.$.ajax(url: "#{window.SpotbotPlayerENV.SPOTBOT_HOST}/player/next", type: 'PUT')
    random: ->
      @set 'isChangingShuffle', true
      if @get('isShuffle')
        Ember.$.ajax(url: "#{window.SpotbotPlayerENV.SPOTBOT_HOST}/playlist/shuffle", type: 'DELETE')

      else
        Ember.$.ajax(url: "#{window.SpotbotPlayerENV.SPOTBOT_HOST}/playlist/shuffle", type: 'PUT')

`export default ApplicationController`
