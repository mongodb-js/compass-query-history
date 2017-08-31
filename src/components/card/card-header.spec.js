import React from 'react';
import { shallow } from 'enzyme';

import { CardHeader } from 'components/card';
import styles from './card.less';

describe('CardHeader [Component]', () => {
  describe('#rendering', () => {
    let component;

    beforeEach((done) => {
      component = shallow(
        <CardHeader title="Test" className="foo">
          <span>Child 1</span>
          <span>Child 2</span>
          <span>Child 3</span>
        </CardHeader>
      );

      done();
    });

    afterEach((done) => {
      component = null;
      done();
    });

    it('should be a stateless function', () => {
      expect(CardHeader).to.be.a('function');
    });

    it('renders the correct className on the root node', () => {
      const node = component.find(`.${styles['component-header']}`);
      expect(node).to.have.length(1);
    });

    it('renders the className passed to it', () => {
      const node = component.find('.foo');
      expect(node).to.have.length(1);
    });

    it('renders the correct className on the title node', () => {
      const node = component.find(`.${styles['component-header-title']}`);
      expect(node).to.have.length(1);
    });

    it('renders the correct className on the actions node', () => {
      const node = component.find(`.${styles['component-header-actions']}`);
      expect(node).to.have.length(1);
    });

    it('renders the correct title', () => {
      const node = component.find(`.${styles['component-header-title']}`);
      expect(node).to.have.text('Test');
    });

    it('renders children under the actions node', () => {
      const node = component.find(`.${styles['component-header-actions']}`);
      expect(node.children()).to.have.length(3);
    });
  });
});
