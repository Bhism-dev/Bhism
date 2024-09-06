import React, { useState } from 'react';
import {
    IonContent, IonPage, IonCol, IonRow, IonGrid, IonText, IonCard, IonCardContent,
    IonSearchbar, IonItem, IonInput, IonButton, IonToggle
} from '@ionic/react';
import '../../theme/tailwind.css';

interface Medicine {
    serialNumber: number;
    name: string;
    numberOfItems: string | number;
    available: boolean;
}

const InventoryAdminComponent: React.FC = () => {
    // Dummy data for medicines
    const [medicines, setMedicines] = useState<Medicine[]>([
        { serialNumber: 1, name: 'Paracetamol', numberOfItems: 20, available: true },
        { serialNumber: 2, name: 'Ibuprofen', numberOfItems: 'N/A', available: false },
        { serialNumber: 3, name: 'Amoxicillin', numberOfItems: 15, available: true },
        { serialNumber: 4, name: 'Aspirin', numberOfItems: 'N/A', available: false }
    ]);

    const [searchText, setSearchText] = useState('');
    const [newMedicineId, setNewMedicineId] = useState<number>(medicines.length + 1);

    // Add new medicine entry
    const handleAddMedicine = () => {
        const newMedicine: Medicine = {
            serialNumber: newMedicineId,
            name: '',
            numberOfItems: 'N/A',
            available: false
        };
        setMedicines([...medicines, newMedicine]);
        setNewMedicineId(newMedicineId + 1);
    };

    // Save changes for all medicines
    const handleSaveAll = () => {
        console.log('Saved changes for all medicines:', medicines);
    };

    // Update medicine fields
    const handleEditMedicine = (serialNumber: number, field: keyof Medicine, value: string | boolean) => {
        const updatedMedicines = medicines.map(medicine => {
            if (medicine.serialNumber === serialNumber) {
                const updatedMedicine = { ...medicine, [field]: value };

                // If available is toggled to false, set numberOfItems to "N/A"
                if (field === 'available' && !value) {
                    updatedMedicine.numberOfItems = 'N/A';
                }

                // If available is toggled to true, reset numberOfItems to an empty string
                if (field === 'available' && value) {
                    updatedMedicine.numberOfItems = '';
                }

                return updatedMedicine;
            }
            return medicine;
        });

        setMedicines(updatedMedicines);
    };

    // Filter medicines based on search
    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <IonPage>
            <IonContent className="ion-padding">
                {/* Search Bar */}
                <IonSearchbar
                    value={searchText}
                    onIonInput={(e) => setSearchText(e.detail.value!)}
                    placeholder="Search Medicine"
                />

                {/* Add Medicine Button */}
                <IonButton expand="full" color="primary" className="mb-4" onClick={handleAddMedicine}>
                    Add Medicine
                </IonButton>

                {/* Medicine List */}
                <IonGrid>
                    {filteredMedicines.map((medicine) => (
                        <IonCard key={medicine.serialNumber}>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="12" sizeMd="3">
                                            <IonText>Serial Number: {medicine.serialNumber}</IonText>
                                        </IonCol>
                                        <IonCol size="12" sizeMd="3">
                                            <IonItem>
                                                <IonInput
                                                    value={medicine.name}
                                                    placeholder="Medicine Name"
                                                    onIonChange={(e) => handleEditMedicine(medicine.serialNumber, 'name', e.detail.value!)}
                                                />
                                            </IonItem>
                                        </IonCol>
                                        <IonCol size="12" sizeMd="3">
                                            <IonItem>
                                                <IonInput
                                                    value={medicine.numberOfItems}
                                                    placeholder="Number of Items"
                                                    disabled={!medicine.available} // Disable if unavailable
                                                    onIonChange={(e) => handleEditMedicine(medicine.serialNumber, 'numberOfItems', e.detail.value!)}
                                                />
                                            </IonItem>
                                        </IonCol>
                                        <IonCol size="12" sizeMd="3">
                                            <IonItem>
                                                <IonToggle
                                                    checked={medicine.available}
                                                    onIonChange={(e) => handleEditMedicine(medicine.serialNumber, 'available', e.detail.checked)}
                                                />
                                                <IonText>{medicine.available ? 'Available' : 'Not Available'}</IonText>
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonGrid>

                {/* Save All Button */}
                <IonButton expand="full" color="success" onClick={handleSaveAll}>
                    Save All Changes
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default InventoryAdminComponent;
