`import Ember from 'ember'`

TrackController = Ember.ObjectController.extend
  formattedDuration: (->
    @get('duration')
  ).property('duration')

`export default TrackController`
