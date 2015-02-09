import Ember from 'ember';

export function secondsToTime(input) {
  input = parseInt(input, 10) / 1000;
  var minutes = Math.floor(input / 60);
  var seconds = Math.floor(input - (minutes * 60));

  if(minutes < 10){
    minutes = `0${minutes}`;
  }
  if(seconds < 10){
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

export default Ember.Handlebars.makeBoundHelper(secondsToTime);
