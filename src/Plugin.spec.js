import React from 'react';
import { shallow } from 'enzyme';
import { StoreConnector } from 'hadron-react-components';

// Mockout some of QueryHistoryPlugin's dependencies via the webpack inject-loader
import QueryHistoryPluginInjector from 'inject-loader!./Plugin';

// We have to mock out these dependencies because these stores rely on the Ampersand models
// which make a reference to electron.remote.app which is undefined if run outside the context
// of the electron renderer - which would result in an error being thrown in these component
// unit tests.

// eslint-disable-next-line new-cap
const QueryHistoryPlugin = QueryHistoryPluginInjector({
  'components/sideBar': () => (<div data-test-id="mock-sidebar" />),
  'stores': {
    SideBarStore: {}
  }
}).default;

describe('SideBar [Component]', () => {
  let component;

  beforeEach((done) => {
    component = shallow(<QueryHistoryPlugin actions={{}} />);
    done();
  });

  afterEach((done) => {
    component = null;
    done();
  });

  describe('#rendering', () => {
    it('should contain a <StoreConnector /> with a store prop', function() {
      const node = component.find(StoreConnector).first();
      expect(node.prop('store')).to.be.an('object');
    });
  });
});
