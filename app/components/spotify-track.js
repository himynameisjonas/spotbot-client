import Ember from "ember";

export default Ember.Component.extend({
  queueable: true,
  name: Ember.computed.alias("data.name"),
  duration: Ember.computed.alias("data.duration_ms"),

  style: function() {
    return `background-image: url(${ this.get("image")})`;
  }.property("image"),

  artists: function(){
    if (this.get("data.artists")) {
      return this.get("data.artists").map(function(artist){
        return {name: artist.name, search: `artist:"${artist.name}"`};
      });
    }
  }.property("data.artists"),

  artistNames: function(){
    return this.get("artists").mapProperty("name").join(", ");
  }.property("artists"),

  image: function(){
    if (Ember.isEmpty(this.get("data.album.images"))) {
      return "http://freemusicarchive.org/img/generic/album-default-lp-transparent.png?method=crop&width=155&height=155";
    } else {
      var image = this.get("data.album.images")[1] || this.get("data.album.images")[0];
      return image.url;
    }
  }.property("data.album.images.@each.url"),
});
