`import Ember from 'ember'`

AlbumController = Ember.ObjectController.extend
  needs: ['index', 'search']

  artistNames: (->
    @get('artists').mapProperty('name')
  ).property('artists.[]')

  imageUrl: (->
    @get('images')[1].url
  ).property('images.[]')

  actions:
    enqueue: ->
      @get('controllers.search.albums').removeObject(@get 'model')
      @get('controllers.index').send 'playlist', @get('uri')



`export default AlbumController`
