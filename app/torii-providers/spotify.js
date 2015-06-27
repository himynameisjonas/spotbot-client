import {configurable} from 'torii/configuration';
import Oauth2Bearer from 'torii/providers/oauth2-bearer';

export default Oauth2Bearer.extend({
  name:    'spotify',
  baseUrl: 'https://accounts.spotify.com/authorize',

  responseParams: ['access_token', 'token_type', 'expires_in'],
  scope: configurable('scope', ''),
});
