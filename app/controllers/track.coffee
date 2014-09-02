`import Ember from 'ember'`

TrackController = Ember.ObjectController.extend
  needs: ['index', 'search']
  enqueueing: false
  removing: false

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
    if Ember.isEmpty @get('image')
      images = @get('album.images')
      image = images[1].url unless Ember.isEmpty @get 'album.images'
    else
      image = @get('image')
    image || "/empty.jpg"
  ).property('preview_url')

  actions:
    enqueue: ->
      return if @get('enqueueing')
      @set 'enqueueing', true
      Ember.$.post("#{window.SpotbotPlayerENV.SPOTBOT_HOST}/queue/tracks", uri: @get('uri')).then =>
        @set 'removing', true
        Ember.run.later @, (->
          @get('controllers.search.tracks').removeObject(@get 'model')
          ), 400


`export default TrackController`
