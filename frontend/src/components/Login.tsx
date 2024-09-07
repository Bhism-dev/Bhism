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
import "../theme/tailwind.css"; // Import the Tailwind CSS file

const LoginForm: React.FC = () => {
  const [segment, setSegment] = useState<"mobile" | "abha">("mobile");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>(Array(6).fill(null));
  const [submit, setSubmit] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // const [otp, setValues] = React.useState(['', '', '']);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (showOtp) {
      handleOtpSubmit();
    } else {
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (submit && phone && password) {
      handleLogin(phone, password);
      setSubmit(false);
    }
  }, [submit, phone, password]);

  const handleSegmentChange = (e: CustomEvent) => {
    setSegment(e.detail.value as "mobile" | "abha");
    setShowPassword(false);
    setShowOtp(false);
  };

  const handleLoginWithPasswordClick = () => {
    setShowPassword(true);
  };

  const handleLoginWithOtpClick = async () => {
    setPhone(phone);
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

  const handleLogin = async (currentPhone: string, currentPassword: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: currentPhone,
          password: currentPassword,
        }),
      });
      const data = await response.json();
      // console.log("data ", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setAlertMessage("Login successful");
      } else {
        // Handle different error responses
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
    // if(phone==="") {
    //   setAlertMessage('Please enter your mobile number');
    //   return;
    // }
    try {
      const response = await fetch("http://localhost:3000/otp/verify/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          otp: otp.join(""),
        }),
      });
      // console.log("response ", response);

      const data = await response.json();
      // console.log("token: ",data.token);

      if (data.message === "OTP verified successfully") {
        localStorage.setItem("token", data.token);
        setAlertMessage("OTP verification successful");
      } else {
        setAlertMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setAlertMessage("An error occurred while verifying OTP");
    }
  };

  const phoneMask = useMaskito({
    options: {
      mask: [
        ...Array(3).fill(/\d/),
        " ",
        ...Array(3).fill(/\d/),
        " ",
        ...Array(4).fill(/\d/),
      ],
    },
  });

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="form-wrapper flex justify-center items-center h-full fixed inset-0">
          <div className="w-[28rem] max-w-full shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
            <IonSegment
              value={segment}
              onIonChange={handleSegmentChange}
              color="primary"
            >
              <IonSegmentButton value="mobile">
                <IonLabel>Login via Mobile</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="abha">
                <IonLabel>Login by ABHA</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {segment === "mobile" && (
              <div className="mt-4">
                <form onSubmit={handleSubmit}>
                  <IonItem>
                    <IonInput
                      ref={async (phoneRef) => {
                        if (phoneRef) {
                          const input = await phoneRef.getInputElement();
                          phoneMask(input);
                        }
                      }}
                      type="tel"
                      placeholder="888 888 8888"
                      value={phone}
                      onIonChange={(e) => setPhone(e.detail.value ?? "")}
                      label="Mobile Number"
                      labelPlacement="floating"
                    />
                  </IonItem>
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
                    </>
                  )}
                  {showPassword && (
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
                      <IonButton expand="full" className="mt-4" type="submit">
                        Login
                      </IonButton>
                    </>
                  )}

                  {showOtp && (
                    <PinInput
                      values={otp}
                      autoFocus={true}
                      onChange={(value, index, values) => setOtp(values)}
                      size="lg"
                      containerClassName="justify-center my-4"
                      inputClassName="mx-2"
                      placeholder=""
                      validBorderColor="rgb(13,110,253)"
                    />
                  )}

                  {showOtp && (
                    <IonButton expand="full" className="mt-4" type="submit">
                      Verify OTP
                    </IonButton>
                  )}
                </form>
              </div>
            )}

            {segment === "abha" && (
              <>
                <div className="mt-4">
                  <IonItem>
                    <IonInput type="text" placeholder="Enter your ABHA ID" />
                  </IonItem>
                  <IonButton expand="full" className="mt-4">
                    Request OTP
                  </IonButton>
                </div>
                <div className="text-center mt-6">
                  <IonText color="medium">
                    <p>
                      Don't have an ABHA ID?{" "}
                      <Link to="/create-abha" className="text-blue-500">
                        Create one
                      </Link>
                    </p>
                  </IonText>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Alert Popup */}
        {alertMessage && (
          <IonAlert
            isOpen={!!alertMessage}
            onDidDismiss={() => setAlertMessage(null)}
            header={"Alert"}
            message={alertMessage}
            buttons={["OK"]}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default LoginForm;
