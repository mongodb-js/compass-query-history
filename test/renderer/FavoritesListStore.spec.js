import bson from 'bson';
import { FavoritesListStore } from 'stores';
import { RecentQuery } from 'models';

describe('FavoritesListStore [Store]', () => {
  describe('#init', () => {
    it('initializes with the favorite list', () => {
      expect(FavoritesListStore.state.items.length).to.equal(0);
    });
  });

  describe('#saveFavorite', () => {
    context('when no complex bson types are in the attributes', () => {
      const ns = 'db.test';
      const filter = { name: 'test' };
      const recent = new RecentQuery({ ns: ns, filter: filter });
      let model;

      before(() => {
        FavoritesListStore.saveFavorite(recent, 'testing');
        model = FavoritesListStore.state.items.models[0];
      });

      after(() => {
        FavoritesListStore.deleteFavorite(model);
      });

      it('adds the favorite to the list', () => {
        expect(FavoritesListStore.state.items.length).to.equal(1);
      });

      it('adds the _dateSaved attributes', () => {
        expect(model._dateSaved).to.not.equal(null);
      });

      it('saves the name', () => {
        expect(model._name).to.equal('testing');
      });
    });

    context('when complex bson types are in the attributes', () => {
      const ns = 'db.test';
      const oid = new bson.ObjectId();
      const filter = { _id: oid };
      const recent = new RecentQuery({ ns: ns, filter: filter });
      let model;

      before(() => {
        FavoritesListStore.saveFavorite(recent, 'testing');
        model = FavoritesListStore.state.items.models[0];
      });

      after(() => {
        FavoritesListStore.deleteFavorite(model);
      });

      it('adds the favorite to the list', () => {
        expect(FavoritesListStore.state.items.length).to.equal(1);
      });
    });
  });

  describe('#deleteFavorite', () => {
    const ns = 'db.test';
    const filter = { name: 'test' };
    const recent = new RecentQuery({ ns: ns, filter: filter });

    before(() => {
      FavoritesListStore.saveFavorite(recent, 'testing');
      const model = FavoritesListStore.state.items.models[0];
      FavoritesListStore.deleteFavorite(model);
    });

    it('removes the favorite from the list', () => {
      expect(FavoritesListStore.state.items.length).to.equal(0);
    });
  });
});
