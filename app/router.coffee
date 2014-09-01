`import Ember from 'ember'`
Router = Ember.Router.extend(location: SpotbotPlayerENV.locationType)
Router.map ->

  @route 'application'

`export default Router`
