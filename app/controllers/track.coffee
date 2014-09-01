`import Ember from 'ember'`

TrackController = Ember.ObjectController.extend
  needs: ['index', 'search']
  artistNames: (->
    if typeof(@get('artists.firstObject')) == "string"
      @get('artists')
    else
      @get('artists').mapProperty('name')
  ).property('artists.[]')

  duration: (->
    @get('model.duration') || @get('duration_ms')
  ).property('duration', 'duration_ms')

  title: (->
    @get('model.title') || @get('name')
  ).property('name')

  albumTitle: (->
    @get('album.name')
  ).property('name')

  imageUrl: (->
    @get('image') || @get('album.images')[1].url
  ).property('preview_url')

  actions:
    enqueue: ->
      @get('controllers.search.tracks').removeObject(@get 'model')
      @get('controllers.index').send 'add', @get('uri')

`export default TrackController`
