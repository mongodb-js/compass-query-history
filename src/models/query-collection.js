const Collection = require('ampersand-rest-collection');
const Query = require('./query');
const storageMixin = require('storage-mixin');
const electronApp = require('electron').remote.app;

/**
 * Represents a collection of queries.
 */
const QueryCollection = Collection.extend(storageMixin, {
  /**
   * Contains Query models.
   */
  model: Query,
  /**
   * Namespace to store in.
   */
  namespace: 'Queries',
  storage: {
    backend: 'local',
    appName: electronApp.getName()
  },
  mainIndex: '_id'
});

module.exports = new QueryCollection([
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
