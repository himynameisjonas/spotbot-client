import Ember from "ember";

export function initialize(/* container, application */) {
  Ember.debouncedObserver = function(func, key, time) {
      return Ember.observer(function() {
          Ember.run.debounce(this, func, time);
      }, key);
  };
}

export default {
  name: "debouce-observer",
  initialize: initialize
};
