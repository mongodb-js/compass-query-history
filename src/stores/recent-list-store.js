const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
const { Query, QueryCollection } = require('../../');
// const FilteredCollection = require('ampersand-filtered-subcollection');

/**
 * Query History Recent List store.
 */
const RecentListStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,

  init() {
  },

  addRecent(recent) {
    // @note: Durran: To save the recent query:
    //   const query = new Query({ filter: '', projection: '', sort: '', skip: 0, limit: 0, lastExecuted: new Date() });
    //   query.save();
    this.setState({
      recents: this.state.recents.push(recent)
    });
  },
  
  saveRecent(recent) {
    console.log("saving recent");
    console.log(recent);
  },

  deleteQuery(recent) {
    console.log("deleting recent");
    console.log(recent);
  },

  copyQuery(recent) {
    console.log("copy recent");
    console.log(recent);
  },

  getInitialState() {
    // const queries = QueryCollection.fetch();
    // var recentQueries = new FilteredCollection(queries, {
      // where: {
        // isFavorite: false
      // },
      // comparator: (model) => {
        // return -model.lastExecuted;
      // }
    // });
    const recents = new QueryCollection([
      new Query({ filter: '{ age: 1 }', skip: 1, limit: 10 })
    ]);
    return {
      recents: recents
    };
  }
});

module.exports = RecentListStore;
