import React, { useState } from 'react';
import {
    IonContent, IonPage, IonCol, IonRow, IonGrid, IonText, IonCard, IonCardContent,
    IonSearchbar, IonList, IonSelect, IonSelectOption
} from '@ionic/react';
import '../theme/tailwind.css';

const BedAvailabilityComponent: React.FC = () => {
    const beds: { Hospital: { [key: string]: { ward: string[]; floor: { [key: string]: number[] }; bed: { [key: string]: { [key: number]: boolean } } } } } = {
        Hospital: {
            "abc": {
                "ward": ["OPD", "ICU", "General"],
                "floor": {
                    "OPD": [1, 2],
                    "ICU": [1, 3],
                    "General": [2, 3]
                },
                "bed": {
                    "OPD": {
                        101: true,
                        102: true,
                        103: false,
                        201: true,
                        202: false,
                    },
                    "ICU": {
                        105: true,
                        106: false,
                        305: true,
                        306: true,
                    },
                    "General": {
                        209: true,
                        2010: true,
                        309: false,
                        3010: true,
                    }
                }
            },
            "xyz": {
                "ward": ["OPD", "ICU", "General"],
                "floor": {
                    "OPD": [1],
                    "ICU": [2, 3],
                    "General": [1, 3]
                },
                "bed": {
                    "OPD": {
                        101: true,
                        102: false,
                    },
                    "ICU": {
                        205: true,
                        207: false,
                        305: true,
                    },
                    "General": {
                        109: true,
                        3010: false,
                    }
                }
            }
        }
    };

    const [searchText, setSearchText] = useState('');
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

    const filteredHospitals = Object.keys(beds.Hospital).filter(hospital =>
        hospital.toLowerCase().includes(searchText.toLowerCase())
    );

    const floorsForWard = selectedHospital && selectedWard ? beds.Hospital[selectedHospital].floor[selectedWard] : [];

    return (
        <IonPage>
            <IonContent className="ion-padding">
                {/* Search Bar */}
                <IonSearchbar
                    value={searchText}
                    onIonInput={(e) => setSearchText(e.detail.value!)}
                    placeholder="Search Hospital"
                />

                {/* Hospital List and Ward Selector */}
                <IonList>
                    <IonSelect
                        value={selectedHospital}
                        placeholder="Select Hospital"
                        onIonChange={e => setSelectedHospital(e.detail.value)}
                    >
                        {filteredHospitals.map(hospital => (
                            <IonSelectOption key={hospital} value={hospital}>
                                {hospital}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonList>

                {selectedHospital && (
                    <IonList>
                        <IonSelect
                            value={selectedWard}
                            placeholder="Select Ward"
                            onIonChange={e => {
                                setSelectedWard(e.detail.value);
                                setSelectedFloor(null); // Reset floor on new ward selection
                            }}
                        >
                            {beds.Hospital[selectedHospital as keyof typeof beds.Hospital].ward.map(ward => (
                                <IonSelectOption key={ward} value={ward}>
                                    {ward}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonList>
                )}

                {selectedHospital && selectedWard && floorsForWard.length > 0 && (
                    <IonList>
                        <IonSelect
                            value={selectedFloor}
                            placeholder="Select Floor"
                            onIonChange={e => setSelectedFloor(e.detail.value)}
                        >
                            {floorsForWard.map(floor => (
                                <IonSelectOption key={floor} value={floor}>
                                    Floor {floor}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonList>
                )}

                {selectedHospital && selectedWard && selectedFloor && (
                    <>
                        {/* Availability Scale */}
                        <IonCard className="mb-4">
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="6" className="flex items-center justify-center">
                                            <div className="w-6 h-6 bg-green-500 mr-2" />
                                            <IonText>Available (Green)</IonText>
                                        </IonCol>
                                        <IonCol size="6" className="flex items-center justify-center">
                                            <div className="w-6 h-6 bg-red-500 mr-2" />
                                            <IonText>Not Available (Red)</IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>

                        {/* Bed Availability Grid */}
                        <IonCard>
                            <IonCardContent>
                                <IonText className="font-bold text-lg">
                                    {selectedWard} Ward - Bed Availability on Floor {selectedFloor}
                                </IonText>
                                <IonGrid>
                                    <IonRow>
                                        {Object.entries(beds.Hospital[selectedHospital].bed[selectedWard])
                                            .filter(([room]) => Math.floor(Number(room) / 100) === selectedFloor)
                                            .map(([room, available]) => (
                                                <IonCol size="3" key={room} className="text-center">
                                                    <div
                                                        className={`w-full h-20 rounded-md ${available ? 'bg-green-500' : 'bg-red-500'
                                                            } flex items-center justify-center text-white`}
                                                    >
                                                        <IonText>Room {room}</IonText>
                                                    </div>
                                                </IonCol>
                                            ))}
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default BedAvailabilityComponent;
