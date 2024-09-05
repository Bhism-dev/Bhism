import React, { useState } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonInput, IonButton, IonItem, IonText } from '@ionic/react';
import './LoginForm.css'; // Import the custom CSS file

const LoginForm: React.FC = () => {
  const [segment, setSegment] = useState<'mobile' | 'abha'>('mobile');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSegmentChange = (e: CustomEvent) => {
    setSegment(e.detail.value as 'mobile' | 'abha');
    setShowPassword(false); // Reset password visibility when switching segments
  };

  const handleLoginWithPasswordClick = () => {
    setShowPassword(true);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex justify-center items-center h-full">
          <div className="login-container shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
            <IonSegment value={segment} onIonChange={handleSegmentChange} color="primary">
              <IonSegmentButton value="mobile">
                <IonLabel>Login via Mobile</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="abha">
                <IonLabel>Login by ABHA</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {segment === 'mobile' && (
              <div className="mt-4">
                <IonItem>
                  <IonInput type="tel" placeholder="Enter your mobile number" />
                </IonItem>
                {!showPassword && (
                  <>
                    <IonButton expand="full" className="mt-4" onClick={handleLoginWithPasswordClick}>Login with Password</IonButton>
                    <IonButton expand="full" className="mt-2" color="medium">Login with OTP</IonButton>
                  </>
                )}
                {showPassword && (
                  <>
                    <IonItem>
                      <IonInput type="password" placeholder="Enter your password" />
                    </IonItem>
                    <IonButton expand="full" className="mt-4">Login</IonButton>
                  </>
                )}
              </div>
            )}

            {segment === 'abha' && (
              <div className="mt-4">
                <IonItem>
                  <IonInput type="text" placeholder="Enter your ABHA ID" />
                </IonItem>
                <IonButton expand="full" className="mt-4">Request OTP</IonButton>
              </div>
            )}

            {segment === 'abha' && (
              <div className="text-center mt-6">
                <IonText color="medium">
                  <p>Don't have an ABHA ID? <a href="/create-abha" className="text-primary">Create one</a></p>
                </IonText>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginForm;
