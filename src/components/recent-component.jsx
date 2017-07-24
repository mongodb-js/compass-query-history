const React = require('react');
const FontAwesome = require('react-fontawesome');
const PropTypes = require('prop-types');
const Actions = require('../actions');
const QueryComponent = require('./query-component');

// const debug = require('debug')('mongodb-compass:query-history:list-component');

class RecentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.saveRecent = this.saveRecent.bind(this);
    this.copyQuery = this.copyQuery.bind(this);
    this.deleteRecent = this.deleteRecent.bind(this);
  }

  saveRecent() {
    Actions.saveRecent(this.props.model);
  }

  copyQuery() {
    Actions.copyQuery(this.props.model);
  }

  deleteRecent() {
    Actions.deleteRecent(this.props.model);
  }

  /**
   * Render RecentComponent.
   *
   * Contains a Query Model (TBD).
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    const attributes = this.props.model.serialize();
    return (
      <div className="query-history-recent-query">
        <QueryComponent attributes={attributes}
                        title={this.props.model._lastExecuted.toString()}/>
        <button className="query-history-save" onClick={this.saveRecent}>
          <FontAwesome name="star-o" className="query-history-button-icon"/>
        </button>
        <button className="query-history-copy" onClick={this.copyQuery}>
          <FontAwesome name="clipboard" className="query-history-button-icon"/>
        </button>
        <button className="query-history-delete" onClick={this.deleteFavorite}>
          <FontAwesome name="trash" className="query-history-button-icon"/>
        </button>
      </div>
    );
  }
}

RecentComponent.propTypes = {
  model: PropTypes.object.isRequired
};

RecentComponent.defaultProps = {
  model: null
};

RecentComponent.displayName = 'QueryHistoryRecentComponent';

module.exports = RecentComponent;
