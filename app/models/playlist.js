import Ember from 'ember';

export default Ember.Object.extend({
  image: function(){
    return this.get('images.firstObject.url');
  }.property('images.[]'),
});
