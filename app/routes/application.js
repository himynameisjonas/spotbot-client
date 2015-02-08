import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(){
    this.controllerFor("index").set("model", this.store.findAll("queued-track"));
  }
});
