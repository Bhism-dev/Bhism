import React from 'react'
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonInput, IonButton, IonItem, IonText } from '@ionic/react';
import '../theme/tailwind.css';

const BedAvailabilityComponent: React.FC = () => {
    return(
        <IonPage>
            <IonContent className="ion-padding">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <IonItem>
                            <IonLabel position="floating">Enter the number of beds available</IonLabel>
                            <IonInput></IonInput>
                        </IonItem>
                        <IonButton expand="block" className="mt-4">Submit</IonButton>
                        <IonText className="mt-4">Your submission will be reviewed by our team</IonText>
                        <IonButton expand="block" fill="clear" className="mt-4">
                            <Link to="/bed-availability">View all submissions</Link>
                        </IonButton>
                    </div>
                </div>
            </div>
            </IonContent>
        </IonPage>
    )
}

export default BedAvailabilityComponent;