import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model){
    this._super(controller, model);
    this.controllerFor('application').set('query', '');
  },
});
