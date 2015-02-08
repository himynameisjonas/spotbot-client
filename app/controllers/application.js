import Ember from 'ember';

export default Ember.Controller.extend({
  query: null,

  actions: {
    search: function(){
      console.log(this.get("query"))
    }
  }
});
