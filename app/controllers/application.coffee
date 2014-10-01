`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  ajaxError: false
  query: null
  isChangingShuffle: true
  displayVolume: (->
    @get 'volume.volume'
  ).property('volume.volume')


  isShuffle: (->
    @get('playlist.shuffle')
  ).property('playlist.shuffle')

  init: ->
    Ember.$(document).ajaxError (e, xhr, options, thrownError) =>
      @set('ajaxError', true)

  isShuffleObserver: (->
    @set 'isChangingShuffle', false
  ).observes('isShuffle')

  queryObserver: Ember.debouncedObserver 'query', 300, ->
    @send 'search'

  firebaseVolumeObserver: (->
      @set 'displayVolume', @get 'volume.volume'
  ).observes('volume.volume')

  volumeObserver: Ember.debouncedObserver 'displayVolume', 500, ->
    return if @get('volume.volume') == @get('displayVolume')
    Ember.$.ajax(url: "#{window.SpotbotClientENV.SPOTBOT_HOST}/player/volume", data: {level: @get('displayVolume')}, type: 'PUT')

  actions:
    search: ->
      if Ember.isEmpty @get('query')
        @transitionToRoute 'index'
      else
        @transitionToRoute 'search', query: @get('query')
    play: ->
      Ember.$.ajax(url: "#{window.SpotbotClientENV.SPOTBOT_HOST}/player/start", type: 'PUT')
    pause: ->
      Ember.$.ajax(url: "#{window.SpotbotClientENV.SPOTBOT_HOST}/player/stop", type: 'PUT')
    next: ->
      Ember.$.ajax(url: "#{window.SpotbotClientENV.SPOTBOT_HOST}/player/next", type: 'PUT')
    random: ->
      @set 'isChangingShuffle', true
      if @get('isShuffle')
        Ember.$.ajax(url: "#{window.SpotbotClientENV.SPOTBOT_HOST}/playlist/shuffle", type: 'DELETE')

      else
        Ember.$.ajax(url: "#{window.SpotbotClientENV.SPOTBOT_HOST}/playlist/shuffle", type: 'PUT')
    closeAlert: ->
      @set('ajaxError', false)
`export default ApplicationController`
