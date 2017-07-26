const QueryHistoryComponent = require('./lib/components');
const QueryHistoryStore = require('./lib/stores');
const QueryHistoryActions = require('./lib/actions');
const RecentListStore = require('./lib/stores/recent-list-store');
const FavoritesListStore = require('./lib/stores/favorites-list-store');
const RecentQuery = require('./lib/models/recent-query');
const FavoriteQuery = require('./lib/models/favorite-query');
const RecentQueryCollection = require('./lib/models/recent-query-collection');
const FavoriteQueryCollection = require('./lib/models/favorite-query-collection');
const ShowQueryHistoryButton = require('./lib/components/show-query-history-button');

/**
 * Activate all the components in the Query History package.
 */
function activate(appRegistry) {
  appRegistry.registerStore('QueryHistory.Store', QueryHistoryStore);
  appRegistry.registerStore('QueryHistory.RecentListStore', RecentListStore);
  appRegistry.registerStore('QueryHistory.FavoritesListStore', FavoritesListStore);
  appRegistry.registerAction('QueryHistory.Actions', QueryHistoryActions);
  appRegistry.registerComponent('QueryHistory.Component', QueryHistoryComponent);
  appRegistry.registerComponent('QueryHistory.ShowQueryHistoryButton', ShowQueryHistoryButton);
}

/**
 * Deactivate all the components in the Query History package.
 */
function deactivate(appRegistry) {
  appRegistry.deregisterStore('QueryHistory.Store');
  appRegistry.deregisterStore('QueryHistory.RecentListStore');
  appRegistry.deregisterStore('QueryHistory.FavoriteListStore');
  appRegistry.deregisterAction('QueryHistory.Actions');
  appRegistry.deregisterComponent('QueryHistory.Component');
  appRegistry.deregisterComponent('QueryHistory.ShowQueryHistoryButton');
}

module.exports = QueryHistoryComponent;
module.exports.RecentQuery = RecentQuery;
module.exports.FavoriteQuery = FavoriteQuery;
module.exports.RecentQueryCollection = RecentQueryCollection;
module.exports.FavoriteQueryCollection = FavoriteQueryCollection;
module.exports.activate = activate;
module.exports.deactivate = deactivate;
