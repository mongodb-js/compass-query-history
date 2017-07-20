const React = require('react');

const RecentComponent = require('./recent-component');
const Query = require('../models/query');
const QueryCollection = require('../models/query-collection');

// const debug = require('debug')('mongodb-compass:query-history:recent-list-component');

class RecentListComponent extends React.Component {
  constructor(props) {
    super(props);

    // const queries = QueryCollection.fetch();
    // var recentQueries = new FilteredCollection(queries, {
    //   where: {
    //     isFavorite: false
    //   },
    //   comparator: (model) => {
    //     return -model.lastExecuted;
    //   }
    // });
    const recentColl = new QueryCollection([
      new Query({ filter: '{ age: 1 }', skip: 10, limit: 10, isFavorite: true }),
      new Query({ filter: '{ age: 2 }', skip: 10, limit: 10, isFavorite: true }),
      new Query({ filter: '{ age: 3 }', skip: 10, limit: 10, isFavorite: true })
    ]);
    this.state = {
      recents: recentColl,
      current_favorite: null
    };
  }

  /**
   * Render RecentList component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="query-history-recent-list">
        <h2 className="query-history-title">RecentListComponent</h2>
        <p><i>The query history recent-list.</i></p>
        <ul>
          {this.state.recents.map(function(item, i) {
            return (
              <RecentComponent key={i} model={item}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

RecentListComponent.displayName = 'QueryHistoryRecentListComponent';

module.exports = RecentListComponent;
