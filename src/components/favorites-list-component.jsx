const React = require('react');
const PropTypes = require('prop-types');

const FavoritesComponent = require('./favorite-component');

// const debug = require('debug')('mongodb-compass:query-history:favorites-list-component');

class FavoritesListComponent extends React.Component {
  constructor(props) {
    super(props);

  }

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
          {this.props.collection.map(function(item, i) {
            return (
              <FavoritesComponent key={i + 1} model={item}/>
            );
          })}
        </ul>
      </div>
    );
  }
}
FavoritesListComponent.propTypes = {
  collection: PropTypes.object,
  current_favorite: PropTypes.object
};

FavoritesListComponent.defaultProps = {
  collection: null,
  current_favorite: null
};

FavoritesListComponent.displayName = 'QueryHistoryFavoritesListComponent';

module.exports = FavoritesListComponent;
