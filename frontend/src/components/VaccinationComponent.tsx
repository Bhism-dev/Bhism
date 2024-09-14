import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
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

  // Find the first 'not-done' and mark it as 'upcoming'
  const firstNotDoneIndex = updatedVaccinations.findIndex(v => v.status === 'not-done');
  if (firstNotDoneIndex !== -1) {
    updatedVaccinations[firstNotDoneIndex].status = 'upcoming';
  }

  const progressPercentage = (updatedVaccinations.filter(v => v.status === 'done').length / vaccinations.length) * 100;

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-blue-600 text-center">Newborn Vaccination Tracker</h1>

          <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {updatedVaccinations.map((vaccine, index) => (
                <div
                  key={index}
                  className={`p-4 sm:p-6 border rounded-lg text-center shadow-md transition duration-300 ${
                    vaccine.status === 'done'
                      ? 'bg-green-50 border-green-300'
                      : vaccine.status === 'upcoming'
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{vaccine.name}</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">Due: {vaccine.date}</p>
                  <p
                    className={`mt-2 px-4 py-2 inline-block rounded-full font-bold ${
                      vaccine.status === 'done'
                        ? 'bg-green-400 text-white'
                        : vaccine.status === 'upcoming'
                        ? 'bg-yellow-400 text-white'
                        : 'bg-red-400 text-white'
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
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VaccinationComponent;
