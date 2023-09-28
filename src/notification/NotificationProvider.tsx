import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidColor } from '@notifee/react-native';
import { navigateDetail } from '../navigation/NavigationView';
import StorageProvider from '../providers/storage/StorageProvider';
import { KEY_TOKEN_USER_NOTIFICATIONS } from '../providers/storage/Const';


notifee.onForegroundEvent(async (event) => {
  if (event.type === EventType.PRESS) {
    let itemId: number = Number(event.detail.notification?.data?.itemId) ?? 0
    navigateDetail(itemId)
  }
});

notifee.onBackgroundEvent(async (event) => {
  if (event.type === EventType.PRESS) {
    let itemId: number = Number(event.detail.notification?.data?.itemId) ?? 0
    navigateDetail(itemId)
  }
});


class NotificationProvider {
  private storage:StorageProvider;

  constructor() {
    this.registerFCM()
    this.storage = new StorageProvider()
  }



  private registerFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken()
    this.storage.storeData(KEY_TOKEN_USER_NOTIFICATIONS,token)
  }

  private async onDisplayNotification(title: string, body: string) {

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        color: AndroidColor.RED,
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
        actions: [
          {
            title: '<b>Lets see</b> 👀',
            pressAction: { id: 'eyes' },
          }
        ],
      },
    });
  }

  showNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    let title = remoteMessage.notification?.title || ""
    let body = remoteMessage.notification?.body || ""
    let data = remoteMessage.data;
    this.onDisplayNotification(title, body)
  }
}



export default NotificationProvider

