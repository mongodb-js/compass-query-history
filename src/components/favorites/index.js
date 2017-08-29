import { listFactory } from 'components/list';
import FavoritesListItem from './FavoritesListItem';
import Saving from 'components/saving';

const FavoritesList = listFactory(FavoritesListItem, Saving);

export default FavoritesList;
export {
	FavoritesList,
	FavoritesListItem
};