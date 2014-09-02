DebouncerInitializer =
  name: 'debouncer'

  # container, app is passed to initialize - add if you need them (you probably do)
  initialize: () ->
    Ember.debouncedObserver = (keys..., time, func) ->
      Em.observer ->
        Em.run.debounce @, func, time
      , keys...

    Ember.throttledObserver = (keys..., time, func) ->
      Em.observer ->
        Em.run.throttle @, func, time
      , keys...

`export default DebouncerInitializer`
