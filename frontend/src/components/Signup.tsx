import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
} from '@ionic/react';
import { useMaskito } from '@maskito/react';
import options from './mask';
import '../theme/tailwind.css';

const SignupForm: React.FC = () => {
  const [signupMethod, setSignupMethod] = useState<'mobile' | 'abha'>('mobile');
  const [formData, setFormData] = useState({
    abhaId: '',
    mobileMasked: '',
    mobile: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [formStep, setFormStep] = useState(1); // Track the current step (1: Mobile/ABHA, 2: OTP, 3: Password)
  const [otpSent, setOtpSent] = useState(false);
  const phoneMask = useMaskito({ options });
  const mobileInputRef = useRef<HTMLIonInputElement | null>(null);

  useEffect(() => {
    if (mobileInputRef.current) {
      phoneMask(mobileInputRef.current);
    }
  }, [mobileInputRef, phoneMask]);

  const handleSignupMethodChange = (e: CustomEvent) => {
    setSignupMethod(e.detail.value as 'mobile' | 'abha');
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMaskedInputChange = (value: string) => {
    const clean = value.replace(/\s+/g, '').replace(/^\+91/, '');
    setFormData({ ...formData, mobileMasked: value, mobile: clean });
  };

  const handleNext = () => {
    if (formStep === 1) {
      // Validation for mobile or ABHA input
      if (signupMethod === 'mobile' && !formData.mobile) {
        alert('Please enter your mobile number.');
        return;
      }

      if (signupMethod === 'abha' && !formData.abhaId) {
        alert('Please enter your ABHA ID.');
        return;
      }

      // Simulate OTP sending
      setOtpSent(true);
      setFormStep(2); // Move to OTP step
      alert('OTP has been sent.');
    } else if (formStep === 2) {
      // OTP verification step
      if (!formData.otp) {
        alert('Please enter the OTP.');
        return;
      }

      // Simulate OTP verification success
      setFormStep(3); // Move to password setup step
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formStep === 3) {
      // Password setup step
      if (!formData.password || !formData.confirmPassword) {
        alert('Please enter and confirm your password.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      // Submit final form
      console.log('Form submitted:', formData);
      alert('Signup successful!');
    }
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
              disabled={formStep !== 1} // Disable segment after the first step
            >
              <IonSegmentButton value="mobile">
                <IonLabel>Signup via Mobile</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="abha">
                <IonLabel>Signup via ABHA</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Step 1: Enter Mobile or ABHA */}
              {formStep === 1 && (
                <>
                  {signupMethod === 'mobile' && (
                    <IonItem className="rounded-lg bg-gray-100 mb-4">
                      <IonInput
                        ref={mobileInputRef}
                        type="tel"
                        value={formData.mobileMasked}
                        onIonInput={(e) => handleMaskedInputChange(e.detail.value ?? '')}
                        placeholder="Enter Mobile Number"
                        label="Mobile Number"
                        labelPlacement="floating"
                        className="rounded-lg"
                      />
                    </IonItem>
                  )}

                  {signupMethod === 'abha' && (
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
                  )}
                </>
              )}

              {/* Step 2: Enter OTP */}
              {formStep === 2 && (
                <IonItem className="rounded-lg bg-gray-100 mb-4">
                  <IonInput
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onIonChange={handleChange}
                    label="OTP"
                    labelPlacement="floating"
                    className="rounded-lg"
                  />
                </IonItem>
              )}

              {/* Step 3: Set Password */}
              {formStep === 3 && (
                <>
                  <IonItem className="rounded-lg bg-gray-100 mb-4">
                    <IonInput
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onIonChange={handleChange}
                      label="Password"
                      labelPlacement="floating"
                      className="rounded-lg"
                    />
                  </IonItem>

                  <IonItem className="rounded-lg bg-gray-100 mb-4">
                    <IonInput
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onIonChange={handleChange}
                      label="Confirm Password"
                      labelPlacement="floating"
                      className="rounded-lg"
                    />
                  </IonItem>
                </>
              )}

              {/* Next or Submit Button */}
              <IonButton expand="full" className="mt-4 rounded-lg" onClick={handleNext}>
                {formStep === 3 ? 'Submit' : 'Next'}
              </IonButton>

              {/* Existing Account Link */}
              {formStep === 1 && signupMethod === 'mobile' && (
                <div className="text-center mt-6">
                  <IonText color="medium">
                    <p>
                      Already have an Account?{' '}
                      <Link to="/login" className="text-blue-500">
                        Log In
                      </Link>
                    </p>
                  </IonText>
                </div>
              )}

              {/* ABHA Creation Link */}
              {formStep === 1 && signupMethod === 'abha' && (
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
