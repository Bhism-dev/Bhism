import React, { useState } from 'react';
import { 
  IonApp, 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonModal,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem,
  IonList,
  IonIcon
} from '@ionic/react';
import { close, chevronDown } from 'ionicons/icons';
import './LabManagement.css'

const labs = [
  { 
    id: 1, 
    name: "Blood Test Lab", 
    image: "/placeholder.svg?height=100&width=100",
    tests: ["Complete Blood Count", "Lipid Profile", "Glucose Test"]
  },
  { 
    id: 2, 
    name: "X-Ray Lab", 
    image: "/placeholder.svg?height=100&width=100",
    tests: ["Chest X-Ray", "Bone X-Ray", "Dental X-Ray"]
  },
  { 
    id: 3, 
    name: "MRI Lab", 
    image: "/placeholder.svg?height=100&width=100",
    tests: ["Brain MRI", "Spine MRI", "Joint MRI"]
  },
  { 
    id: 4, 
    name: "CT Scan Lab", 
    image: "/placeholder.svg?height=100&width=100",
    tests: ["Head CT", "Chest CT", "Abdominal CT"]
  },
  { 
    id: 5, 
    name: "Ultrasound Lab", 
    image: "/placeholder.svg?height=100&width=100",
    tests: ["Abdominal Ultrasound", "Cardiac Ultrasound", "Pregnancy Ultrasound"]
  },
  { 
    id: 6, 
    name: "ECG Lab", 
    image: "/placeholder.svg?height=100&width=100",
    tests: ["Resting ECG", "Stress ECG", "Holter Monitor"]
  },
];

interface Lab {
  id: number;
  name: string;
  image: string;
  tests: string[];
}

export default function LabManagementComponent() {
  const [queues, setQueues] = useState<{ [key: number]: { current: number, total: number } }>(
    labs.reduce((acc, lab) => ({
      ...acc,
      [lab.id]: { current: 1, total: 0 }
    }), {})
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [selectedTest, setSelectedTest] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openModal = (lab: Lab) => {
    setSelectedLab(lab);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLab(null);
    setSelectedTest('');
    setPaymentMethod('online');
  };

  const bookTest = () => {
    if (selectedLab && selectedTest) {
      setQueues(prevQueues => ({
        ...prevQueues,
        [selectedLab.id]: {
          ...prevQueues[selectedLab.id],
          total: prevQueues[selectedLab.id].total + 1
        }
      }));
      closeModal();
    }
  };

  return (
    <IonApp >
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center font-bold text-white ">Hospital Lab Queue System</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bg-gray-50">
        <IonGrid>
          <IonRow>
            {labs.map((lab) => (
              <IonCol size="6" sizeMd="4" sizeLg="3" key={lab.id}>
                <IonCard 
                  className="aspect-square flex flex-col cursor-pointer transition-all duration-300 hover:shadow-md bg-white rounded-lg overflow-hidden border border-gray-200"
                  onClick={() => openModal(lab)}
                >
                  <IonCardContent className="flex flex-col items-center justify-between h-full p-4">
                    <div className="flex flex-col items-center flex-grow justify-center">
                      <IonImg src={lab.image} alt={lab.name} className="w-20 h-20 mb-4 rounded-full border-2 border-blue-900" />
                      <h2 className="text-lg font-semibold text-center text-gray-800">{lab.name}</h2>
                    </div>
                    <div className="w-full flex justify-between text-sm text-gray-600 mt-4">
                      <div>Current: {queues[lab.id].current}</div>
                      <div>In Queue: {queues[lab.id].total}</div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonModal isOpen={showModal} onDidDismiss={closeModal} className="rounded-t-lg">
          <div className="bg-blue-900 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{selectedLab?.name}</h2>
              <IonButton fill="clear" onClick={closeModal} className="text-white">
                <IonIcon icon={close} slot="icon-only" />
              </IonButton>
            </div>
          </div>
          <IonContent className="ion-padding bg-white">
            <IonList className="bg-transparent">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Test</label>
                <div className="relative w-64 mx-auto">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {selectedTest || "Choose a test"}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <IonIcon icon={chevronDown} className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {selectedLab?.tests.map((test, index) => (
                        <div
                          key={index}
                          className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedTest(test);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {test}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <IonLabel className="text-sm font-medium text-gray-700 mb-1 block">Payment Method</IonLabel>
                <IonRadioGroup 
                  value={paymentMethod} 
                  onIonChange={e => setPaymentMethod(e.detail.value)}
                  className="flex justify-center space-x-4 mt-2"
                >
                  <IonItem lines="none" className="rounded-md overflow-hidden --ion-item-background: transparent;">
                    <IonLabel>Online</IonLabel>
                    <IonRadio slot="start" value="online" />
                  </IonItem>
                  <IonItem lines="none" className="rounded-md overflow-hidden --ion-item-background: transparent;">
                    <IonLabel>Offline</IonLabel>
                    <IonRadio slot="start" value="offline" />
                  </IonItem>
                </IonRadioGroup>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Current people in queue: <span className="font-semibold">{selectedLab ? queues[selectedLab.id].total : 0}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Your position if booked: <span className="font-semibold">{selectedLab ? queues[selectedLab.id].total + 1 : 1}</span>
                </p>
              </div>
            </IonList>

            <IonButton expand="block" fill="clear" onClick={bookTest} className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-blue-800 ">
              Book Test
            </IonButton>
          </IonContent>
        </IonModal>

        
      </IonContent>
    </IonApp>
  );
}
