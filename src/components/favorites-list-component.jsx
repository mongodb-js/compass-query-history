const React = require('react');
const _ = require('lodash');

const FavoritesComponent = require('./favorite-component');

// const debug = require('debug')('mongodb-compass:query-history:favorites-list-component');

class FavoritesListComponent extends React.Component {

  /**
   * Render FavoritesListComponent.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="query-history-favorites-list">
        <h2 className="query-history-title">FavoritesListComponent</h2>
        <p><i>The query history favorites-list.</i></p>
        <ul>
          <p> Current favorite:</p>
          <FavoritesComponent key={0} model={this.props.current_favorite}/>
          {_.map(this.props.favorites, function(item, i) {
            return (
              <FavoritesComponent key={i + 1} model={item}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

FavoritesListComponent.displayName = 'QueryHistoryFavoritesListComponent';

module.exports = FavoritesListComponent;
