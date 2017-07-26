const Reflux = require('reflux');

const Actions = Reflux.createActions([
  /**
   * define your actions as strings below, for example:
   */
  'showFavorites',
  'showRecent',
  'collapse',
  'unCollapse',
  'copyQuery',
  'deleteRecent',
  'deleteFavorite',
  'addRecent',
  'saveRecent',
  'saveFavorite',
  'cancelSave',
  'runQuery'
]);

module.exports = Actions;
