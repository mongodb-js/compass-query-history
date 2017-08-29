import React from 'react';
import { shallow } from 'enzyme';

// Mockout some of SideBar's dependencies via the webpack inject-loader
import SideBarInjector from 'inject-loader!components/sideBar/SideBar';

// We have to mock out these dependencies because these stores rely on the Ampersand models
// which make a reference to electron.remote.app which is undefined if run outside the context
// of the electron renderer - which would result in an error being thrown in these component
// unit tests.
const { SideBar } = SideBarInjector({
  'stores': {
    HeaderStore: {},
    RecentListStore: {},
    FavoritesListStore: {}
  }
});

import Header from 'components/header';
import { RecentList } from 'components/recent';
import { FavoritesList } from 'components/favorites';

import styles from './SideBar.less';

describe('SideBar [Component]', () => {
  const actions = {};
  let component;

  afterEach((done) => {
    component = null;
    done();
  });
  
  describe('#rendering', () => {
    it('should not render the sidebar if it is collapsed', () => {
      component = shallow(<SideBar actions={actions} collapsed={true} />);

      const node = component.find('[data-test-id="query-history-sidebar"]');
      expect(node).to.have.length(0);
    });

    it('should render the sidebar if it is not collapsed', () => {
      component = shallow(<SideBar actions={actions} collapsed={false} />);

      const node = component.find('[data-test-id="query-history-sidebar"]');
      expect(node).to.have.length(1);
      expect(node.hasClass(styles.component)).to.equal(true);
    });

    it('should render the header component', () => {
      component = shallow(<SideBar actions={actions} collapsed={false} />);

      const node = component.find('[data-test-id="query-history-sidebar-header"]');
      expect(node).to.have.length(1);
      expect(node).to.have.type(Header);
    });

    it('should render the recent queries list by default component', () => {
      component = shallow(<SideBar actions={actions} collapsed={false} />);

      const node = component.find('[data-test-id="query-history-sidebar-list-recent"]');
      expect(node).to.have.length(1);
      expect(node).to.have.type(RecentList);
    });

    it('should render the favorite queries list when showing prop is set to favorites', () => {
      component = shallow(<SideBar actions={actions} collapsed={false} showing="favorites" />);

      const node = component.find('[data-test-id="query-history-sidebar-list-favorites"]');
      expect(node).to.have.length(1);
      expect(node).to.have.type(FavoritesList);
    });
  });
});