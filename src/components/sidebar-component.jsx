const React = require('react');
const PropTypes = require('prop-types');

const { StoreConnector } = require('hadron-react-components');
const HeaderComponent = require('./header-component');
const RecentListComponent = require('./recent-list-component');
const FavoritesListComponent = require('./favorites-list-component');
const HeaderStore = require('../stores/header-store');
const RecentListStore = require('../stores/recent-list-store');
const FavoritesListStore = require('../stores/favorites-list-store');

// const debug = require('debug')('mongodb-compass:query-history:sidebar-component');

class SidebarComponent extends React.Component {
  renderFavorites() {
    return (
      <StoreConnector store={FavoritesListStore}>
        <FavoritesListComponent/>
      </StoreConnector>
    );
  }

  renderRecents() {
    return (
      <StoreConnector store={RecentListStore}>
        <RecentListComponent/>
      </StoreConnector>
    );
  }

  /**
   * Render Sidebar component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    if (!this.props.collapsed) {
      return (
        <div className="query-history">
          <div className="query-history-sidebar-component">
            <StoreConnector store={HeaderStore}>
              <HeaderComponent showing={this.props.showing}/>
            </StoreConnector>
            {this.props.showing === 'favorites' ? this.renderFavorites() : null}
            {this.props.showing === 'recent' ? this.renderRecents() : null}
          </div>
        </div>
      );
    }
    return null;
  }
}

SidebarComponent.propTypes = {
  showing: PropTypes.oneOf(['recent', 'favorites']),
  collapsed: PropTypes.bool
};

SidebarComponent.defaultProps = {
  showing: 'recent',
  collapsed: false
};


SidebarComponent.displayName = 'QueryHistorySidebarComponent';

module.exports = SidebarComponent;
