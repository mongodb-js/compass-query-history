const Reflux = require('reflux');

const Actions = Reflux.createActions([
  /**
   * define your actions as strings below, for example:
   */
  'showFavorites',
  'showRecent',
  'collapse',
  'copyQuery',
  'deleteQuery',
  'addRecent',
  'saveRecent',
  'saveFavorite'
]);

module.exports = Actions;
