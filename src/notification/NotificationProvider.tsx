import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidColor, AuthorizationStatus } from '@notifee/react-native';
import { navigateDetail } from '../navigation/NavigationView';
import StorageProvider from '../providers/storage/StorageProvider';
import { KEY_TOKEN_USER_NOTIFICATIONS } from '../providers/storage/Const';
import Snackbar from 'react-native-snackbar';


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
  private storage: StorageProvider;

  constructor() {
    this.registerFCM()
    this.checkNotificationPermission()
    this.storage = new StorageProvider()
  }

  private registerFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken()
    this.storage.storeData(KEY_TOKEN_USER_NOTIFICATIONS, token)
  }

  async checkNotificationPermission() {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      this.requestUserPermission()
    }
  }

  private async requestUserPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      Snackbar.show({
        text: "Without notification authorization, we cant send personalized notifications.",
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: "Allow",
          textColor: 'green',
          onPress: () => {
            this.requestUserPermission();
          },
        },
      });
    }
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

