const React = require('react');
const PropTypes = require('prop-types');
const FontAwesome = require('react-fontawesome');
const Actions = require('../actions');
const ViewSwitcher = require('./common/view-switcher');

// const debug = require('debug')('mongodb-compass:query-history:header-component');

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.showRecent = this.showRecent.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
  }

  onViewSwitch(label) {
    if (label === 'Recent') {
      this.showRecent();
    } else if (label === 'Favorites') {
      this.showFavorites();
    }
  }

  showRecent() {
    if (this.props.showing !== 'recent') {
      Actions.showRecent();
    }
  }

  showFavorites() {
    if (this.props.showing !== 'favorites') {
      Actions.showFavorites();
    }
  }

  collapse() {
    Actions.collapse();
  }

  /**
   * Render HeaderComponent.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    const activeButton = this.props.showing === 'recent' ?
      'Recent' : 'Favorites';
    return (
      <div className="query-history-header-component">
        <ViewSwitcher
          label="Past Queries"
          buttonLabels={['Recent', 'Favorites']}
          activeButton={activeButton}
          onClick={this.onViewSwitch.bind(this)}
        />
        <span className="query-history-header-close" href="#" onClick={this.collapse}>
          <FontAwesome name="times"/>
        </span>
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  showing: PropTypes.oneOf(['recent', 'favorites'])
};

HeaderComponent.defaultProps = {
  showing: 'recent'
};

HeaderComponent.displayName = 'QueryHistoryHeaderComponent';

module.exports = HeaderComponent;
