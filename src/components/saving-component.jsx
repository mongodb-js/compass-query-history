const React = require('react');
const PropTypes = require('prop-types');
const Actions = require('../actions');

class SavingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.cancelSave = this.cancelSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.name = this.props.model.lastExecuted.toString();
  }

  cancelSave() {
    Actions.cancelSave();
  }

  handleChange(event) {
    this.name = event.target.value;
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.name);
    event.preventDefault();
    Actions.saveFavorite(this.props.model, this.name);
  }

  /**
   * Render SavingComponent, which represents a query being saved.
   *
   * Contains a Query Model.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="query-history-saving">
        <p><i>Currently being saved + {JSON.stringify(this.props.model, null, ' ')}</i></p>

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Save" />
        </form>

        <li id="CANCEL-SAVE">
          <span href="#" onClick={this.cancelSave()}>Cancel</span>
        </li>
      </div>
    );
  }
}

SavingComponent.propTypes = {
  model: PropTypes.object
};

SavingComponent.defaultProps = {
  model: null
};

SavingComponent.displayName = 'QueryHistorySavingComponent';

module.exports = SavingComponent;
