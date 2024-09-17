import { IonButton, IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import './landing.css'; // Custom CSS for material effect

import { Autoplay } from 'swiper/modules';

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }} // Autoplay every 3s
          loop={true}
          slidesPerView={2} // Show 3 slides at once
          spaceBetween={16} // Space between each slide
          centeredSlides={true} // Center the active slide
          watchSlidesProgress={true} // Track slide visibility for animations
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index} className="swiper-material-slide">
              <div className="swiper-material-wrapper">
                <div className="swiper-material-content">
                  <img
                    className="demo-material-image"
                    src={`https://via.placeholder.com/700x1000.png?text=Slide+${index + 1}`}
                    alt={`Slide ${index + 1}`}
                  />
                  <span className="demo-material-label">
                    Slide {index + 1}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        <IonButton routerLink="/login" expand="block">Login</IonButton>
        <IonButton routerLink="/signup" expand="block">Signup</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Landing;
