`import Ember from 'ember'`
Router = Ember.Router.extend(location: SpotbotPlayerENV.locationType)
Router.map ->

  @route 'search', path: 'search/:query'

`export default Router`
