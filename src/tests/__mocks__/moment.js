// Using import moment from 'moment' will fail as it will be using this file and not the package
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
}
