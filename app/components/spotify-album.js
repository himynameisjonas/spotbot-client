import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  name: Ember.computed.alias("data.name"),
  artists: function(){
    if (this.get("data.artists")) {
      return this.get("data.artists").mapProperty("name");
    }
  }.property("data.artists"),

  released: function(){
    var date = this.get("data.release_date");
    if (!Ember.isEmpty(date)) {
      return date.substring(0,4);
    }
  }.property("data.release_date"),

  image: function(){
    if (Ember.isEmpty(this.get("data.images"))) {
      return "http://freemusicarchive.org/img/generic/album-default-lp-transparent.png?method=crop&width=155&height=155";
    } else {
      return this.get("data.images")[1].url;
    }
  }.property('data.images.@each.url'),

});
