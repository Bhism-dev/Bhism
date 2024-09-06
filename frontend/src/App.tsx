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
import InventoryManagement from './pages/InventoryManagement/InventoryManagement';
import UserDashboard from "./pages/UserDashboard/UserDashboard";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={Signup} /> 
          <Route path="/" exact={true}>
            <Redirect to="/Login" />
          </Route>
          <Route path="/bedavailability" component={BedAvailability} />
          <Route path="/labmanagement" component={LabManagementComponent} />
          <Route path="/inventory" component={InventoryManagement} />
          <Route path="/dashboard" component={UserDashboard} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
