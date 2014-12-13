`import Ember from 'ember'`

IndexController = Ember.Controller.extend
  needs: ['application']
  playlist: Ember.computed.alias 'controllers.application.playlist'
  actions:
    changePlaylist: ->
      @set 'showPlaylistForm', false
      Ember.$.post("#{window.SpotbotClientENV.SPOTBOT_HOST}/playlist", uri: @get 'playlistUri').then =>
        @set 'playlistUri', null
    togglePlaylistForm: ->
      @toggleProperty('showPlaylistForm')
      false

`export default IndexController`
