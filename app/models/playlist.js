import DS from 'ember-data';

export default DS.Model.extend({
  uri: DS.attr('string'),
  name: DS.attr('string'),
  tracks: DS.attr('raw'),
  images: DS.attr('raw'),

  image: function(){
    return this.get('images.firstObject.url');
  }.property('images.[]'),
});
