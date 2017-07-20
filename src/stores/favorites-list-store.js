const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
// const Query = require('../models/query');
// const QueryCollection = require('../models/query-collection');
// const FilteredCollection = require('ampersand-filtered-subcollection');

// const debug = require('debug')('mongodb-compass:query-history:favorites-store');

/**
 * Query History Favorites List store.
 */
const FavoritesListStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,


  saveRecent(query) {
    this.setState({
      current_favorite: query
    });
    Actions.showFavorites();
  },

  saveFavorite(recent, name) {
    // this.state.favorites.remove(recent._id);

    // const attributes = recent.serialize();
    // attributes.name = name;
    // attributes.isFavorite = true;

    // const query = new Query(attributes); //TODO: does this change _id?
    // query.save();
    //
    // this.state.favorites.add(query);

    // this.setState({
    //   current_favorite: null,
    //   favorites: this.state.favorites
    // });
  },

  deleteFavoriteQuery(query) {
    // console.log('deleting favorite query:' + JSON.stringify(query, null, ' '));
    // this.state.favorites.remove(query._id);
    // this.setState({
    //   favorites: this.state.favorites
    // });
  }

});

module.exports = FavoritesListStore;
