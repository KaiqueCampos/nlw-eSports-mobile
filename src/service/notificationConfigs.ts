import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldSetBadge: true,
        shouldShowAlert: true,
        shouldPlaySound: true,
    })
})