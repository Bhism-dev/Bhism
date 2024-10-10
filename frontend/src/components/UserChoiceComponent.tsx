import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

const UserChoiceComponent: React.FC = () => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/login');
  };

  const handleWithoutLoginClick = () => {
    history.push('/landing');
  };

  return (
    <IonPage>
        <div className="form-wrapper flex justify-center items-center h-full bg-gradient-to-r from-blue-50 via-blue-100 to-green-50"> {/* Background gradient */}
          <div className="w-11/12 max-w-lg shadow-lg p-6 bg-white rounded-lg">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-4xl font-extrabold text-blue-600 tracking-wide">
                Welcome <span className="text-green-500">USER</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg md:text-xl font-light italic">
                How would you like to continue?
              </p>
            </div>
            <div className="w-full space-y-4">
              <button
                onClick={handleLoginClick}
                className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Continue with Login
              </button>

              <button
                onClick={handleWithoutLoginClick}
                className="w-full py-3 text-lg bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Continue without Login
              </button>
            </div>
          </div>
        </div>
    </IonPage>
  );
};

export default UserChoiceComponent;
