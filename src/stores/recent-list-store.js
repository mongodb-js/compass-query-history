const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
const Query = require('../models/query');
const QueryCollection = require('../models/query-collection');
// const FilteredCollection = require('ampersand-filtered-subcollection');

/**
 * Query History Recent List store.
 */
const RecentListStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,

  addRecent(recent) {
    // const query = new Query(recent); // TODO: Integrate with Compass: determine the format that queries will come in
    // query.save();
    // this.state.recents.add(query);

    // console.log('adding query to recent list:' + JSON.stringify(recent, null, ''));

    // this.setState({
    //   recents: this.state.recents
    // });
  },

  saveFavorite(recent, name) {
    // TODO: when state is shared, may not need to delete it.
    this.state.recents.remove(recent._id);
  },

  deleteRecent(query) {
    this.state.recents.remove(query._id);
    this.trigger(this.state);
  },

  copyQuery(query) {
    console.log('copy query, state:' + JSON.stringify(this.state, null, ' '));
    // clipboard.writeText(JSON.stringify(query, null, ' '));
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
    const recents = new QueryCollection([
      new Query({ filter: '{ age: 5 }', skip: 10, limit: 10, isFavorite: false, lastExecuted: Date.now() }),
      new Query({ filter: '{ age: 6 }', skip: 10, limit: 10, isFavorite: false, lastExecuted: Date.now() }),
      new Query({ filter: '{ age: 7 }', skip: 10, limit: 10, isFavorite: false, lastExecuted: Date.now() })
    ]);
    return {
      recents: recents
    };
  }
});

module.exports = RecentListStore;
