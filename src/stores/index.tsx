import NotificationStore from './NotificationStore';
import UserStore from './UserStore';

const userStore = new UserStore();
const notificationStore = new NotificationStore();

export { userStore, notificationStore };
