import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// import '@ionic/react/css/palettes/light.always.css';
// import '@ionic/react/css/palettes/dark.class.css';
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import "./theme/variables.css";
import LoginForm from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import BedAvailability from './pages/BedAvailability/BedAvailability.js';
import LabManagementComponent from "./components/LabManagementComponent";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import InventoryManagement from './pages/InventoryManagement/InventoryManagement';
import AdminInventoryManagement from "./pages/InventoryManagement/AdminInventoryManagement";
import AdminBedAvailability from "./pages/BedAvailability/AdminBedAvailability";
import LabManagement from "./pages/LabManagement/LabManagement";
import BloodBank from "./pages/BloodBank/BloodBank";
import StaffAvailability from "./pages/StaffAvailability/StaffAvailability";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Vaccination from "./pages/Vaccination/Vaccination";
import Landing from "./pages/Landing/landing";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={Signup} /> 
          <Route exact path="/landing" component={Landing} />
          <Route path="/" exact={true}>
            <Redirect to="/landing" />
          </Route>
          <Route path="/bedavailability" component={BedAvailability} />
          <Route path="/labmanagement" component={LabManagement} />
          <Route path="/inventory" component={InventoryManagement} />
          <Route path="/dashboard" component={UserDashboard} />
          <Route path="/admin/inventory" component={AdminInventoryManagement} />
          <Route path="/admin/bedavailability" component={AdminBedAvailability} />
          <Route path="/bloodbank" component={BloodBank} />
          <Route path="/staff" component={StaffAvailability} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/menu" component={Menu} />
          <Route path="/vaccination" component={Vaccination} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
