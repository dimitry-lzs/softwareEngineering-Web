import DataStore from './DataStore';
import NotificationStore from './NotificationStore';
import UserStore from './UserStore';

const userStore = new UserStore();
const notificationStore = new NotificationStore();
const dataStore = new DataStore();

export { userStore, notificationStore, dataStore };
