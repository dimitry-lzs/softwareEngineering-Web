import DataStore from './DataStore';
import NotificationStore from './NotificationStore';
import SubscriptionStore from './SubscriptionStore';
import UserStore from './UserStore';

const userStore = new UserStore();
const notificationStore = new NotificationStore();
const dataStore = new DataStore();
const subscriptionStore = new SubscriptionStore();

export { userStore, notificationStore, dataStore, subscriptionStore };
