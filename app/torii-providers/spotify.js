import {configurable} from 'torii/configuration';
import Oauth2Bearer from 'torii/providers/oauth2-bearer';

export default Oauth2Bearer.extend({
  name:    'spotify',
  baseUrl: 'https://accounts.spotify.com/authorize',

  responseParams: ['access_token', 'token_type', 'expires_in'],
  scope: configurable('scope', ''),
  // redirectUri: configurable('redirectUri', function() {
  //   // A hack that allows redirectUri to be configurable
  //   // but default to the superclass
  //   return this._super();
  // })
  redirectUri: configurable('redirectUri', function() {
    return window.location.origin;
  })
});
