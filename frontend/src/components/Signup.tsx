import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonText
} from "@ionic/react";
import '../theme/tailwind.css'; // Import the Tailwind CSS file
const SignupForm: React.FC = () => {
    const [currentSegment, setCurrentSegment] = useState(1);
    const [formData, setFormData] = useState({
      abhaId: "",
      otp: "",
      password: "",
      confirmPassword: ""
    });
  
    const handleNext = () => {
      if (currentSegment < 3) {
        setCurrentSegment(currentSegment + 1);
      }
    };
  
    const handleResendOtp = () => {
      console.log("Resend OTP clicked");
    };
  
    const handleChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      console.log(formData);
    };
  
    const handleOtpSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      console.log(formData.otp);
      handleNext();
    };
  
    return (
      <IonPage>
        <IonContent className="ion-padding" fullscreen>
          <div className="form-wrapper flex justify-center items-center h-full fixed inset-0">
            {/* Main form container */}
            <div className="w-[28rem] max-w-full shadow-lg p-6 bg-white rounded-lg">
              <h2 className="text-center text-2xl font-bold mb-4">Sign-Up</h2>
  
              <form onSubmit={handleSubmit}>
                {currentSegment === 1 && (
                  <>
                    <IonItem>
                      <IonInput
                        type="text"
                        name="abhaId"
                        placeholder="Enter ABHA ID"
                        value={formData.abhaId}
                        onIonChange={handleChange}
                      />
                    </IonItem>
                    <IonButton expand="full" className="mt-4" onClick={handleNext}>
                      Next
                    </IonButton>
                  </>
                )}
  
                {currentSegment === 2 && (
                  <>
                    <IonItem>
                      <IonInput
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onIonChange={handleChange}
                      />
                    </IonItem>
                    <IonButton expand="full" className="mt-4" onClick={handleOtpSubmit}>
                      Submit OTP
                    </IonButton>
  
                    {/* Resend OTP link */}
                    <div className="text-center mt-6">
                      <IonText color="medium">
                        <p>
                          Didn't receive OTP?{' '}
                          <IonText
                            color="primary"
                            className="cursor-pointer"
                            onClick={handleResendOtp}
                          >
                            Resend OTP
                          </IonText>
                        </p>
                      </IonText>
                    </div>
                  </>
                )}
  
                {currentSegment === 3 && (
                  <>
                    <IonItem>
                      <IonInput
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onIonChange={handleChange}
                      />
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onIonChange={handleChange}
                      />
                    </IonItem>
                    <IonButton expand="full" className="mt-4" type="submit">
                      Submit
                    </IonButton>
                  </>
                )}
              </form>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default SignupForm;