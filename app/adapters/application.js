/* globals Firebase */
import DS from 'ember-data';
import config from 'spotbot-client/config/environment';


export default DS.FirebaseAdapter.extend({
  firebase: new Firebase(config.FIREBASE_URL)
});
