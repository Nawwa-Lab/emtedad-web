import alaesh from './alaesh.json'
import auth from './auth.json'
import etabat from './etabat.json'
import fahsMahs from './fahs-mahs.json'
import genny from './genny.json'
import global from './global.json'
import hakima from './hakima.json'
import khalliKhales from './khalli-khales.json'
import landing from './landing.json'
import management from './management.json'
import namliya from './namliya.json'
import profiles from './profiles.json'
import shbeik from './shbeik.json'
import shared from './shared.json'
import team from './team.json'
import communication from './communication.json'

const messages = {
  ...landing,
  ...management,
  ...auth,
  ...etabat,
  ...fahsMahs,
  ...global,
  ...hakima,
  ...khalliKhales,
  ...shared,
  ...profiles,
  ...namliya,
  ...genny,
  ...shbeik,
  ...alaesh,
  ...team,
  ...communication,
}

export default messages
