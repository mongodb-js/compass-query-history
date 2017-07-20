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
    console.log("IN FAVORITE save recent, state:" + JSON.stringify(this.state, null, ' '));
    // this.setState({
    //   current_favorite: query
    // });
    // Actions.showFavorites();
  },

  saveFavorite(recent, name) {
    console.log("save favorite, state:" + JSON.stringify(this.state, null, ' '));

    // this.state.collection.remove(recent._id);

    // const attributes = recent.serialize();
    // attributes.name = name;
    // attributes.isFavorite = true;

    // const query = new Query(attributes); //TODO: does this change _id?
    // query.save();
    //
    // this.state.collection.add(query);

    // this.setState({
    //   current_favorite: null,
    //   collection: this.state.collection
    // });
  },

  deleteFavorite(query) {
    console.log("delete favorite, state:" + JSON.stringify(this.state, null, ' '));
    // console.log('deleting favorite query:' + JSON.stringify(query, null, ' '));
    // this.state.collection.remove(query._id);
    // this.setState({
    //   collection: this.state.collection
    // });
  },

  getInitialState() {
    console.log("favorites-list get initial state, state:" + JSON.stringify(this.state, null, ' ') + ' props: ' + JSON.stringify(this.props, null, ' '));;
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
      new Query({ filter: '{ age: FAVORITES INITIAL STATE }', skip: 10, limit: 10, isFavorite: true }),
    ]);
    return {
      collection: favoritesColl,
      current_favorite: null
    };
  }

});

module.exports = FavoritesListStore;
