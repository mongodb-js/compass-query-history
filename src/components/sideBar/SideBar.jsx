import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import mongodbns from 'mongodb-ns';
import { StoreConnector } from 'hadron-react-components';

// Components
import Header from 'components/header';
import { RecentList } from 'components/recent';
import { FavoritesList } from 'components/favorites';

// Stores
import { HeaderStore, RecentListStore, FavoritesListStore }  from 'stores';
import styles from './SideBar.less';

class SideBar extends PureComponent {
  static displayName = 'QueryHistorySideBar';

  static propTypes = {
    actions: PropTypes.object.isRequired,
    showing: PropTypes.oneOf(['recent', 'favorites']),
    collapsed: PropTypes.bool,
    ns: PropTypes.object
  };

  static defaultProps = {
    showing: 'recent',
    collapsed: true,
    ns: mongodbns('')
  };

  renderFavorites = () => (
    <StoreConnector store={FavoritesListStore}>
      <FavoritesList
        data-test-id="query-history-sidebar-list-favorites"
        ns={this.props.ns}
        actions={this.props.actions}
        zeroStateTitle="Favorite a query to see it saved here!" />
    </StoreConnector>
  );

  renderRecents = () => (
    <StoreConnector store={RecentListStore}>
      <RecentList
        data-test-id="query-history-sidebar-list-recent"
        ns={this.props.ns}
        actions={this.props.actions}
        zeroStateTitle="Run a query to see it saved here!" />
    </StoreConnector>
  );

  render() {
    const { collapsed, showing, actions } = this.props;

    if (!collapsed) {
      return (
        <div
          data-test-id="query-history-sidebar"
          className={classnames(styles.component)}>
          <div className={classnames(styles.sidebar)}>
            <StoreConnector store={HeaderStore}>
              <Header
                data-test-id="query-history-sidebar-header"
                actions={actions}
                showing={showing}/>
            </StoreConnector>

            {showing === 'favorites' ? this.renderFavorites() : null}
            {showing === 'recent' ? this.renderRecents() : null}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
}

export default SideBar;
export { SideBar };
