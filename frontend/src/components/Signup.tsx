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
  IonToast,
} from "@ionic/react";
import { PinInput } from "react-input-pin-code";
import { useMaskito } from "@maskito/react";
import options from "./mask";
import loginbg from "../images/login.png";
import { useHistory } from "react-router-dom";
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
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false); // New state to control password fields visibility
  const [disableFeilds, setDisableFields] = useState<boolean>(false);
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const History = useHistory();

  const handleInputChange = (value: string) => {
    const formatted = value;
    const clean = value.replace(/\s+/g, "").replace(/^\+91/, "");
    setPhoneMasked(formatted);
    setCleanNumber(clean);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (showOtp && password && confirmPassword) {
      if (password === confirmPassword) {
        handleSignup();
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
    setShowPasswordFields(false);
    setShowNameInput(false);
  };

  const handlePassword = () => {
    if (password === confirmPassword) {
      setShowNameInput(true);
      setShowPasswordFields(false);
    } else {
      setAlertMessage("Passwords do not match");
    }
  };

  const handleSendOtp = async (phone: string) => {
    try {
      const response = await fetch("http://bhismbackend.hbg7dydbfegpgecc.centralindia.azurecontainer.io:3000/otp/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone }),
      });

      if (response.ok) {     
        setDisableFields(true);
        setShowOtp(true);
      } else {
        setShowOtp(false);
        setAlertMessage(
          `Failed to send OTP to your mobile number XXXXXXX${phone.slice(-3)}`
        );
      }
    } catch (error) {
      console.log("error: ", error);
      setAlertMessage("An error occurred while sending OTP");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("http://bhismbackend.hbg7dydbfegpgecc.centralindia.azurecontainer.io:3000/otp/verify/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone || abhaId,
          otp: otp.join(""),
        }),
      });

      const data = await response.json();

      if (data.message === "OTP verified successfully") {
        setShowOtp(false); // Hide OTP fields after successful verification
        setShowPasswordFields(true); // Show password fields after successful OTP verification
      } else {
        setAlertMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setAlertMessage("An error occurred while verifying OTP");
    }
  };

  const handleSignup = async () => {
    try {
      console.log("body: ", { phone, password: confirmPassword, firstName: firstname, lastName: lastname, email, abhaid: abhaId });
      const response = await fetch("http://bhismbackend.hbg7dydbfegpgecc.centralindia.azurecontainer.io:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password: confirmPassword, firstName: firstname, lastName: lastname, email, abhaid: abhaId }),
      });

      if (response.ok) {
        History.push("/landing");
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
        <div
          className="form-wrapper flex justify-center items-center h-full fixed inset-0"
          style={{
            backgroundImage: `url(${loginbg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "fixed",
          }}
        >
          <div className="w-11/12 max-w-lg shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
            <IonSegment
              value={segment}
              onIonChange={handleSegmentChange}
              color="primary"
            >
              <IonSegmentButton value="mobile">
                <IonLabel>Sign Up via Mobile</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="abha"
                disabled={segment === "mobile" && disableFeilds ? true : false}
              >
                <IonLabel>Sign Up by ABHA</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                {segment === "mobile" &&
                  !showPasswordFields &&
                  !showNameInput && (
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
                          disabled={disableFeilds}
                        />
                      </IonItem>
                    </>
                  )}

                {!showOtp && !showPasswordFields && !showNameInput && (
                  <>
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

                {segment === "abha" && !showOtp && !showPasswordFields && (
                  <>
                    <IonItem>
                      <IonInput
                        type="text"
                        placeholder="Enter your ABHA ID"
                        value={abhaId}
                        onIonInput={(e) => setAbhaId(e.detail.value ?? "")}
                        label="ABHA ID"
                        labelPlacement="floating"
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
                          Don't have an ABHA ID?{" "}
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
                    <IonButton
                      expand="full"
                      className="mt-4"
                      onClick={handleOtpSubmit}
                    >
                      Verify OTP
                    </IonButton>
                  </>
                )}

                {showPasswordFields && (
                  <>
                    <IonItem>
                      <IonInput
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onIonInput={(e) => setPassword(e.detail.value ?? "")}
                      >
                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                      </IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onIonInput={(e) =>
                          setConfirmPassword(e.detail.value ?? "")
                        }
                      >
                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                      </IonInput>
                    </IonItem>
                    <IonButton
                      expand="full"
                      className="mt-4"
                      onClick={handlePassword}
                    >
                      Next
                    </IonButton>
                  </>
                )}

                {showNameInput && (
                  <>
                    <IonItem>
                      <IonInput
                        type="text"
                        placeholder="Enter your First name"
                        value={firstname}
                        onIonInput={(e) => setFirstname(e.detail.value ?? "")}
                        label="First Name"
                        labelPlacement="floating"
                      />
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="text"
                        placeholder="Enter your last name"
                        value={lastname}
                        onIonInput={(e) => setLastname(e.detail.value ?? "")}
                        label="Last Name"
                        labelPlacement="floating"
                      />
                    </IonItem>
                    <IonButton
                      expand="full"
                      className="mt-4"
                      onClick={handleSignup}
                    >Sign up</IonButton>
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
