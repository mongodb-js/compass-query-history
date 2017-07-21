const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
const Query = require('../models/query');
const QueryCollection = require('../models/query-collection');
const FilteredCollection = require('ampersand-filtered-subcollection');

const TOTAL_RECENTS = 30;

/**
 * Query History Recent List store.
 */
const RecentListStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,

  addRecent(recent) {
    // TODO: Integrate with Compass: determine the format that queries will come in
    if (this.state.recents.length >= TOTAL_RECENTS) {
      QueryCollection.remove(this.state.recents.at(TOTAL_RECENTS - 1)._id);
    }

    const query = new Query(recent);
    QueryCollection.add(query);
    this.trigger(this.state);
  },

  deleteRecent(query) {
    QueryCollection.remove(query._id);
    this.trigger(this.state);
  },

  copyQuery(query) {
    console.log('copy query:' + JSON.stringify(query, null, ' '));
    // clipboard.writeText(JSON.stringify(query, null, ' '));
  },

  getInitialState() {
    const recentQueries = new FilteredCollection(QueryCollection, {
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
