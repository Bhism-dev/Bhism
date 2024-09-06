import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import '../theme/tailwind.css';


const initialMedicineData = [
  { id: 1, name: 'Paracetamol', items: 25, available: true },
  { id: 2, name: 'Ibuprofen', items: 0, available: false },
  { id: 3, name: 'Aspirin', items: 50, available: true },
  { id: 4, name: 'Amoxicillin', items: 10, available: true },
  { id: 5, name: 'Vitamin C', items: 0, available: false },
  { id: 6, name: 'Cough Syrup', items: 15, available: true },
  { id: 7, name: 'Antacid', items: 0, available: false },
];

const InventoryComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState(initialMedicineData);

  const handleSearchChange = (e: CustomEvent) => {
    setSearchTerm(e.detail.value as string);
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pharmacy Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Search Bar */}
        <IonItem>
          <IonInput
            value={searchTerm}
            onIonInput={handleSearchChange}
            placeholder="Enter medicine name"
          />
        </IonItem>

        {/* Medicine List */}
        <IonGrid className="mt-4">
          <IonRow className="header-row bg-gray-200 p-2 rounded-lg">
            <IonCol size="2" className="font-bold">Serial No.</IonCol>
            <IonCol size="4" className="font-bold">Medicine Name</IonCol>
            <IonCol size="3" className="font-bold">Number of Items</IonCol>
            <IonCol size="3" className="font-bold">Availability</IonCol>
          </IonRow>
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine, index) => (
              <IonRow key={medicine.id} className="data-row border-b-2 border-gray-200 py-2">
                <IonCol size="2">{index + 1}</IonCol>
                <IonCol size="4">{medicine.name}</IonCol>
                <IonCol size="3">
                  {medicine.available ? medicine.items : 'N/A'}
                </IonCol>
                <IonCol size="3" className={`font-semibold ${medicine.available ? 'text-green-600' : 'text-red-600'}`}>
                  {medicine.available ? 'Available' : 'Not Available'}
                </IonCol>
              </IonRow>
            ))
          ) : (
            <IonRow>
              <IonCol>
                <IonText color="danger" className="text-center">
                  No medicines found.
                </IonText>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default InventoryComponent;
