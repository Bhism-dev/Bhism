import React, { useState } from 'react';
import {
    IonContent, IonPage, IonCol, IonRow, IonGrid, IonText, IonCard, IonCardContent,
    IonSearchbar, IonItem, IonInput, IonButton, IonToggle, IonCheckbox, IonIcon, IonFooter, IonHeader, IonAlert
} from '@ionic/react';
import '../../theme/tailwind.css';
import { addCircleOutline, trashOutline, closeOutline } from 'ionicons/icons';

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
        { serialNumber: 4, name: 'Aspirin', numberOfItems: 'N/A', available: false },
        { serialNumber: 5, name: 'Ciprofloxacin', numberOfItems: 10, available: true },
        { serialNumber: 6, name: 'Doxycycline', numberOfItems: 'N/A', available: false },
        { serialNumber: 7, name: 'Metronidazole', numberOfItems: 5, available: true },
        { serialNumber: 8, name: 'Azithromycin', numberOfItems: 'N/A', available: false },
        { serialNumber: 9, name: 'Clarithromycin', numberOfItems: 10, available: true },
        { serialNumber: 10, name: 'Ceftriaxone', numberOfItems: 'N/A', available: false },
    ]);

    const [searchText, setSearchText] = useState('');
    const [newMedicineId, setNewMedicineId] = useState<number>(medicines.length + 1);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [selectedMedicines, setSelectedMedicines] = useState<Set<number>>(new Set());
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

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

    const handleDeleteSelected = () => {
        const remainingMedicines = medicines.filter(medicine => !selectedMedicines.has(medicine.serialNumber));
        setMedicines(remainingMedicines);
        setSelectedMedicines(new Set());
        setDeleteMode(false);
    };

    const handleSelectMedicine = (serialNumber: number) => {
        const updatedSelection = new Set(selectedMedicines);
        if (updatedSelection.has(serialNumber)) {
            updatedSelection.delete(serialNumber);
        } else {
            updatedSelection.add(serialNumber);
        }
        setSelectedMedicines(updatedSelection);
    };

    const handleSelectAll = () => {
        if (selectedMedicines.size === medicines.length) {
            setSelectedMedicines(new Set());
        } else {
            const allSerialNumbers = new Set(medicines.map(medicine => medicine.serialNumber));
            setSelectedMedicines(allSerialNumbers);
        }
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
            <IonHeader className='bg-white ion-padding pb-0'>

                {/* Search Bar */}
                <IonSearchbar
                    value={searchText}
                    onIonInput={(e) => setSearchText(e.detail.value!)}
                    placeholder="Search Medicine"
                />

                {/* Add Medicine Button */}
                <IonRow className="mb-4">
                    <IonCol size="12" sizeMd="6" className='m-0 p-0 px-1'>
                        <IonButton
                            expand="block"
                            color="primary"
                            onClick={handleAddMedicine}
                            disabled={deleteMode ? true : false}
                        >
                            <IonIcon slot="start" icon={addCircleOutline} />
                            Add Medicine
                        </IonButton>
                    </IonCol>

                    <IonCol size="12" sizeMd="6" className='m-0 p-0 px-1'>
                        <IonButton
                            expand="block"
                            color={deleteMode ? 'danger' : 'warning'}
                            onClick={() => setDeleteMode(!deleteMode)}
                        >
                            <IonIcon slot="start" icon={deleteMode ? closeOutline : trashOutline} />
                            Delete Medicine
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonHeader>

            {/* Medicine List */}
            <IonContent className="ion-padding">
                <IonGrid>
                    {filteredMedicines.map((medicine, index) => (
                        <IonCard key={medicine.serialNumber}>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size={deleteMode ? "12" : "0"} sizeMd={deleteMode ? "1" : "0"}>
                                            {deleteMode && (
                                                <IonCheckbox
                                                    checked={selectedMedicines.has(medicine.serialNumber)}
                                                    onIonChange={() => handleSelectMedicine(medicine.serialNumber)}
                                                />
                                            )}
                                        </IonCol>
                                        <IonCol size="12" sizeMd="2">
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
                                        <IonCol size="12" sizeMd="2">
                                            <IonItem>
                                                <IonInput
                                                    value={medicine.numberOfItems}
                                                    placeholder="Number of Items"
                                                    disabled={!medicine.available} // Disable if unavailable
                                                    onIonChange={(e) => handleEditMedicine(medicine.serialNumber, 'numberOfItems', e.detail.value!)}
                                                />
                                            </IonItem>
                                        </IonCol>
                                        <IonCol size="12" sizeMd="4">
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

            </IonContent>


            <IonFooter className='bg-white ion-padding pt-0 pb-1'>
                {/* Delete Selected Button */}
                {deleteMode && (
                    <>
                        <IonRow className="ion-margin-top">
                            <IonCol size="12" sizeMd="6" className='m-0 p-0'>
                                <IonButton
                                    expand="block"
                                    color="danger"
                                    onClick={() => setAlertMessage('Are you sure you want to delete the selected medicines?')}
                                >
                                    {deleteMode && (
                                        <IonText>
                                            Delete {selectedMedicines.size} {selectedMedicines.size === 1 ? 'medicine' : 'medicines'}
                                        </IonText>
                                    )}
                                </IonButton>
                            </IonCol>
                            <IonCol size="12" sizeMd="6" className='m-0 p-0'>
                                <IonButton
                                    expand="block"
                                    color="medium"
                                    onClick={handleSelectAll}
                                >
                                    {selectedMedicines.size === medicines.length ? 'Deselect All' : 'Select All'}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </>
                )}


                {/* Save All Button */}
                <IonButton expand="block" color="primary" onClick={handleSaveAll} disabled={deleteMode ? true : false}>
                    Save All Changes
                </IonButton>
            </IonFooter>
            {/* Alert Popup */}
            {alertMessage && (
                <IonAlert
                    isOpen={!!alertMessage}
                    onDidDismiss={() => setAlertMessage(null)}
                    header={'Alert'}
                    message={alertMessage}
                    // buttons={['OK']}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                        },
                        {
                            text: 'OK',
                            role: 'confirm',
                            handler: () => {
                                handleDeleteSelected();
                            },
                        },
                    ]
                    }
                />
            )}
        </IonPage>
    );
};

export default InventoryAdminComponent;
