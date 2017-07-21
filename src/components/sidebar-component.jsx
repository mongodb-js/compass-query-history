const React = require('react');
const PropTypes = require('prop-types');

const { StoreConnector } = require('hadron-react-components');
const HeaderComponent = require('./header-component');
const RecentListComponent = require('./recent-list-component');
const FavoritesListComponent = require('./favorites-list-component');
const HeaderStore = require('../stores/header-store');
const RecentListStore = require('../stores/recent-list-store');
const FavoritesListStore = require('../stores/favorites-list-store');
const QueryCollection = require('../models/query-collection');
const Query = require('../models/query');

// const debug = require('debug')('mongodb-compass:query-history:sidebar-component');

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderRecents = this.renderRecents.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
    this.queryCollection = new QueryCollection([
      new Query({filter: '{ age: 1 }', skip: 10, limit: 10, isFavorite: true,
        lastExecuted: Date.now(), name: 'Query 1'}),
      new Query({ filter: '{ age: 2 }', skip: 10, limit: 10, isFavorite: true,
        lastExecuted: Date.now(), name: 'Query 2' }),
      new Query({ filter: '{ age: 3 }', skip: 10, limit: 10, isFavorite: true,
        lastExecuted: Date.now(), name: 'Query 3'}),
      new Query({ filter: '{ age: 4 }', skip: 10, limit: 10, isFavorite: false,
        lastExecuted: Date.now() }),
      new Query({ filter: '{ age: 5 }', skip: 10, limit: 10, isFavorite: false,
        lastExecuted: Date.now()})
    ]);
  }

  renderFavorites() {
    return (
      <StoreConnector store={FavoritesListStore}>
        <FavoritesListComponent collection={this.queryCollection}/>
      </StoreConnector>
    );
  }

  renderRecents() {
    return (
      <StoreConnector store={RecentListStore}>
        <RecentListComponent collection={this.queryCollection}/>
      </StoreConnector>
    );
  }

  /**
   * Render Sidebar component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="query-history-sidebar-component">
        <p>Sidebar.props.showing={this.props.showing}</p>
        <StoreConnector store={HeaderStore}>
          <HeaderComponent showing={this.props.showing}/>
        </StoreConnector>
        {this.props.showing === 'favorites' ? this.renderFavorites() : null}
        {this.props.showing === 'recent' ? this.renderRecents() : null}
      </div>
    );
  }
}

SidebarComponent.propTypes = {
  showing: PropTypes.oneOf(['recent', 'favorites'])
};

SidebarComponent.defaultProps = {
  showing: 'recent'
};


SidebarComponent.displayName = 'QueryHistorySidebarComponent';

module.exports = SidebarComponent;
