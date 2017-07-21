const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
const Query = require('../models/query');
// const QueryCollection = require('../models/query-collection');
const FilteredCollection = require('ampersand-filtered-subcollection');

/**
 * Query History Recent List store.
 */
const RecentListStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,

  addRecent(recent) {
    // TODO: Integrate with Compass: determine the format that queries will come in
    const query = new Query(recent);
    this.state.recents.add(query);
    this.trigger(this.state);
  },

  saveFavorite(recent) {
    // TODO: when state is shared, may not need to delete it.
    this.state.recents.remove(recent._id);
  },

  deleteRecent(query) {
    this.state.recents.remove(query._id);
    this.trigger(this.state);
  },

  copyQuery(query) {
    console.log('copy query:' + JSON.stringify(query, null, ' '));
    // clipboard.writeText(JSON.stringify(query, null, ' '));
  },

  getInitialState() {
    const queries = this.props.collection;
    const recentQueries = new FilteredCollection(queries, {
      where: {
        isFavorite: false
      },
      comparator: (model) => {
        return -model.lastExecuted;
      }
    });
    return {
      recents: recentQueries
    };
  }
});

module.exports = RecentListStore;
