import React, { useState } from 'react';
import {
    IonContent, IonPage, IonCol, IonRow, IonGrid, IonText, IonCard, IonCardContent,
    IonSearchbar, IonItem, IonInput, IonButton, IonToggle, IonSelect, IonSelectOption, IonLabel, IonModal, IonHeader, IonFooter,
    IonBackButton,
    IonButtons,
    IonToolbar, IonTitle
} from '@ionic/react';
import '../../theme/tailwind.css';

interface Bed {
    bedNumber: string;
    available: boolean;
    floor: string;
    ward: string;
}

const AdminBedAvailabilityComponent: React.FC = () => {
    // Initial bed data with ward and floor info
    const [beds, setBeds] = useState<Bed[]>([
        { bedNumber: '101', available: true, floor: '1', ward: 'OPD' },
        { bedNumber: '102', available: false, floor: '1', ward: 'ICU' },
        { bedNumber: '103', available: true, floor: '2', ward: 'OPD' },
        { bedNumber: '104', available: false, floor: '2', ward: 'General' },
        { bedNumber: '105', available: true, floor: '3', ward: 'General' },
        { bedNumber: '106', available: false, floor: '3', ward: 'ICU' },
        { bedNumber: '107', available: true, floor: '4', ward: 'OPD' },
        { bedNumber: '108', available: false, floor: '4', ward: 'General' },
        { bedNumber: '109', available: true, floor: '5', ward: 'General' },
        { bedNumber: '110', available: false, floor: '5', ward: 'ICU' },
    ]);

    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBed, setNewBed] = useState({ bedNumber: '', floor: '', ward: '' });

    // Add new bed after validation
    const handleAddBed = () => {
        if (newBed.bedNumber && newBed.floor && newBed.ward) {
            const newBedEntry: Bed = {
                bedNumber: newBed.bedNumber,
                available: false, // New beds are initially unavailable
                floor: newBed.floor,
                ward: newBed.ward
            };
            setBeds([...beds, newBedEntry]);
            setIsModalOpen(false); // Close modal after adding
            setNewBed({ bedNumber: '', floor: '', ward: '' }); // Clear form
        }
    };

    // Save changes for all beds
    const handleSaveAll = () => {
        console.log('Saved changes for all beds:', beds);
    };

    // Update bed fields
    const handleEditBed = (bedNumber: string, field: keyof Bed, value: string | boolean) => {
        const updatedBeds = beds.map(bed => {
            if (bed.bedNumber === bedNumber) {
                return { ...bed, [field]: value };
            }
            return bed;
        });
        setBeds(updatedBeds);
    };

    // Filter beds based on search
    const filteredBeds = beds.filter(bed =>
        bed.bedNumber.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <IonPage>
            <IonHeader className='bg-white ion-padding pb-0'>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" />
                    </IonButtons>
                    <IonTitle>Add Bed</IonTitle>
                </IonToolbar>

                {/* Search Bar */}
                <IonSearchbar
                    value={searchText}
                    onIonInput={(e) => setSearchText(e.detail.value!)}
                    placeholder="Search Bed Number"
                />

                {/* Add Bed Button */}
                <IonButton expand="full" color="primary" className="mb-4" onClick={() => setIsModalOpen(true)}>
                    Add New Bed
                </IonButton>
            </IonHeader>

            <IonContent className="ion-padding">
                {/* Bed List */}
                <IonGrid>
                    {filteredBeds.map((bed) => (
                        <IonCard key={bed.bedNumber}>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="12" sizeMd="3">
                                            <IonText>Bed Number: {bed.bedNumber}</IonText>
                                        </IonCol>
                                        <IonCol size="12" sizeMd="3">
                                            <IonText>Floor: {bed.floor}</IonText>
                                        </IonCol>
                                        <IonCol size="12" sizeMd="3">
                                            <IonText>Ward: {bed.ward}</IonText>
                                        </IonCol>
                                        <IonCol size="12" sizeMd="3">
                                            <IonItem>
                                                <IonToggle
                                                    checked={bed.available}
                                                    onIonChange={(e) => handleEditBed(bed.bedNumber, 'available', e.detail.checked)}
                                                />
                                                <IonText>{bed.available ? 'Available' : 'Unavailable'}</IonText>
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

                {/* Save All Button */}
                <IonButton expand="full" color="success" onClick={handleSaveAll}>
                    Save All Changes
                </IonButton>
            </IonFooter>

            {/* Modal for Adding a New Bed */}
            <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel>Ward</IonLabel>
                                    <IonSelect
                                        value={newBed.ward}
                                        placeholder="Select Ward"
                                        onIonChange={(e) => setNewBed({ ...newBed, ward: e.detail.value! })}
                                    >
                                        <IonSelectOption value="OPD">OPD</IonSelectOption>
                                        <IonSelectOption value="General">General</IonSelectOption>
                                        <IonSelectOption value="ICU">ICU</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonInput
                                        value={newBed.floor}
                                        placeholder="Enter Floor Number"
                                        onIonChange={(e) => setNewBed({ ...newBed, floor: e.detail.value! })}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonInput
                                        value={newBed.bedNumber}
                                        placeholder="Enter Bed Number"
                                        onIonChange={(e) => setNewBed({ ...newBed, bedNumber: e.detail.value! })}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton expand="full" onClick={handleAddBed}>
                                    Add Bed
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton expand="full" color="light" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </IonPage>
    );
};

export default AdminBedAvailabilityComponent;

