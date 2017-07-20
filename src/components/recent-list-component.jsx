const React = require('react');
const _ = require('lodash');

const RecentComponent = require('./recent-component');

// const debug = require('debug')('mongodb-compass:query-history:recent-list-component');

class RecentListComponent extends React.Component {

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
          {_.map(this.props.recents.map, function(item, i) {
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
