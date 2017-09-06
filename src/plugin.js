import React, { Component } from 'react';
import { StoreConnector } from 'hadron-react-components';
import SideBar from 'components/side-bar';
import { QueryHistoryStore } from 'stores';
import Actions from 'actions';

class Plugin extends Component {
  static displayName = 'QueryHistoryPlugin';

  /**
   * Connect the Plugin to the store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <StoreConnector store={QueryHistoryStore}>
        <SideBar actions={Actions} {...this.props} />
      </StoreConnector>
    );
  }
}

export default Plugin;
export { Plugin };
