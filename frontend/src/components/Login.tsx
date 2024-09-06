import React, { useEffect, useState } from "react";
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
  IonInputPasswordToggle,
} from "@ionic/react";
import "../theme/tailwind.css"; // Import the Tailwind CSS file

const LoginForm: React.FC = () => {
  const [segment, setSegment] = useState<"mobile" | "abha">("mobile");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmit(true); // Indicate that a submission attempt was made
  };

  useEffect(() => {
    // Only proceed if submit is true and both phone and password are not empty
    if (submit && phone && password) {
      // Perform the login action
      handleLogin(phone, password);
      setSubmit(false); // Reset submit state
    }
  }, [submit, phone, password]); // Depend on submit, phone, and password

  const handleSegmentChange = (e: CustomEvent) => {
    setSegment(e.detail.value as "mobile" | "abha");
    setShowPassword(false); // Reset password visibility when switching segments
  };

  const handleLoginWithPasswordClick = () => {
    setShowPassword(true);
  };

  // Adjust the handleLogin function to accept a password parameter
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
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                      type="tel"
                      value={phone}
                      onIonChange={(e) => setPhone(e.detail.value ?? "")}
                      placeholder="Enter your mobile number"
                    />
                  </IonItem>
                  {!showPassword && (
                    <>
                      <IonButton
                        expand="full"
                        className="mt-4"
                        onClick={handleLoginWithPasswordClick}
                      >
                        Login with Password
                      </IonButton>
                      <IonButton expand="full" className="mt-2" color="medium">
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
      </IonContent>
    </IonPage>
  );
};

export default LoginForm;
