import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

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
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import InventoryManagement from './pages/InventoryManagement/InventoryManagement';
import AdminInventoryManagement from "./pages/InventoryManagement/AdminInventoryManagement";
import AdminBedAvailability from "./pages/BedAvailability/AdminBedAvailability";
import BloodBank from "./pages/BloodBank/BloodBank";
import StaffAvailability from "./pages/StaffAvailability/StaffAvailability";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Vaccination from "./pages/Vaccination/Vaccination";
import Landing from "./pages/Landing/landing";
import NotificationPage from "./pages/Notifications/NotificationPage";
import AdminStaffAvailability from "./pages/StaffAvailability/AdminStaffAvailability";
import OPDBooking from "./pages/OPDBooking/OPDBooking";
import ChatbotComponent from "./components/chatbot";
import LabManagement from "./pages/LabManagement/LabManagement";

import Dashboard from "./components/Admin/AdminDashboard";
import OPDDashboard from "./components/Admin/AdminData";
import Disclaimer from "./components/Disclaimer";
import Home from "./pages/Home/Home";
import UserChoice from "./pages/UserChoice/UserChoice";
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <Disclaimer />
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/userchoice" component={UserChoice} />
          <Route path="/" exact={true}>
            <Redirect to="/home" />
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
          <Route path="/vaccination" component={Vaccination} />
          <Route path="/notifications" component={NotificationPage} />
          <Route path="/admin/staff" component={AdminStaffAvailability} />
          <Route path="/book-opd" component={OPDBooking} />
          <Route path="/admindash" component={Dashboard} />
          <Route path="/admindash/data" component={OPDDashboard} />
          <Route path="/chatbot" component={ChatbotComponent} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
