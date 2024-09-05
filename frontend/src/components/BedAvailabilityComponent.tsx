import React, { useState } from 'react';
import {
    IonContent, IonPage, IonCol, IonRow, IonGrid, IonText, IonCard, IonCardContent,
    IonSearchbar, IonList, IonSelect, IonSelectOption
} from '@ionic/react';
import '../theme/tailwind.css';
const BedAvailabilityComponent: React.FC = () => {
    const beds: { Hospital: { [key: string]: { ward: string[]; floor: number[]; bed: { [key: string]: { [key: number]: boolean } } } } } = {
        Hospital: {
            "abc": {
                "ward": ["OPD", "ICU", "General"],
                "floor": [1, 2, 3],
                // "room": [101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304],
                "bed": {
                    "OPD": {
                        101: true,
                        102: true,
                        103: false,
                        104: true,
                        201: true,
                        202: true,
                        203: false,
                        204: true,
                        301: false,
                        302: false,
                        303: true,
                        304: true,
                    },
                    "ICU": {
                        105: true,
                        106: true,
                        107: false,
                        108: false,
                        205: true,
                        206: true,
                        207: false,
                        208: false,
                        305: true,
                        306: true,
                        307: true,
                        308: false,
                    },
                    "General": {
                        109: false,
                        1010: true,
                        1011: true,
                        1012: true,
                        209: true,
                        2010: true,
                        2011: true,
                        2012: true,
                        309: true,
                        3010: true,
                        3011: false,
                        3012: true,
                    }
                }
            },
            "xyz": {
                "ward": ["OPD", "ICU", "General"],
                "floor": [1, 2, 3],
                // "room": [101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304],
                "bed": {
                    "OPD": {
                        101: true,
                        102: true,
                        103: false,
                        104: true,
                        201: true,
                        202: true,
                        203: true,
                        204: true,
                        301: false,
                        302: false,
                        303: true,
                        304: true,
                    },
                    "ICU": {
                        105: true,
                        106: true,
                        107: false,
                        108: false,
                        205: true,
                        206: true,
                        207: true,
                        208: false,
                        305: true,
                        306: true,
                        307: true,
                        308: true,
                    },
                    "General": {
                        109: true,
                        1010: true,
                        1011: false,
                        1012: true,
                        209: true,
                        2010: true,
                        2011: true,
                        2012: false,
                        309: true,
                        3010: true,
                        3011: true,
                        3012: false,
                    }
                }
            },
            "lmn": {
                "ward": ["OPD", "ICU", "General"],
                "floor": [1, 2, 3],
                // "room": [101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304],
                "bed": {
                    "OPD": {
                        101: true,
                        102: true,
                        103: false,
                        104: true,
                        201: false,
                        202: true,
                        203: true,
                        204: true,
                        301: false,
                        302: false,
                        303: true,
                        304: true,
                    },
                    "ICU": {
                        105: false,
                        106: true,
                        107: true,
                        108: true,
                        205: false,
                        206: false,
                        207: false,
                        208: true,
                        305: false,
                        306: true,
                        307: false,
                        308: true,
                    },
                    "General": {
                        109: true,
                        1010: true,
                        1011: true,
                        1012: true,
                        209: false,
                        2010: true,
                        2011: true,
                        2012: false,
                        309: false,
                        3010: true,
                        3011: true,
                        3012: false,
                    }
                }
            }
        }
    };

    const [searchText, setSearchText] = useState('');
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);

    const filteredHospitals = Object.keys(beds.Hospital).filter(hospital =>
        hospital.toLowerCase().includes(searchText.toLowerCase())
    );

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
                            onIonChange={e => setSelectedWard(e.detail.value)}
                        >
                            {beds.Hospital[selectedHospital as keyof typeof beds.Hospital].ward.map(ward => (
                                <IonSelectOption key={ward} value={ward}>
                                    {ward}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonList>
                )}

                {selectedHospital && selectedWard && (
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
                                    {selectedWard} Ward - Bed Availability
                                </IonText>
                                <IonGrid>
                                    <IonRow>
                                        {Object.entries(beds.Hospital[selectedHospital].bed[selectedWard]).map(([room, available]) => (
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