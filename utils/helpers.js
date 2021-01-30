import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "Flashcards:notifications";
const CHANNEL_ID = "DailyReminder";

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

export function createNotification() {
    return {
        title: "Mobile Flashcards Reminder",
        body: "👋 Don't forget to study for today!",
        ios: {
            sound: true,
        },
        android: {
            channelId: CHANNEL_ID,
            sticky: false,
            color: "red",
            sound: true,
            priority: "high",
            vibrate: true,
        },
    };
}

export function createChannel() {
    return {
        name: "Daily Reminder",
        description:
            "This is a daily reminder for you to study your flashcards.",
        sound: true,
        priority: "high",
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        console.log(status);
                        if (status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();

                            Notifications.scheduleLocalNotificationAsync(
                                {
                                    title: "Log your stats!",
                                    body:
                                        "👋 don't forget to log your stats for today!",
                                    ios: {
                                        sound: true,
                                    },
                                    android: {
                                        sound: true,
                                        sticky: false,
                                    },
                                },
                                {
                                    time: tomorrow.getTime() + 6000, // almost every minute it should show the notification
                                    repeat: "minute",
                                }
                            );

                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true)
                            );
                        }
                    }
                );
            }
        });
}
