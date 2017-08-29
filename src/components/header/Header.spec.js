import React from 'react';
import { shallow, mount } from 'enzyme';

import { ViewSwitcher } from 'hadron-react-components';
import Header from 'components/header';
import styles from './Header.less';

describe('Header [Component]', () => {
  let actions;

  beforeEach((done) => {
    actions = {
      showRecent: sinon.stub(),
      showFavorites: sinon.stub(),
      collapse: sinon.stub()
    };
    done();
  });

  afterEach((done) => {
    actions = null;
    done();
  });
  
  describe('#rendering', () => {
    let component;

    beforeEach((done) => {
       component = shallow(<Header actions={actions} />);
       done();
    });

    afterEach((done) => {
      component = null;
      done();
    });

    it('renders the correct root className', () => {
      const node = component.find(`.${styles.component}`);
      expect(node).to.have.length(1);
    });

    it('renders a ViewSwitcher component', () => {
      const node = component.find(ViewSwitcher);
      expect(node).to.have.length(1);
    });

    it('renders a close button', () => {
      const node = component.find('[data-test-id="query-history-button-close-panel"]');
      expect(node).to.have.length(1);
    });
  });

  describe('#behavior', () => {
    let component;

    it('should close the query history side bar when the close button is clicked', () => {
      component = shallow(<Header actions={actions} showing="recent" />);
      const node = component.find('[data-test-id="query-history-button-close-panel"]');

      node.simulate('click');
      actions.collapse.should.have.been.calledOnce;
    });

    describe('when viewing the Recent Queries tab', () => {
      let component;

      beforeEach((done) => {
         component = mount(<Header actions={actions} showing="recent" />);
         done();
      });

      afterEach((done) => {
        component = null;
        done();
      });

      it('it should switch to the favorites tab when the Favorites button is clicked', () => {
        const node = component.find({ 'data-test-id': "undefined-favorites" });

        node.simulate('click');
        actions.showFavorites.should.have.been.calledOnce;
      });

      it('it should be a no-op twhen the Recents button is clicked', () => {
        const node = component.find({ 'data-test-id': "undefined-recent" });
        
        node.simulate('click');
        actions.showFavorites.should.not.have.been.calledOnce;
      });
    });

    describe('when viewing the Favorites tab', () => {
      let component;

      beforeEach((done) => {
         component = mount(<Header actions={actions} showing="favorites" />);
         done();
      });

      afterEach((done) => {
        component = null;
        done();
      });

      it('it should switch to the recent tab when the Recents button is clicked', () => {
        const node = component.find({ 'data-test-id': "undefined-recent" });

        node.simulate('click');
        actions.showRecent.should.have.been.calledOnce;
      });

      it('it should be a no-op twhen the Favorites button is clicked', () => {
        const node = component.find({ 'data-test-id': "undefined-favorites" });
        
        node.simulate('click');
        actions.showRecent.should.not.have.been.calledOnce;
      });
    });
  });
});