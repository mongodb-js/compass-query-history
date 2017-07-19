const React = require('react');
const PropTypes = require('prop-types');
const Actions = require('../actions');

class FavoriteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.copyQuery = this.copyQuery.bind(this);
    this.deleteQuery = this.deleteQuery.bind(this);
  }

  copyQuery() {
    Actions.copyQuery(this.props.model);
  }

  deleteQuery() {
    Actions.deleteQuery(this.props.model);
  }
  /**
   * Render FavoriteComponent.
   *
   * Contains a name and a Query Model (TBD).
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="query-history-favorite">
        <p><i>A query history favorite</i></p>
        <ul>
          <li id="COPY-RECENT">
            <span href="#" onClick={this.copyQuery}>Copy Recent</span>
          </li>
          <li id="DELETE-RECENT">
            <span href="#" onClick={this.deleteQuery}>Delete Recent</span>
          </li>
        </ul>
      </div>
    );
  }
}

FavoriteComponent.propTypes = {
  model: PropTypes.object.isRequired
};

FavoriteComponent.defaultProps = {
  model: null
};

FavoriteComponent.displayName = 'QueryHistoryFavoriteComponent';

module.exports = FavoriteComponent;
