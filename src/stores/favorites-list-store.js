const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
const Query = require('../models/query');
const QueryCollection = require('../models/query-collection');
const FilteredCollection = require('ampersand-filtered-subcollection');

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
    // @note: QueryCollection is no longer a global singleton, so what I would do here
    //   is fire an action that the RecentListStore listens to that removes the recent
    //   query, like Actions.deleteRecent(recent._id);
    // QueryCollection.remove(recent._id);

    const attributes = recent.serialize();
    attributes.name = name;
    attributes.isFavorite = true;
    attributes.dateSaved = Date.now();

    const query = new Query(attributes);

    this.state.favorites.add(query);
    this.state.current_favorite = null;
    this.trigger(this.state);
  },

  cancelSave() {
    this.setState({
      current_favorite: null
    });
    Actions.showRecent();
  },

  deleteFavorite(query) {
    this.statae.favorites.remove(query._id);
    this.trigger(this.state);
  },

  getInitialState() {
    const favoriteQueries = new FilteredCollection(new QueryCollection(), {
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
