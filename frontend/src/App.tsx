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
import AuthGuard from "./components/AuthGuard";
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

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/forgotpassword" component={ForgotPassword} />

          <Route path="/" exact={true}>
            <Redirect to="/login" />
          </Route>

          <AuthGuard exact path="/landing" component={Landing} />
          <AuthGuard path="/bedavailability" component={BedAvailability} />
          <AuthGuard path="/labmanagement" component={LabManagement} />
          <AuthGuard path="/inventory" component={InventoryManagement} />
          <AuthGuard path="/dashboard" component={UserDashboard} />
          <AuthGuard path="/admin/inventory" component={AdminInventoryManagement} />
          <AuthGuard path="/admin/bedavailability" component={AdminBedAvailability} />
          <AuthGuard path="/bloodbank" component={BloodBank} />
          <AuthGuard path="/staff" component={StaffAvailability} />
          <AuthGuard path="/menu" component={Menu} />
          <AuthGuard path="/vaccination" component={Vaccination} />
          <AuthGuard path="/notifications" component={NotificationPage} />
          <AuthGuard path="/admin/staff" component={AdminStaffAvailability} />
          <AuthGuard path="/book-opd" component={OPDBooking} />
          <AuthGuard path="/chatbot" component={ChatbotComponent} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
