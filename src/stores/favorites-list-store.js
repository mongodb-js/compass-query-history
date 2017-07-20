const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
const Query = require('../models/query');
const QueryCollection = require('../models/query-collection');
// const FilteredCollection = require('ampersand-filtered-subcollection');

// const debug = require('debug')('mongodb-compass:query-history:favorites-store');

/**
 * Query History Favorites List store.
 */
const FavoritesListStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,


  saveRecent(query) {
    console.log('IN FAVORITE save recent, state:' + JSON.stringify(this.state, null, ' '));
    // this.setState({
    //   current_favorite: query
    // });
    // Actions.showFavorites();
  },

  saveFavorite(recent, name) {
    console.log('save favorite, state:' + JSON.stringify(this.state, null, ' '));

    // this.state.recents.remove(recent._id);

    // const attributes = recent.serialize();
    // attributes.name = name;
    // attributes.isFavorite = true;

    // const query = new Query(attributes); //TODO: does this change _id?
    // query.save();
    //
    // this.state.recents.add(query);

    // this.setState({
    //   current_favorite: null,
    //   favorites: this.state.recents
    // });
  },

  deleteFavorite(query) {
    this.state.favorites.remove(query._id);
    this.trigger(this.state);
  },

  getInitialState() {
    console.log('favorites-list get initial state, state:' + JSON.stringify(this.state, null, ' ') + ' props: ' + JSON.stringify(this.props, null, ' '));
    // const queries = QueryCollection.fetch();
    // var favoriteQueries = new FilteredCollection(queries, {
    //   where: {
    //     isFavorite: true
    //   },
    //   comparator: (model) => {
    //     return -model.lastExecuted;
    //   }
    // });
    const favoritesColl = new QueryCollection([
      new Query({ filter: '{ age: 1 }', skip: 10, limit: 10, isFavorite: true }),
      new Query({ filter: '{ age: 2 }', skip: 10, limit: 10, isFavorite: true }),
      new Query({ filter: '{ age: 3 }', skip: 10, limit: 10, isFavorite: true })
    ]);
    return {
      favorites: favoritesColl,
      current_favorite: null
    };
  }

});

module.exports = FavoritesListStore;
