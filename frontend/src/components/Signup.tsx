import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from "@ionic/react";
import { useMaskito } from "@maskito/react";
import options from "./mask"; // Import the mask options from your existing logic
import '../theme/tailwind.css'; // Import the Tailwind CSS file

const SignupForm: React.FC = () => {
  const [signupMethod, setSignupMethod] = useState<"mobile" | "abha">("mobile"); // State to track signup method
  const [formData, setFormData] = useState({
    abhaId: "",
    mobileMasked: "", // For displaying the masked mobile input
    mobile: "", // For storing the clean mobile number
    otp: "",
    password: "",
    confirmPassword: ""
  });
  const [otpSent, setOtpSent] = useState(false); // Track if OTP was sent
  const phoneMask = useMaskito({ options }); // Hook to apply phone masking

  const handleSignupMethodChange = (e: CustomEvent) => {
    setSignupMethod(e.detail.value as "mobile" | "abha");
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMaskedInputChange = (value: string) => {
    const formatted = value; // Use the masked value
    const clean = value.replace(/\s+/g, "").replace(/^\+91/, ""); // Clean value for submission
    setFormData({ ...formData, mobileMasked: formatted, mobile: clean });
  };

  const handleNext = () => {
    console.log('Next clicked');
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="form-wrapper flex justify-center items-center h-full fixed inset-0">
          <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg flex flex-col space-y-4">
            <h2 className="text-center text-2xl font-bold mb-4">Sign-Up</h2>

            {/* Segment to switch between mobile and ABHA signup */}
            <IonSegment
              value={signupMethod}
              onIonChange={handleSignupMethodChange}
              color="primary"
              className="mb-4"
            >
              <IonSegmentButton value="mobile">
                <IonLabel>Signup via Mobile</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="abha">
                <IonLabel>Signup via ABHA</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{height: '10rem'}}>
              {signupMethod === "mobile" && (
                <>
                  {/* Mobile number input */}
                  <IonItem className="rounded-lg bg-gray-100 mb-4">
                    <IonInput
                      ref={async (inputRef) => {
                        if (inputRef) {
                          const input = await inputRef.getInputElement();
                          phoneMask(input); // Apply the mask for mobile number input
                        }
                      }}
                      type="tel"
                      value={formData.mobileMasked}
                      onIonInput={(e) => handleMaskedInputChange(e.detail.value ?? "")}
                      placeholder="Enter Mobile Number"
                      label="Mobile Number"
                      labelPlacement="floating"
                      className="rounded-lg"
                    />
                  </IonItem>
                </>
              )}

              {signupMethod === "abha" && (
                <>
                  {/* ABHA ID input */}
                  <IonItem className="rounded-lg bg-gray-100 mb-4">
                    <IonInput
                      type="text"
                      name="abhaId"
                      placeholder="Enter ABHA ID"
                      value={formData.abhaId}
                      onIonChange={handleChange}
                      label="ABHA ID"
                      labelPlacement="floating"
                      className="rounded-lg"
                    />
                  </IonItem>
                </>
              )}

              <IonButton expand="full" className="mt-4 rounded-lg" onClick={handleNext}>
                Next
              </IonButton>

              {signupMethod === "abha" && (
                <div className="text-center mt-6">
                  <IonText color="medium">
                    <p>
                      Don't have an ABHA ID?{' '}
                      <a
                        href="https://abha.abdm.gov.in/abha/v3/register"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Create one
                      </a>
                    </p>
                  </IonText>
                </div>
              )}
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupForm;
