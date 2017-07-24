const React = require('react');
const PropTypes = require('prop-types');
const Actions = require('../actions');

class FavoriteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.copyQuery = this.copyQuery.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  copyQuery() {
    Actions.copyQuery(this.props.model);
  }

  deleteFavorite() {
    Actions.deleteFavorite(this.props.model);
  }
  /**
   * Render FavoriteComponent.
   *
   * Contains a Query Model.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    const attributes = this.props.model.serialize();
    return (
      <div className="query-history-query">
        <p className="query-history-title">{this.props.model._name}</p>
        <ul>
          {Object.keys(attributes).map(function(key, i) {
            return (
              <li key={i}>{key}</li>
            );
          })}
        </ul>
        <ul>
          <li id="COPY-FAVORITE">
            <span href="#" onClick={this.copyQuery}>Copy Favorite</span>
          </li>
          <li id="DELETE-FAVORITE">
            <span href="#" onClick={this.deleteFavorite}>Delete Favorite</span>
          </li>
        </ul>
        <p><i>Contents: {JSON.stringify(this.props.model, null, ' ')}</i></p>
      </div>
    );
  }
}

FavoriteComponent.propTypes = {
  model: PropTypes.object
};

FavoriteComponent.defaultProps = {
  model: null
};

FavoriteComponent.displayName = 'QueryHistoryFavoriteComponent';

module.exports = FavoriteComponent;
