import UserStore from "./UserStore";
import NotificationStore from "./NotificationStore";

const userStore = new UserStore();
const notificationStore = new NotificationStore();

export { userStore, notificationStore };