const React = require('react');

const QueryCollection = require('../models/query-collection');
const Query = require('../models/query');
const FavoritesComponent = require('./favorite-component');

// const debug = require('debug')('mongodb-compass:query-history:favorites-list-component');

class FavoritesListComponent extends React.Component {
  constructor(props) {
    super(props);

    // const queries = QueryCollection.fetch();
    // var favoriteQueries = new FilteredCollection(queries, {
    //   where: {
    //     isFavorite: true
    //   },
    //   comparator: (model) => {
    //     return -model.lastExecuted;
    //   }
    // });
    const favoritesColl = new QueryCollection([
      new Query({ filter: '{ age: 5 }', skip: 10, limit: 10, isFavorite: true }),
      new Query({ filter: '{ age: 6 }', skip: 10, limit: 10, isFavorite: true }),
      new Query({ filter: '{ age: 7 }', skip: 10, limit: 10, isFavorite: true })
    ]);
    this.state = {
      favorites: favoritesColl,
      current_favorite: null
    };
  }

  /**
   * Render FavoritesListComponent.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="query-history-favorites-list">
        <h2 className="query-history-title">FavoritesListComponent</h2>
        <p><i>The query history favorites-list.</i></p>
        <ul>
          <p> Current favorite:</p>
          <FavoritesComponent key={0} model={this.state.current_favorite}/>
          {this.state.favorites.map(function(item, i) {
            return (
              <FavoritesComponent key={i + 1} model={item}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

FavoritesListComponent.displayName = 'QueryHistoryFavoritesListComponent';

module.exports = FavoritesListComponent;
