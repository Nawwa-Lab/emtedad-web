import alaesh from './alaesh.json'
import auth from './auth.json'
import etabat from './etabat.json'
import fahsMahs from './fahs-mahs.json'
import genny from './genny.json'
import global from './global.json'
import landing from './landing.json'
import namliya from './namliya.json'
import profiles from './profiles.json'
import shbeik from './shbeik.json'
import shared from './shared.json'

const messages = {
  ...landing,
  ...auth,
  ...etabat,
  ...fahsMahs,
  ...global,
  ...shared,
  ...profiles,
  ...namliya,
  ...genny,
  ...shbeik,
  ...alaesh,
}

export default messages
