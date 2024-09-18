import React, { useState, useEffect, useRef } from "react";
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
import "../theme/tailwind.css"; // Import the Tailwind CSS file
import loginbg from '../images/login.png'
import { useHistory } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [segment, setSegment] = useState<"mobile" | "abha">("mobile");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [phoneMasked, setPhoneMasked] = useState<string>("");
  const [phone, setCleanNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [abhaId, setAbhaId] = useState(""); // State for ABHA ID
  const [submit, setSubmit] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const History = useHistory();

  const handleInputChange = (value: string) => {
    const formatted = value;
    const clean = value.replace(/\s+/g, "").replace(/^\+91/, "");
    console.log(clean);
    setPhoneMasked(formatted);
    setCleanNumber(clean);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (showOtp) {
      handleOtpSubmit();
    } else {
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (submit && (phone || abhaId) && password) {
      handleLogin(phone || abhaId, password);
      setSubmit(false);
    }
  }, [submit, phone, abhaId, password]);

  const handleSegmentChange = (e: CustomEvent) => {
    setSegment(e.detail.value as "mobile" | "abha");
    setShowPassword(false);
    setShowOtp(false);
  };

  const handleLoginWithPasswordClick = () => {
    setShowPassword(true);
  };

  const handleLoginWithOtpClick = async () => {

    if (phone) {
      setCleanNumber(phone);
    } else {
      setAbhaId(abhaId);
    }
    try {
      const response = await fetch("http://localhost:3000/otp/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
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

  const handleLogin = async (
    currentIdentifier: string,
    currentPassword: string
  ) => {

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: currentIdentifier,
          password: currentPassword,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        History.push("/landing");
        localStorage.setItem("token", data.token);
      } else {
        if (data.message === "Invalid credentials") {
          setAlertMessage("Invalid credentials");
        } else if (data.message === "User not found") {
          setAlertMessage("User not found, please sign in");
        } else {
          setAlertMessage("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      setAlertMessage("An error occurred. Please try again.");
    }
  };

  const handleOtpSubmit = async () => {

    try {
      const response = await fetch("http://localhost:3000/otp/verify/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone || abhaId,
          otp: otp.join(""),
        }),
      });

      const data = await response.json();

      if (data.message === "OTP verified successfully") {
        localStorage.setItem("token", data.token);
        History.push("/landing");
      } else {
        setAlertMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setAlertMessage("An error occurred while verifying OTP");
    }
  };

  const phoneMask = useMaskito({ options });

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="form-wrapper flex justify-center items-center h-full fixed inset-0" style={{ backgroundImage: `url(${loginbg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', position: 'fixed' }}>
          <div className="w-11/12 max-w-lg shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
            <IonSegment
              value={segment}
              onIonChange={handleSegmentChange}
              color="primary"
            >
              <IonSegmentButton value="mobile">
                <IonLabel className="text-sm">Login via Mobile</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="abha">
                <IonLabel className="text-sm">Login by ABHA</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                {segment === "mobile" && (
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
                )}

                {segment === "abha" && (
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
                )}

                {!showPassword && !showOtp && (
                  <>
                    <IonButton
                      expand="full"
                      className="mt-4"
                      onClick={handleLoginWithPasswordClick}
                    >
                      Login with Password
                    </IonButton>
                    <IonButton
                      expand="full"
                      className="mt-2"
                      color="medium"
                      onClick={handleLoginWithOtpClick}
                    >
                      Login with OTP
                    </IonButton>
                    <div className="text-center mt-6">
                      <IonText color="medium">
                        <p>
                          Don't have an Account?{" "}
                          <Link to="/signup" className="text-blue-500">
                            Create one
                          </Link>
                        </p>
                      </IonText>
                    </div>
                  </>
                )}

                {showPassword && (
                  <>
                  <IonItem className="flex flex-col items-start">
                    <IonInput
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value ?? "")}
                    >
                      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                    </IonInput>
                  </IonItem>
                
                  <div className="flex justify-between items-center w-full mt-2">
                    <div></div> {/* Placeholder for possible future content or spacing */}
                    <IonText color="medium" className="cursor-pointer hover:underline text-sm">
                      <Link to="/forgotpassword">Forgot Password?</Link>
                    </IonText>
                  </div>
                
                  <IonButton expand="full" className="mt-4" type="submit">
                    Login
                  </IonButton>
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
                    <IonButton expand="full" className="mt-4" type="submit">
                      Verify OTP
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

export default LoginForm;
