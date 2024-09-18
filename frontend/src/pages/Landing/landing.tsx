import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
} from "@ionic/react";
import {
  calendar,
  bed,
  water,
  fitness,
  person,
  notifications,
  logOut,
} from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ChatbotComponent from "../../components/chatbot";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../theme/tailwind.css";

const services = [
  { name: "OPD Booking", icon: calendar, color: "primary", route: "/book-opd" },
  {
    name: "Bed Availability",
    icon: bed,
    color: "success",
    route: "/bedavailability",
  },
  { name: "Blood Bank", icon: water, color: "danger", route: "/bloodbank" },
  {
    name: "Vaccination Tracking",
    icon: fitness,
    color: "warning",
    route: "/vaccination",
  },
  {
    name: "Lab Management",
    icon: fitness,
    color: "warning",
    route: "/labmanagement",
  },
  {
    name: "Inventory Management",
    icon: fitness,
    color: "warning",
    route: "/inventory",
  },
  {
    name: "Staff Availability",
    icon: fitness,
    color: "warning",
    route: "/staff",
  },
];

const carouselItems = [
  {
    title: "Welcome to City Hospital",
    description: "Your health is our priority",
    imageUrl: "/assets/slider1.png", // Add your custom image URL here
  },
  {
    title: "COVID-19 Updates",
    description: "Stay informed about our latest protocols",
    imageUrl: "/assets/slider2.avif", // Add your custom image URL here
  },
  {
    title: "New Pediatric Wing",
    description: "Now open for appointments",
    imageUrl: "/assets/slider3.jpg", // Add your custom image URL here
  },
];

const UserDashboard: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button routerLink="/dashboard">
              <IonIcon icon={person} slot="start" />
              <IonMenuToggle>
                <IonLabel>Profile</IonLabel>
              </IonMenuToggle>
            </IonItem>
            <IonItem button routerLink="notifications">
              <IonIcon icon={notifications} slot="start" />
              <IonMenuToggle>
                <IonLabel>Notifications</IonLabel>
              </IonMenuToggle>
            </IonItem>
            <IonItem button>
              <IonIcon icon={logOut} slot="start" />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
          >
            {carouselItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="swiper-slide-content ion-padding"
                  style={{
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundImage: `url(${item.imageUrl})`, // Use dynamic image URL here
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "8px",
                  }}
                >
                  <h2 style={{color:"white"}}>{item.title}</h2>
                  <p style={{color:"white"}}>{item.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <h2 className="ion-padding-top ">Our Services</h2>
          <IonGrid>
            <IonRow>
              {services.map((service) => (
                <IonCol size="6" sizeMd="3" key={service.name}>
                  <IonCard
                    button={true}
                    routerLink={service.route}
                    className="h-40"
                  >
                    <IonCardHeader>
                      <IonIcon
                        icon={service.icon}
                        color={service.color}
                        style={{ fontSize: "48px" }}
                      />
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>{service.name}</IonCardTitle>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          <ChatbotComponent />
        </IonContent>
      </IonPage>
    </>
  );
};

export default UserDashboard;
