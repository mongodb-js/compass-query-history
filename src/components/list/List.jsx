import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import mongodbns from 'mongodb-ns';

import { Card, CardHeader, CardBody } from 'components/card';
import styles from './List.less';

const factory = (ListItem, Saving) => {
  class List extends PureComponent {
    static displayName = 'QueryHistoryList';

    static propTypes = {
      items: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]).isRequired,
      zeroStateTitle: PropTypes.string.isRequired,
      current: PropTypes.object,
      ns: PropTypes.object
    };

    static defaultProps = {
      items: [],
      zeroStateTitle: '',
      current: null,
      ns: mongodbns('')
    };

    renderSaving = () => {
      const { current, actions } = this.props;
      
      if(typeof Saving !== 'function' || current === null) {
        return null;
      }

      return <Saving key={0} className={classnames(styles.item)} model={current} actions={actions} />;
    };

    renderZeroState = (length) => {
      const { current, zeroStateTitle } = this.props;
      
      if (length === 0 && current === null) {
        return (
          <Card>
              <CardBody className={classnames(styles.zeroState)}>
                  <div className={classnames(styles['zeroState-title'])}>{zeroStateTitle}</div>
              </CardBody>
          </Card>
        );
      }

      return null;
    }

    render() {
      const { items, ns, actions } = this.props;

      const date = new Date();
      const recent = {
        _ns: '',
        _name: 'Hello World',
        _lastExecuted: date,
        getAttributes: () => {
          return {
            filter: { _id: 234, name: { $contains: ['foo'] } },
            skip: { _id: 1 },
            limit: 10
          };
        }
      };

      const tempItems = [
        recent,
        recent,
        recent
      ];

      const renderItems = items
        .filter( item => item._ns === ns.ns)
        .map((item, index) => (<ListItem key={index + 1} className={classnames(styles.item)} model={item} actions={actions} />));

      return (
        <div className={classnames(styles.component)}>
          {this.renderSaving()}
          {this.renderZeroState(renderItems.length)}
          <ul className={classnames(styles.items)}>
            {renderItems}
          </ul>
        </div>
      );
    };
  }

  return List;
}

export default factory;
export { factory as listFactory };
