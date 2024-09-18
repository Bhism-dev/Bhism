import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonMenuButton,
} from '@ionic/react';
import {
  bedOutline,
  peopleOutline,
  cubeOutline,
  addOutline,
  removeOutline,
  calendarOutline
} from 'ionicons/icons';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import 'tailwindcss/tailwind.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement);

// Dummy data for weekly appointments
const appointmentData = [
  { day: 'Mon', count: 15 },
  { day: 'Tue', count: 22 },
  { day: 'Wed', count: 18 },
  { day: 'Thu', count: 25 },
  { day: 'Fri', count: 30 },
  { day: 'Sat', count: 12 },
  { day: 'Sun', count: 8 },
];

// Simulated backup data fetch
const fetchBackupData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        bedAvailability: { total: 100, occupied: 75 },
        staffOnDuty: { doctors: 12, nurses: 30, otherStaff: 15 },
        inventoryStatus: { percentage: 88, itemsNeedingRestock: 5 },
        patientStatistics: { total: 150, inpatient: 40, outpatient: 110 },
        bloodInventory: {
          'A+': 25, 'B+': 30, 'O+': 35, 'AB+': 15,
          'A-': 10, 'B-': 12, 'O-': 20, 'AB-': 8
        }
      });
    }, 1000);
  });
};

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [bloodInventory, setBloodInventory] = useState<any>({});

  useEffect(() => {
    fetchBackupData().then((data: any) => {
      setDashboardData(data);
      setBloodInventory(data.bloodInventory);
    });
  }, []);

  const updateBloodInventory = (type: string, amount: number) => {
    setBloodInventory((prev: any) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + amount)
    }));
  };

  const appointmentChartData = {
    labels: appointmentData.map(data => data.day),
    datasets: [
      {
        label: 'Appointments',
        data: appointmentData.map(data => data.count),
        backgroundColor: '#3b82f6', // Tailwind blue-500
      },
    ],
  };

  const appointmentChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false, 
  };

  if (!dashboardData) {
    return <IonPage><IonContent className="ion-padding">Loading...</IonContent></IonPage>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-blue-900" color="primary">
          <IonMenuButton slot="start" />
          <IonTitle className="text-white text-3xl">Admin Dashboard</IonTitle>
          <IonButton slot="end" fill="clear" className="text-white">Logout</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bg-gray-100">
        <IonGrid>
          <IonRow className="mb-4">
            {/* Bed Availability */}
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard className="shadow-lg h-full flex flex-col">
                <IonCardHeader className="flex flex-col justify-between flex-grow">
                  <IonCardSubtitle className="text-xl">Bed Availability</IonCardSubtitle>
                  <IonCardTitle className="text-3xl flex items-center">
                    <IonIcon icon={bedOutline} className="text-blue-500 mr-2" />
                    {dashboardData.bedAvailability.occupied}%
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="flex flex-col flex-grow">
                  <IonProgressBar value={dashboardData.bedAvailability.occupied / 100} className="my-2"></IonProgressBar>
                  <p>{dashboardData.bedAvailability.occupied} out of {dashboardData.bedAvailability.total} beds occupied</p>
                  <IonButton href="/admin/bedavailability" expand="full" className="mt-4">Update</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Staff On Duty */}
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard className="shadow-lg h-full flex flex-col">
                <IonCardHeader className="flex flex-col justify-between flex-grow">
                  <IonCardSubtitle className="text-xl">Staff On Duty</IonCardSubtitle>
                  <IonCardTitle className="text-3xl flex items-center">
                    <IonIcon icon={peopleOutline} className="text-green-500 mr-2" />
                    {dashboardData.staffOnDuty.doctors + dashboardData.staffOnDuty.nurses + dashboardData.staffOnDuty.otherStaff}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="flex flex-col flex-grow">
                  <p>{dashboardData.staffOnDuty.doctors} Doctors, {dashboardData.staffOnDuty.nurses} Nurses, {dashboardData.staffOnDuty.otherStaff} Other Staff</p>
                  <IonButton href="/admin/staff" expand="full" className="mt-4">Update</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Inventory Status */}
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard className="shadow-lg h-full flex flex-col">
                <IonCardHeader className="flex flex-col justify-between flex-grow">
                  <IonCardSubtitle className="text-xl">Inventory Status</IonCardSubtitle>
                  <IonCardTitle className="text-3xl flex items-center">
                    <IonIcon icon={cubeOutline} className="text-yellow-500 mr-2" />
                    {dashboardData.inventoryStatus.percentage}%
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="flex flex-col flex-grow">
                  <IonProgressBar value={dashboardData.inventoryStatus.percentage / 100} className="my-2"></IonProgressBar>
                  <p>{dashboardData.inventoryStatus.itemsNeedingRestock} items need restocking</p>
                  <IonButton expand="full" className="mt-4" href="/admin/inventory">Update</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Blood Bank Management */}
          <IonRow className="mb-4">
            <IonCol size="12">
              <IonCard className="shadow-lg h-full flex flex-col">
                <IonCardHeader className="flex flex-col justify-between flex-grow">
                  <IonCardSubtitle className="text-xl">Blood Bank Management</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="flex flex-col flex-grow">
                  <IonGrid>
                    <IonRow>
                      {Object.entries(bloodInventory).map(([type, count]: [string, any]) => (
                        <IonCol key={type} size="6" sizeMd="3">
                          <div className="p-4 bg-white rounded-lg shadow-md flex flex-col h-full">
                            <h2 className="text-2xl font-bold mb-2 flex items-center">
                              <IonIcon icon={calendarOutline} className="text-red-500 mr-2" />
                              {type}
                            </h2>
                            <p className="text-lg mb-2">{count}</p>
                            <IonProgressBar value={count / Math.max(...(Object.values(bloodInventory) as number[]))} className="my-2"></IonProgressBar>
                            <div className="flex justify-between mt-auto">
                              <IonButton fill="clear" onClick={() => updateBloodInventory(type, -1)} className="text-red-500">
                                <IonIcon icon={removeOutline} slot="icon-only" />
                              </IonButton>
                              <IonButton fill="clear" onClick={() => updateBloodInventory(type, 1)} className="text-green-500">
                                <IonIcon icon={addOutline} slot="icon-only" />
                              </IonButton>
                            </div>
                          </div>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Weekly Appointments */}
          <IonRow>
            <IonCol size="12">
              <IonCard className="shadow-lg h-full flex flex-col">
                <IonCardHeader className="flex flex-col justify-between flex-grow">
                  <IonCardSubtitle className="text-xl">Weekly Appointments</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="flex flex-col flex-grow">
                  <div className="relative h-64">
                    <Bar
                      data={appointmentChartData}
                      options={appointmentChartOptions}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                  <IonButton href="/admindash/data" expand="full" className="mt-4">View More Analytics</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
