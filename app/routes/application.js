import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(){
    this.controllerFor("index").set("queue", this.store.findAll("queued-track"));

    var ref = this.store.adapterFor("application").get("_ref");
    ref.child("playlist").on("value", (data)=>{
      this.controllerFor("index").set("playlist", data.val());
    });
  }
});
