import Ember from 'ember';

export default Ember.Controller.extend({
  query: null,

  actions: {
    search: function(){
      if (Ember.isEmpty(this.get("query"))) {
        this.transitionToRoute("application");
      } else {
        this.transitionToRoute("search", {query: this.get("query")});
      }
    }
  }
});
