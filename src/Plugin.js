import React, { Component } from 'react';
import { StoreConnector } from 'hadron-react-components';
import SideBar from 'components/sideBar';
import { SideBarStore } from 'stores';
import Actions from 'actions';

// Import global less file. Note: these styles WILL NOT be used in compass, as compass provides its own set
// of global styles. If you are wishing to style a given component, you should be writing a less file per
// component as per the CSS Modules ICSS spec. @see components/ToggleButton for an example.
if (process.env.NODE_ENV !== 'test') {
  require('less/index.less');
}

class Plugin extends Component {
  static displayName = 'QueryHistoryPlugin';

  /**
   * Connect the Plugin to the store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <StoreConnector store={SideBarStore}>
        <SideBar actions={Actions} {...this.props} />
      </StoreConnector>
    );
  }
}

export default Plugin;
export { Plugin };
