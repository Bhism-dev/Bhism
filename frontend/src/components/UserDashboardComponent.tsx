import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonAvatar,
  IonModal,
  IonButtons,
  IonFabButton,
} from '@ionic/react';
import { calendarOutline, documentTextOutline, callOutline, medkitOutline, peopleOutline, nutritionOutline, closeCircleOutline, personCircleOutline } from 'ionicons/icons';
import '../theme/tailwind.css'
export default function UserDashboardComponent() {
  const [showModal, setShowModal] = useState<string | null>(null);

  const patientName = "John Doe";
  const appointments = [
    { date: "2023-06-15", time: "10:00 AM", doctor: "Dr. Smith", department: "Cardiology" },
    { date: "2023-06-22", time: "2:30 PM", doctor: "Dr. Johnson", department: "Orthopedics" },
    { date: "2023-07-01", time: "11:00 AM", doctor: "Dr. Wilson", department: "Neurology" },
  ];
  const recentTests = [
    { name: "Blood Test", date: "2023-06-01", status: "Completed" },
    { name: "X-Ray", date: "2023-06-03", status: "Pending" },
    { name: "MRI", date: "2023-06-10", status: "Completed" },
  ];
  const familyMembers = [
    { name: "Jane Doe", relation: "Spouse" },
    { name: "Jimmy Doe", relation: "Son" },
  ];
  const dietaryPlan = [
    { day: "Monday", meals: "Breakfast: Oatmeal, Lunch: Salad, Dinner: Grilled Chicken" },
    { day: "Tuesday", meals: "Breakfast: Smoothie, Lunch: Sandwich, Dinner: Fish" },
  ];

  const openModal = (section: string) => {
    setShowModal(section);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='bg-blue-900'>
          <IonTitle style={{color:'white'}}>Hospital Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">Welcome, {patientName}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="ion-text-center">
              <IonAvatar style={{ width: '80px', height: '80px', margin: '0 auto' }}>
                <IonIcon icon={personCircleOutline} style={{ fontSize: '80px' }} />
              </IonAvatar>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Upcoming Appointments */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={calendarOutline} /> Upcoming Appointments
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {appointments.slice(0, 2).map((appointment, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{appointment.date} at {appointment.time}</h2>
                    <p>{appointment.doctor} - {appointment.department}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonButton expand="block" fill="clear" onClick={() => openModal('appointments')}>
              View More
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Family Members */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={peopleOutline} /> Family Members
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {familyMembers.slice(0, 2).map((member, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{member.name}</h2>
                    <p>{member.relation}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonButton expand="block" fill="clear" onClick={() => openModal('familyMembers')}>
              View More
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* My Dietary Plan */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={nutritionOutline} /> My Dietary Plan
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {dietaryPlan.slice(0, 2).map((plan, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{plan.day}</h2>
                    <p>{plan.meals}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonButton expand="block" fill="clear" onClick={() => openModal('dietaryPlan')}>
              View More
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Recent Test Results */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={documentTextOutline} /> Recent Test Results
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {recentTests.slice(0, 2).map((test, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{test.name}</h2>
                    <p>{test.date} - {test.status}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonButton expand="block" fill="clear" onClick={() => openModal('recentTests')}>
              View More
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Modals */}
        <IonModal isOpen={showModal === 'appointments'} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{color:'white'}}>Upcoming Appointments</IonTitle>
              <IonButtons slot="end">
                <IonFabButton size="small" onClick={closeModal}>
                  <IonIcon icon={closeCircleOutline} />
                </IonFabButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {appointments.map((appointment, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{appointment.date} at {appointment.time}</h2>
                    <p>{appointment.doctor} - {appointment.department}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showModal === 'familyMembers'} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{color:'white'}}>Family Members</IonTitle>
              <IonButtons slot="end">
                <IonFabButton size="small" onClick={closeModal}>
                  <IonIcon icon={closeCircleOutline} />
                </IonFabButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {familyMembers.map((member, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{member.name}</h2>
                    <p>{member.relation}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showModal === 'dietaryPlan'} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{color:'white'}}>My Dietary Plan</IonTitle>
              <IonButtons slot="end">
                <IonFabButton size="small" onClick={closeModal}>
                  <IonIcon icon={closeCircleOutline} />
                </IonFabButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {dietaryPlan.map((plan, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{plan.day}</h2>
                    <p>{plan.meals}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showModal === 'recentTests'} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{color:'white'}}>Recent Test Results</IonTitle>
              <IonButtons slot="end">
                <IonFabButton size="small" onClick={closeModal}>
                  <IonIcon icon={closeCircleOutline} />
                </IonFabButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {recentTests.map((test, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{test.name}</h2>
                    <p>{test.date} - {test.status}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
