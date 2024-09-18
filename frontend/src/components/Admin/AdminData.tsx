import React from "react";
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
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const patientVisitsData = [
  { month: "Jan", visits: 4000 },
  { month: "Feb", visits: 3000 },
  { month: "Mar", visits: 5000 },
  { month: "Apr", visits: 4500 },
  { month: "May", visits: 4800 },
  { month: "Jun", visits: 5500 },
];

const departmentData = [
  { department: "General Medicine", patients: 4000 },
  { department: "Pediatrics", patients: 3000 },
  { department: "Orthopedics", patients: 2000 },
  { department: "Ophthalmology", patients: 2780 },
  { department: "ENT", patients: 1890 },
  { department: "Dermatology", patients: 2390 },
];

const ageGroupData = [
  { name: "0-18", value: 2400 },
  { name: "19-35", value: 4567 },
  { name: "36-50", value: 1398 },
  { name: "51-65", value: 3908 },
  { name: "65+", value: 2908 },
];

const weeklyAppointmentsData = [
  { day: "Mon", appointments: 120 },
  { day: "Tue", appointments: 150 },
  { day: "Wed", appointments: 180 },
  { day: "Thu", appointments: 170 },
  { day: "Fri", appointments: 190 },
  { day: "Sat", appointments: 110 },
  { day: "Sun", appointments: 80 },
];

const OPDDashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              🏥 OPD Insights Hub 📊
            </span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <h2 style={{ fontWeight: "bold", margin: 0 }}>
                      🚶‍♂️ Patient Journey Timeline 📅
                    </h2>
                  </IonCardTitle>
                  <IonCardSubtitle>
                    Tracking monthly patient visits
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={patientVisitsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="visits"
                        stroke="#8E44AD"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <h2 style={{ fontWeight: "bold", margin: 0 }}>
                      🏥 Department Dynamics 🔬
                    </h2>
                  </IonCardTitle>
                  <IonCardSubtitle>
                    Patient distribution across departments
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="patients" fill="#16A085" />
                    </BarChart>
                  </ResponsiveContainer>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <h2 style={{ fontWeight: "bold", margin: 0 }}>
                      👥 Age Spectrum Analysis 📊
                    </h2>
                  </IonCardTitle>
                  <IonCardSubtitle>Patient age group breakdown</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={ageGroupData}
                        label
                        labelLine={false}
                        outerRadius={80}
                      >
                        {ageGroupData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                "#FF6B6B",
                                "#4ECDC4",
                                "#45B7D1",
                                "#FFA07A",
                                "#98D8C8",
                              ][index % 5]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <h2 style={{ fontWeight: "bold", margin: 0 }}>
                      📅 Weekly Appointment Pulse 📈
                    </h2>
                  </IonCardTitle>
                  <IonCardSubtitle>Daily appointment frequency</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyAppointmentsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="appointments" fill="#E67E22" />
                    </BarChart>
                  </ResponsiveContainer>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OPDDashboard;
