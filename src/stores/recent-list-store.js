const Reflux = require('reflux');
const Actions = require('../actions');
const StateMixin = require('reflux-state-mixin');
// const Query = require('../models/query');
// const QueryCollection = require('../models/query-collection');
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
    // const query = new Query(recent); // TODO: Integrate with Compass: determine the format that queries will come in
    // query.save();
    // this.state.recents.add(query);

    // console.log("adding query to recent list:" + JSON.stringify(recent, null, ''));

    // this.setState({
    //   recents: this.state.recents
    // });
  },

  deleteRecentQuery(query) {
    // console.log('deleting recent query:' + JSON.stringify(query, null, ' '));
    // this.state.recents.remove(query._id);
    // this.setState({
    //   recents: this.state.recents
    // });
  },

  copyQuery(query) {
    // console.log('copy query:' + JSON.stringify(query, null, ' '));
    // clipboard.writeText(JSON.stringify(query, null, ' '));
  }
});

module.exports = RecentListStore;
