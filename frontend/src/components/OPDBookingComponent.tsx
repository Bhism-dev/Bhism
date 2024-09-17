import React, { useState } from 'react';
import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonButton, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import 'tailwindcss/tailwind.css';
import jsPDF from 'jspdf';

// Dummy data to simulate appointments
const initialAppointments = [
  {
    id: 1,
    date: '2024-09-17',
    time: '10:30 AM',
    name: 'John Doe',
    problem: 'Fever and Cough',
    doctor: 'Dr. Smith',
    medication: 'Paracetamol, Cough Syrup',
    status: 'Booked',
  },
  {
    id: 2,
    date: '2024-09-18',
    time: '11:00 AM',
    name: 'Jane Doe',
    problem: 'Headache',
    doctor: 'Dr. Johnson',
    medication: 'Ibuprofen',
    status: 'Booked',
  },
];

const OPDBooking: React.FC = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState<{ id: number; date: string; time: string; name: string; problem: string; doctor: string; medication: string; status: string; } | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Book a new OPD appointment (dummy functionality)
  const bookNewAppointment = () => {
    const newAppointment = {
      id: appointments.length + 1,
      date: '2024-09-19',
      time: '12:00 PM',
      name: 'Alice Smith',
      problem: 'Back Pain',
      doctor: 'Dr. Adams',
      medication: 'Pain Relievers',
      status: 'Booked',
    };
    setAppointments([...appointments, newAppointment]);
    setAlertMessage('New OPD appointment booked successfully!');
    setShowAlert(true);
  };

  // Check appointment status
  const checkAppointmentStatus = () => {
    if (appointments.length > 0) {
      setSelectedAppointment(appointments[0]);
      setAlertMessage(`Your next appointment is on ${appointments[0].date} with ${appointments[0].doctor}.`);
    } else {
      setAlertMessage('No appointments found.');
    }
    setShowAlert(true);
  };

  // Cancel an appointment
  const cancelAppointment = (id: number) => {
    const updatedAppointments = appointments.map(app =>
      app.id === id ? { ...app, status: 'Canceled' } : app
    );
    setAppointments(updatedAppointments);
    setAlertMessage('Appointment canceled successfully.');
    setShowAlert(true);
  };

  // Download the appointment slip as PDF
  const downloadAppointmentSlip = (appointment: any) => {
    const doc = new jsPDF();
    doc.text('Appointment Slip', 20, 20);
    doc.text(`Date: ${appointment.date}`, 20, 30);
    doc.text(`Time: ${appointment.time}`, 20, 40);
    doc.text(`Patient Name: ${appointment.name}`, 20, 50);
    doc.text(`Problem: ${appointment.problem}`, 20, 60);
    doc.text(`Doctor: ${appointment.doctor}`, 20, 70);
    doc.text(`Medication: ${appointment.medication}`, 20, 80);
    doc.save('appointment_slip.pdf');
  };

  // View appointment slip in browser and offer download option
  const viewAppointmentSlip = (appointment: any) => {
    const doc = new jsPDF();
    doc.setProperties({
        title: 'OPD Receipt',
    });

    doc.text('Appointment Slip', 20, 20);
    doc.text(`Date: ${appointment.date}`, 20, 30);
    doc.text(`Time: ${appointment.time}`, 20, 40);
    doc.text(`Patient Name: ${appointment.name}`, 20, 50);
    doc.text(`Problem: ${appointment.problem}`, 20, 60);
    doc.text(`Doctor: ${appointment.doctor}`, 20, 70);
    doc.text(`Medication: ${appointment.medication}`, 20, 80);
    const pdfUrl = doc.output('bloburl'); // Generate PDF as a URL to view in browser
    window.open(pdfUrl, '_blank');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center">OPD Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {/* Left Column: Steps to Book OPD */}
            <IonCol size="12" sizeMd="6">
              <div className="p-5 bg-white shadow rounded">
                <h2 className="text-xl font-bold mb-4">Steps to Book OPD</h2>
                <ol className="list-decimal ml-5">
                  <li>Select the preferred date and time for your appointment.</li>
                  <li>Enter your details such as name and contact information.</li>
                  <li>Choose the doctor for your consultation.</li>
                  <li>Confirm your booking.</li>
                  <li>Receive a confirmation slip with your appointment details.</li>
                </ol>
              </div>
            </IonCol>

            {/* Right Column: Action Buttons */}
            <IonCol size="12" sizeMd="6">
              <div className="p-5 bg-white shadow rounded space-y-4">
                <IonButton expand="block" color="primary" onClick={bookNewAppointment}>
                  Book OPD
                </IonButton>
                <IonButton expand="block" color="secondary" onClick={checkAppointmentStatus}>
                  Appointment Status
                </IonButton>
                <IonButton expand="block" color="tertiary" onClick={() => viewAppointmentSlip(appointments[0])}>
                  View/Print Appointment Slip
                </IonButton>
                <IonButton expand="block" color="danger" onClick={() => cancelAppointment(appointments[0].id)}>
                  Cancel Appointment
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Alert for success messages */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Notification'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default OPDBooking;
