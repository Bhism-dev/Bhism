import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../theme/tailwind.css';

interface Vaccination {
  name: string;
  date: string;
  status: 'done' | 'upcoming' | 'not-done';
}

const vaccinations: Vaccination[] = [
  { name: 'Hepatitis B', date: 'Birth', status: 'done' },
  { name: 'BCG', date: '1 Week', status: 'not-done' },
  { name: 'Polio', date: '1 Month', status: 'done' },
  { name: 'DTP', date: '2 Months', status: 'not-done' },
  { name: 'Rotavirus', date: '2 Months', status: 'not-done' },
  { name: 'Pneumococcal', date: '4 Months', status: 'not-done' },
];

const VaccinationComponent: React.FC = () => {
  const today = new Date();

  const getDateFromString = (dateStr: string): Date => {
    const date = new Date();
    const [number, unit] = dateStr.split(' ');

    if (unit === 'Month' || unit === 'Months') {
      date.setMonth(date.getMonth() + parseInt(number, 10));
    } else if (unit === 'Week' || unit === 'Weeks') {
      date.setDate(date.getDate() + parseInt(number, 10) * 7);
    } else if (unit === 'Day' || unit === 'Days') {
      date.setDate(date.getDate() + parseInt(number, 10));
    }

    return date;
  };

  const updatedVaccinations = vaccinations.map((vaccine) => {
    if (vaccine.date === 'Birth') {
      return { ...vaccine, status: 'done' };
    }

    const vaccineDate = getDateFromString(vaccine.date);
    if (vaccineDate > today) {
      return { ...vaccine, status: 'not-done' };
    } else if (vaccineDate.toDateString() === today.toDateString()) {
      return { ...vaccine, status: 'upcoming' };
    } else {
      return { ...vaccine, status: 'done' };
    }
  });

  const firstNotDoneIndex = updatedVaccinations.findIndex(v => v.status === 'not-done');
  if (firstNotDoneIndex !== -1) {
    updatedVaccinations[firstNotDoneIndex].status = 'upcoming';
  }

  const progressPercentage = (updatedVaccinations.filter(v => v.status === 'done').length / vaccinations.length) * 100;

  return (
    <IonPage>
            <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/landing"></IonBackButton>
        </IonButtons>
          <IonTitle>Vaccination</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-pink-600 text-center">
            Newborn Vaccination Tracker
          </h1>

          {/* Add a playful vaccination GIF */}
          <img src="https://www.shutterstock.com/image-vector/cute-vector-vaccine-bottle-character-600nw-2004141344.jpg" className="w-32 h-32 mb-4 animate-bounce" />

          <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl">
            <div className="w-full bg-blue-200 rounded-full h-3 mb-8 shadow-lg">
              <div className="bg-blue-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {updatedVaccinations.map((vaccine, index) => (
                <div
                  key={index}
                  className={`p-6 border rounded-lg text-center shadow-lg transform hover:scale-105 transition duration-300 ${
                    vaccine.status === 'done'
                      ? 'bg-green-50 border-green-300'
                      : vaccine.status === 'upcoming'
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
                    {vaccine.name}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-500 mt-1">
                    Due: {vaccine.date}
                  </p>
                  <p
                    className={`mt-4 px-6 py-3 inline-block rounded-full font-bold text-white ${
                      vaccine.status === 'done'
                        ? 'bg-green-400'
                        : vaccine.status === 'upcoming'
                        ? 'bg-yellow-400'
                        : 'bg-red-400'
                    }`}
                  >
                    {vaccine.status === 'done'
                      ? 'Completed'
                      : vaccine.status === 'upcoming'
                      ? 'Upcoming'
                      : 'Not Done'}
                  </p>
                </div>
              ))}
            </div>

            {/* Optionally, add another cute animation here */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDA2_2Qy89LfSAtI14Y85kCrnT3NV0BNKU1Q&s" className="w-48 h-48 mt-8 mx-auto" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VaccinationComponent;
