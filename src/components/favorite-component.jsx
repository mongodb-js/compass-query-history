const React = require('react');
const FontAwesome = require('react-fontawesome');
const PropTypes = require('prop-types');
const Actions = require('../actions');
const QueryComponent = require('./query-component');


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
      <div className="query-history-favorite-query">
        <QueryComponent attributes={attributes} title={this.props.model._name}/>
        <button className="query-history-copy" onClick={this.copyQuery}>
          <FontAwesome name="copy" className="query-history-button-icon"/>
        </button>
        <button className="query-history-delete" onClick={this.deleteFavorite}>
          <FontAwesome name="trash" className="query-history-button-icon"/>
        </button>
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
