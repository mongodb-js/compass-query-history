const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
const { Query, QueryCollection } = require('../../');
// const FilteredCollection = require('ampersand-filtered-subcollection');

// const debug = require('debug')('mongodb-compass:query-history:favorites-store');

/**
 * Query History Favorites List store.
 */
const FavoritesListStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,

  init() {
  },

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
  },

  getInitialState() {
    // const queries = QueryCollection.fetch();
    // var favoriteQueries = new FilteredCollection(queries, {
    //   where: {
    //     isFavorite: true
    //   },
    //   comparator: (model) => {
    //     return -model.lastExecuted;
    //   }
    // });

    const favorites = new QueryCollection([
      new Query({ filter: '{ age: 5 }', skip: 10, limit: 10, isFavorite: true })
    ]);

    return {
      favorites: favorites,
      current_favorite: null
    };
  }
});

module.exports = FavoritesListStore;
