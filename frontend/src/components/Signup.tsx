import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonInput,
  IonButton,
  IonItem,
  IonText,
  IonAlert,
  IonInputPasswordToggle,
} from "@ionic/react";
import { PinInput } from "react-input-pin-code";
import { useMaskito } from "@maskito/react";
import options from "./mask";
import loginbg from '../images/login.png'
import "../theme/tailwind.css"; // Import the Tailwind CSS file

const SignupForm: React.FC = () => {
  const [segment, setSegment] = useState<"mobile" | "abha">("mobile");
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [phoneMasked, setPhoneMasked] = useState<string>("");
  const [phone, setCleanNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [abhaId, setAbhaId] = useState(""); // State for ABHA ID
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    const formatted = value;
    const clean = value.replace(/\s+/g, "").replace(/^\+91/, "");
    setPhoneMasked(formatted);
    console.log("phone: ",phoneMasked);
    setCleanNumber(clean);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (showOtp && password && confirmPassword) {
      if (password === confirmPassword) {
        handleSignup(phone || abhaId, password);
      } else {
        setAlertMessage("Passwords do not match");
      }
    } else if (!showOtp) {
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (submit && (phone || abhaId)) {
      handleSendOtp(phone || abhaId);
      setSubmit(false);
    }
  }, [submit, phone, abhaId]);

  const handleSegmentChange = (e: CustomEvent) => {
    setSegment(e.detail.value as "mobile" | "abha");
    setShowOtp(false);
  };

  const handleSendOtp = async (identifier: string) => {
    
    try {
      const response = await fetch("http://localhost:3000/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      if (response.ok) {
        setAlertMessage(
          `OTP sent successfully to your mobile number XXXXXXX${phone.slice(
            -3
          )}`
        );
        setShowOtp(true);
      } else {
        setShowOtp(false);
        setAlertMessage(
          `Failed to send OTP to your mobile number XXXXXXX${phone.slice(-3)}`
        );
      }
    } catch (error) {
      setAlertMessage("An error occurred while sending OTP");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: phone || abhaId,
          otp: otp.join(""),
        }),
      });

      const data = await response.json();

      if (data.message === "OTP verified successfully") {
        setAlertMessage("OTP verification successful. Please set your password.");
      } else {
        setAlertMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setAlertMessage("An error occurred while verifying OTP");
    }
  };

  const handleSignup = async (
    identifier: string,
    newPassword: string
  ) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          password: newPassword,
        }),
      });

      if (response.ok) {
        setAlertMessage("Signup successful");
      } else {
        setAlertMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      setAlertMessage("An error occurred during signup");
    }
  };

  const phoneMask = useMaskito({ options });

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
      <div className="form-wrapper flex justify-center items-center h-full fixed inset-0" style={{ backgroundImage: `url(${loginbg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', position: 'fixed' }}>
      <div className="w-[28rem] w-11/12 max-w-lg shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
            <IonSegment
              value={segment}
              onIonChange={handleSegmentChange}
              color="primary"
            >
              <IonSegmentButton value="mobile">
                <IonLabel>Sign Up via Mobile</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="abha">
                <IonLabel>Sign Up by ABHA</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                {segment === "mobile" && (
                  <>
                  <IonItem>
                    <IonInput
                      ref={async (phoneRef) => {
                        if (phoneRef) {
                          const input = await phoneRef.getInputElement();
                          phoneMask(input);
                        }
                      }}
                      type="tel"
                      value={phoneMasked}
                      onIonInput={(e) =>
                        handleInputChange(e.detail.value ?? "")
                      }
                      label="Mobile Number"
                      labelPlacement="floating"
                      inputmode="tel"
                      maxlength={15}
                    />
                  </IonItem>
                  <IonButton
                      expand="full"
                      className="mt-4"
                      onClick={handleSubmit}
                    >
                      Send OTP
                    </IonButton>
                  <div className="text-center mt-6">
                  <IonText color="medium">
                    <p>
                      Already have an Account?{" "}
                      <Link to="/login" className="text-blue-500">
                        Login
                      </Link>
                    </p>
                  </IonText>
                </div>
                </>
                  
                )}

                {segment === "abha" && (
                  <>
                  <IonItem>
                    <IonInput
                      type="text"
                      placeholder="Enter your ABHA ID"
                      value={abhaId}
                      onIonChange={(e) => setAbhaId(e.detail.value ?? "")}
                      label="ABHA ID"
                      labelPlacement="floating"
                    />
                  </IonItem>
                  <>
                    <IonButton
                      expand="full"
                      className="mt-4"
                      onClick={handleSubmit}
                    >
                      Send OTP
                    </IonButton>
                    
                  </>
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
                  </>
                )}

                {showOtp && (
                  <>
                    <PinInput
                      values={otp}
                      onChange={(
                        value: string | string[],
                        index: number,
                        allValues: string[]
                      ) => {
                        const newOtp = [...allValues];
                        newOtp[index] =
                          typeof value === "string" ? value : value[0];
                        setOtp(newOtp);
                      }}
                      size="lg"
                      containerClassName="justify-center my-4"
                      inputClassName="mx-2"
                      placeholder=""
                      validBorderColor="rgb(13,110,253)"
                    />
                    <IonButton expand="full" className="mt-4" onClick={handleOtpSubmit}>
                      Verify OTP
                    </IonButton>
                  </>
                )}

                {showOtp && (
                  <>
                    <IonItem>
                      <IonInput
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value ?? "")}
                      >
                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                      </IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onIonChange={(e) => setConfirmPassword(e.detail.value ?? "")}
                      >
                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                      </IonInput>
                    </IonItem>
                    <IonButton expand="full" className="mt-4" type="submit">
                      Sign Up
                    </IonButton>
                  </>
                )}
                

                
              </form>
            </div>
          </div>
        </div>

        {/* Alert Popup */}
        {alertMessage && (
          <IonAlert
            isOpen={!!alertMessage}
            onDidDismiss={() => setAlertMessage(null)}
            header="Alert"
            message={alertMessage}
            buttons={["OK"]}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default SignupForm;
