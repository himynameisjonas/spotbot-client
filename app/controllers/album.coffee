`import Ember from 'ember'`

AlbumController = Ember.ObjectController.extend
  needs: ['index', 'search']
  enqueueing: false

  artistNames: (->
    @get('artists').mapProperty('name')
  ).property('artists.[]')

  imageUrl: (->
    @get('images')[1].url
  ).property('images.[]')

  actions:
    enqueue: ->
      return if @get('enqueueing')
      @set 'enqueueing', true
      Ember.$.post("#{window.SpotbotPlayerENV.SPOTBOT_HOST}/playlist", uri: @get 'uri').then =>
        @get('controllers.search.albums').removeObject(@get 'model')


`export default AlbumController`
