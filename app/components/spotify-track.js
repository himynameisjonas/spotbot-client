import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  name: Ember.computed.alias("data.name"),
  duration: Ember.computed.alias("data.duration_ms"),

  artists: function(){
    if (this.get("data.artists")) {
      return this.get("data.artists").mapProperty("name");
    }
  }.property("data.artists"),

  image: function(){
    if (Ember.isEmpty(this.get("data.album.images"))) {
      return "http://freemusicarchive.org/img/generic/album-default-lp-transparent.png?method=crop&width=155&height=155";
    } else {
      return this.get("data.album.images")[1].url;
    }
  }.property('data.album.images.@each.url'),
});
