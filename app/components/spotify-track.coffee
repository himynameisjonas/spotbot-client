`import Ember from 'ember'`

SpotifyTrackComponent = Ember.Component.extend
  canEnqueue: false
  classNameBindings: [":media", ":track", "track.enqueueing:enqueueing", "track.removing:removing"]
  tagName: 'li'
  enqueueing: false
  removing: false
  collection: []

  artistNames: (->
    if typeof(@get('track.artists.firstObject')) == "string"
      @get('track.artists')
    else
      @get('track.artists').mapProperty('name')
  ).property('track.artists.[]')

  duration: (->
    @get('track.duration') || @get('track.duration_ms')
  ).property('duration', 'duration_ms')

  title: (->
    @get('track.title') || @get('track.name')
  ).property('track.name')

  albumTitle: (->
    @get('track.album.name')
  ).property('track.name')

  imageUrl: (->
    if Ember.isEmpty @get('track.image')
      images = @get('track.album.images')
      image = images[1].url unless Ember.isEmpty @get 'track.album.images'
    else
      image = @get('track.image')
    image || "/empty.jpg"
  ).property('preview_url')


  actions:
    enqueue: ->
      return if @get('enqueueing')
      @set 'enqueueing', true
      Ember.$.post("#{window.SpotbotPlayerENV.SPOTBOT_HOST}/queue/tracks", uri: @get('track.uri')).then =>
        @set 'removing', true
        Ember.run.later @, (->
          @get('collection').removeObject(@get 'track')
          ), 400

`export default SpotifyTrackComponent`
