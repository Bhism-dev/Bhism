import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React from "react";
import '../../theme/tailwind.css';
import { Link } from "react-router-dom";
const Contact: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Tailwind</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="text-center bg-gray-400">
                    <h1 className="text-4xl font-bold mb-4">Welcome to TailwindCSS!</h1>
                    <p className="text-lg">This is an example of using TailwindCSS in an Ionic React application.</p>
                </div>
                <div className="flex justify-center mt-8">
                    <IonButtons className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                        <Link to="/inbox">Back to Home Example Button</Link>
                    </IonButtons>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Contact;
