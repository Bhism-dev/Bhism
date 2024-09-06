import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonModal,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonList,
  IonDatetimeButton,
} from '@ionic/react';
import { heart, water, search, calendar, close, chevronDown } from 'ionicons/icons';
import '../theme/tailwind.css'

const BloodBankPage: React.FC = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isBloodTypeDropdownOpen, setIsBloodTypeDropdownOpen] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState('');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Hospital Blood Bank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="bg-red-600 text-white py-8 px-4 text-center rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Save Lives: Donate Blood</h1>
          <p className="text-xl mb-6">Your donation can make a difference. Join our mission to save lives.</p>
          <IonButton fill="solid" color="light" className="text-red-600">
            Learn More
          </IonButton>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IonCard>
            <IonCardHeader>
              <IonIcon icon={heart} color="danger" className="w-16 h-16 mx-auto mb-4" />
              <IonCardTitle className="text-xl font-semibold text-center">Donate Blood</IonCardTitle>
              <IonCardSubtitle className="text-center">Give the gift of life</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="text-center">
              <p className="mb-4">Help those in need by donating blood.</p>
              <IonButton expand="block" color="danger" onClick={() => setShowDonateModal(true)}>Donate Now</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonIcon icon={water} color="danger" className="w-16 h-16 mx-auto mb-4" />
              <IonCardTitle className="text-xl font-semibold text-center">Request Blood</IonCardTitle>
              <IonCardSubtitle className="text-center">Submit a blood request</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="text-center">
              <p className="mb-4">Need blood? Submit a request here.</p>
              <IonButton expand="block" color="danger" onClick={() => setShowRequestModal(true)}>Request Blood</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonIcon icon={search} color="success" className="w-16 h-16 mx-auto mb-4" />
              <IonCardTitle className="text-xl font-semibold text-center">Check Availability</IonCardTitle>
              <IonCardSubtitle className="text-center">View blood inventory</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="text-center">
              <p className="mb-4">Check real-time blood availability.</p>
              <IonButton expand="block" className="text-white" color="success" onClick={() => setShowAvailabilityModal(true)}>Check Now</IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonIcon icon={calendar} color="tertiary" className="w-16 h-16 mx-auto mb-4" />
              <IonCardTitle className="text-xl font-semibold text-center">Schedule Appointment</IonCardTitle>
              <IonCardSubtitle className="text-center">Book your donation</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="text-center">
              <p className="mb-4">Schedule your blood donation appointment.</p>
              <IonButton expand="block" color="tertiary" onClick={() => setShowScheduleModal(true)}>Schedule Now</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
        <div className="mt-8 bg-gray-100 py-8 px-4 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Why Donate Blood?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <IonIcon icon={heart} color="danger" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Save Lives</h3>
              <p className="text-gray-600">Your donation can save up to three lives in emergency situations.</p>
            </div>
            <div className="text-center">
              <IonIcon icon={water} color="primary" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">Help your local community by ensuring a stable blood supply.</p>
            </div>
            <div className="text-center">
              <IonIcon icon={calendar} color="tertiary" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quick Process</h3>
              <p className="text-gray-600">The donation process is quick, usually taking less than an hour.</p>
            </div>
          </div>
        </div>
          
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-6">Every drop counts. Donate blood and save lives.</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <IonButton color="danger" onClick={() => setShowDonateModal(true)}>Donate Now</IonButton>
            <IonButton fill="outline">Learn More</IonButton>
          </div>
        </div>
        {/* ... (rest of the content remains the same) ... */}

        {/* Donate Blood Modal */}
        <IonModal isOpen={showDonateModal} onDidDismiss={() => setShowDonateModal(false)} className="rounded-t-lg">
          <div className="bg-red-600 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Donate Blood</h2>
              <IonButton fill="clear" onClick={() => setShowDonateModal(false)} className="text-white">
                <IonIcon icon={close} slot="icon-only" />
              </IonButton>
            </div>
          </div>
          <IonContent className="ion-padding bg-white">
            <IonList className="bg-transparent ">
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                <div className="relative w-full">
                  <button
                    onClick={() => setIsBloodTypeDropdownOpen(!isBloodTypeDropdownOpen)}
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  >
                    {selectedBloodType || "Choose a blood type"}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <IonIcon icon={chevronDown} className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </button>
                  {isBloodTypeDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {bloodTypes.map((type, index) => (
                        <div
                          key={index}
                          className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedBloodType(type);
                            setIsBloodTypeDropdownOpen(false);
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <IonDatetimeButton datetime="birthdate" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="birthdate" presentation="date" max={new Date().toISOString()}></IonDatetime>
                </IonModal>
              </div>
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" required className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
            </IonList>
            <IonButton expand="block" fill="clear" className="mx-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-red-700">
              Submit Donation Request
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Request Blood Modal */}
        <IonModal isOpen={showRequestModal} onDidDismiss={() => setShowRequestModal(false)} className="rounded-t-lg">
          <div className="bg-red-600 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Request Blood</h2>
              <IonButton fill="clear" onClick={() => setShowRequestModal(false)} className="text-white">
                <IonIcon icon={close} slot="icon-only" />
              </IonButton>
            </div>
          </div>
          <IonContent className="ion-padding bg-white">
            <IonList className="bg-transparent">
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                <select className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm">
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" required className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
            </IonList>
            <IonButton expand="block" fill="clear" className="mx-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-red-700">
              Submit Blood Request
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Check Availability Modal */}
        <IonModal isOpen={showAvailabilityModal} onDidDismiss={() => setShowAvailabilityModal(false)} className="rounded-t-lg">
          <div className="bg-green-600 p-4 ">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Blood Availability</h2>
              <IonButton fill="clear" onClick={() => setShowAvailabilityModal(false)} className="text-white">
                <IonIcon icon={close} slot="icon-only" />
              </IonButton>
            </div>
          </div>
          <IonContent className="ion-padding bg-white mx-4">
            <p className="text-center text-gray-700 text-lg">
              <strong>Blood Available:</strong>
            </p>
            <ul className="list-disc mt-4 ml-8">
              <li>A+ : 10 units</li>
              <li>A- : 5 units</li>
              <li>B+ : 8 units</li>
              <li>B- : 3 units</li>
              <li>AB+ : 2 units</li>
              <li>O+ : 12 units</li>
              <li>O- : 4 units</li>
            </ul>
            <IonButton expand="block" fill="clear" className="mx-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-green-700 mt-6" onClick={() => setShowAvailabilityModal(false)}>
              Done
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Schedule Appointment Modal */}
        <IonModal isOpen={showScheduleModal} onDidDismiss={() => setShowScheduleModal(false)} className="rounded-t-lg">
          <div className="bg-blue-600 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Schedule Appointment</h2>
              <IonButton fill="clear" onClick={() => setShowScheduleModal(false)} className="text-white">
                <IonIcon icon={close} slot="icon-only" />
              </IonButton>
            </div>
          </div>
          <IonContent className="ion-padding bg-white">
            <IonList className="bg-transparent">
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" required className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div className="mb-6 mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Appointment Date</label>
                <IonDatetimeButton style={{ backgroundColor: 'transparent' }} datetime="appointmentDate" className="w-full border border-gray-300 rounded-md py-2 px-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="appointmentDate" presentation="date"></IonDatetime>
                </IonModal>
              </div>
            </IonList>
            <IonButton expand="block" fill="clear" className="mx-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-blue-700">
              Schedule Appointment
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default BloodBankPage;