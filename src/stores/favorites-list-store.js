const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
const Query = require('../models/query');
const QueryCollection = require('../models/query-collection');
const FilteredCollection = require('ampersand-filtered-subcollection');
// const { QueryCollection } = require('../..');

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
    this.state.favorites.remove(recent._id);

    const attributes = recent.serialize();
    attributes.name = name;
    attributes.isFavorite = true;
    attributes.dateSaved = Date.now();

    const query = new Query(attributes); // TODO: does this change _id?

    this.state.favorites.add(query);

    this.setState({
      current_favorite: null
    });
  },

  cancelSave() {
    this.setState({
      current_favorite: null
    });
    Actions.showRecent();
  },

  deleteFavorite(query) {
    this.state.favorites.remove(query._id);
    this.trigger(this.state);
  },

  getInitialState() {
    const favoriteQueries = new FilteredCollection(QueryCollection, {
      where: {
        isFavorite: true
      },
      comparator: (model) => {
        return -model.dateSaved;
      }
    });
    return {
      favorites: favoriteQueries,
      current_favorite: null
    };
  }

});

module.exports = FavoritesListStore;
