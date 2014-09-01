`import Ember from 'ember'`

secondsToTime = (value) ->
  input = parseInt(value, 10)  / 1000
  minutes = Math.floor(input / 60)
  seconds = Math.floor(input - (minutes * 60))

  if minutes < 10 then minutes = "0#{minutes}"
  if seconds < 10 then seconds = "0#{seconds}"
  "#{minutes}:#{seconds}"

SecondsToTimeHelper = Ember.Handlebars.makeBoundHelper secondsToTime

`export { secondsToTime }`

`export default SecondsToTimeHelper`
