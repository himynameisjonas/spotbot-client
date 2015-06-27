import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('index');
    }
  },
  model: function(){
    var all = this.store.all('playlist');
    if (all.get('length') === 0) {
      return this.store.findAll('playlist');
    } else {
      return all;
    }
  },
  actions: {
    enqueue: function(uri){
      this.store.adapterFor('application').get('_ref').child('playlist/uri').set(uri);
    },
  }
});
