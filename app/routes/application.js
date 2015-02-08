import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model){
    this.controllerFor("index").set("model", this.store.findAll("queued-track"));
  }
});
