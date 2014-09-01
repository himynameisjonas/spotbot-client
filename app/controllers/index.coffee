`import Ember from 'ember'`
`import User from 'spotbot-player/models/track'`

IndexController = Ember.Controller.extend
  needs: ['application']
  ref: Ember.computed.alias 'controllers.application.ref'
  currentTrack: (->
    User.create ref: @get('ref').child('current_track')
  ).property()

`export default IndexController`
