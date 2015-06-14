import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  queueable: true,
  actions: {
    enqueue: function(){
      this.get('store').createRecord("queued-track", {uri: this.get("track.data.uri")}).save().then(()=>{
        this.set('queueable', false);
      });
    },
  }
});
