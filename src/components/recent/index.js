import { listFactory } from 'components/list';
import RecentListItem from './RecentListItem';

const RecentList = listFactory(RecentListItem, null);

export default RecentList;
export {
	RecentList,
	RecentListItem
};