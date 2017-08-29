import React from 'react';
import { shallow } from 'enzyme';

import { CardBody } from 'components/card';
import styles from './Card.less';

describe('CardBody [Component]', () => {
  describe('#rendering', () => {
    let component;

    beforeEach((done) => {
      component = shallow(<CardBody className="foo"><span>Test</span></CardBody>);
      done();
    });

    afterEach((done) => {
      component = null;
      done();
    });

    it('should be a stateless function', () => {
      expect(CardBody).to.be.a('function');
    });

    it('renders the correct className on the root node', () => {
      const node = component.find(`.${styles['component-body']}`);
      expect(node).to.have.length(1);
    });

    it('renders the className passed to it', () => {
      const node = component.find('.foo');
      expect(node).to.have.length(1);
    });

    it('renders children passed to it', () => {
      const node = component.find('span');
      expect(node).to.have.length(1);
      expect(node).to.have.text('Test');
    });
  });
});
