`import Ember from 'ember'`

SearchController = Ember.ArrayController.extend
  query: null
  model: []

  actions:
    search: ->
      @transitionToRoute 'search', query: @get('query')

`export default SearchController`
