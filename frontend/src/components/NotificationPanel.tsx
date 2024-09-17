import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonLabel, IonBadge, IonIcon, IonAvatar, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonChip, IonButton
} from '@ionic/react';
import { notificationsOutline, alertCircleOutline, calendarOutline, informationCircleOutline, personOutline, medkitOutline,person
} from 'ionicons/icons';

// Import Tailwind CSS
import '../theme/tailwind.css';

type NotificationType = 'emergency' | 'appointment' | 'general' | 'lab' | 'medication';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const UserNotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "emergency",
      title: "Emergency Alert",
      description: "There's a scheduled fire drill in your building tomorrow at 10:00 AM.",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "appointment",
      title: "Appointment Reminder",
      description: "Your check-up with Dr. Smith is tomorrow at 2:00 PM in Room 305.",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      type: "general",
      title: "New COVID-19 Guidelines",
      description: "Updated visitor policies are now in effect. Please check the website for details.",
      time: "3 hours ago",
      read: false
    },
    {
      id: 4,
      type: "lab",
      title: "Lab Results Available",
      description: "Your recent blood work results are now available in your patient portal.",
      time: "Yesterday",
      read: true
    },
    {
      id: 5,
      type: "medication",
      title: "Medication Reminder",
      description: "Remember to take your evening dose of Lisinopril.",
      time: "2 days ago",
      read: true
    }
  ]);

  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(notifications);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(notifications.filter(n => n.type === filter));
    }
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [filter, notifications]);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "emergency":
        return alertCircleOutline;
      case "appointment":
        return calendarOutline;
      case "general":
        return informationCircleOutline;
      case "lab":
        return personOutline;
      case "medication":
        return medkitOutline;
      default:
        return notificationsOutline;
    }
  };

  const getBadgeColor = (type: NotificationType) => {
    switch (type) {
      case "emergency":
        return "danger";
      case "appointment":
        return "primary";
      case "general":
        return "medium";
      case "lab":
        return "secondary";
      case "medication":
        return "success";
      default:
        return "medium";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const categories: (NotificationType | 'all')[] = ['all', 'emergency', 'appointment', 'general', 'lab', 'medication'];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="text-lg font-semibold">Notification Center</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard className="mb-4">
          <IonCardHeader>
            {/* <IonAvatar className="w-20 h-20 mx-auto mb-2">
              <img src="/placeholder.svg?height=80&width=80" alt="User" className="rounded-full" />
            </IonAvatar> */}
            <IonIcon
                    icon={person} // User icon
                    className="w-20 h-20 mx-auto mb-2"
                  />
            <IonCardTitle className="text-center text-xl font-bold">Welcome, John Doe</IonCardTitle>
            <IonCardSubtitle className="text-center text-sm">Your Personal Notification Center</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <IonCard className="mb-4">
          <IonCardHeader>
            <IonCardTitle className="text-lg font-semibold">Filters</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <IonChip
                  key={category}
                  color={filter === category ? getBadgeColor(category as NotificationType) : 'medium'}
                  outline={filter !== category}
                  onClick={() => setFilter(category)}
                  className="capitalize"
                >
                  <IonIcon icon={getIcon(category as NotificationType)} />
                  <IonLabel>{category}</IonLabel>
                </IonChip>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="text-lg font-semibold">Your Notifications</IonCardTitle>
            <IonCardSubtitle className="text-sm text-gray-500">Stay updated with your health information</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {filteredNotifications.map((notification) => (
                <IonItemSliding key={notification.id}>
                  <IonItem className={`${notification.read ? 'bg-white' : 'bg-blue-50'} rounded-lg mb-2`}>
                    <IonIcon icon={getIcon(notification.type)} slot="start" color={getBadgeColor(notification.type)} className="text-2xl" />
                    <IonLabel>
                      <h2 className={`${notification.read ? 'font-normal' : 'font-bold'}`}>{notification.title}</h2>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </IonLabel>
                    <IonBadge color={getBadgeColor(notification.type)} slot="end" className="capitalize">{notification.type}</IonBadge>
                    {!notification.read && (
                      <IonButton
                        fill="clear"
                        size="small"
                        onClick={() => markAsRead(notification.id)}
                        className="ml-2"
                      >
           
                      </IonButton>
                    )}
                  </IonItem>
                  <IonItemOptions side="end">
                    {!notification.read && (
                      <IonItemOption onClick={() => markAsRead(notification.id)} color="success">
    
                      </IonItemOption>
                    )}
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default UserNotificationCenter;