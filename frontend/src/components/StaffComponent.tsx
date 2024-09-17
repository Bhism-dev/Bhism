import React, { useState, useEffect } from "react";
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonCard, IonAlert, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonButtons, IonIcon, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonModal, IonSkeletonText, 
} from "@ionic/react";
import { checkmark, close, heart, pulse, body, medical, man, woman, person, peopleCircleOutline } from "ionicons/icons";
import "../theme/tailwind.css";

// TODO: Fix icons for all designations :)
const getIconForDepartment = (department: string) => {
  switch (department) {
    case "Cardiology":
      return heart;
    case "Neurology":
      return pulse;
    case "Pediatrics":
      return body;
    case "Oncology":
      return medical;
    case "Orthopedics":
      return man;
    case "HOD Gynae":
      return woman;
    case "I/c Family welfare":
      return peopleCircleOutline;
    default:
      return medical;
  }
};

const getStatusBadgeColor = (availability: string) => {
  switch (availability) {
    case "Available":
      return "bg-green-100 text-green-800";
    case "Unavailable":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const StaffComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ availability: "*", department: "*", hospital: "*" });
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [hospitals, setHospitals] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async() => {
      try{
        const response = await fetch("http://localhost:3000/doctors/doctors", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          const doctorsData = await response.json();
          setDoctors(doctorsData);

          const departmentSet = new Set<string>();
          const hospitalSet = new Set<string>();

          doctorsData.forEach((doctor: any) => {
            departmentSet.add(doctor.designation);
            hospitalSet.add(doctor.facility_posted);
          });

          setDepartments(Array.from(departmentSet));
          setHospitals(Array.from(hospitalSet));

          // console.log(`Fetched successfully`);
          // console.log("doc: ",doctors);
        } else {
          console.log(`Error fetching`);
          // setAlertMessage("Error fetching data. Please try again.");
        }
      } catch (error) {
        // console.log(`Error fetching: ${error}`);
        setAlertMessage("An error occurred. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchDoctors();
  }, []);
  // console.log("Dep: ",departments);
  // console.log("Hosp: ",hospitals);

  // Active state for buttons
  const [activeAvailabilityFilter, setActiveAvailabilityFilter] = useState("*");

  const handleFilter = (type: "availability" | "department" | "hospital", value: string) => {
    console.log("Filtering by: ", type, value);
    if (type === "availability") {
      setActiveAvailabilityFilter(value);
    }
    setFilter((prev) => ({ ...prev, [type]: value }));
    console.log("Filter: ", filter);
  };

  // Filter doctors based on search term and selected filters
  const filteredDoctors = doctors.filter((doctor:any) => {
    const matchesAvailability =
      filter.availability === "*" ||
      doctor.availability.toLowerCase() === filter.availability;
    const matchesDepartment =
      filter.department === "*" || doctor.designation === filter.department;
    const matchesHospital =
      filter.hospital === "*" || doctor.facility_posted === filter.hospital;
    const matchesSearchTerm =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toString().includes(searchTerm) || // Include search by ID 
      doctor.designation.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doctor.facility_posted.toLowerCase().includes(searchTerm.toLowerCase());  
    return (
      matchesAvailability &&
      matchesDepartment &&
      matchesHospital &&
      matchesSearchTerm
    );
  });

  const handleCloseModal = () => {
    setSelectedDoctor(null);
  };

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.setAttribute('inert', 'true');
      mainContent.setAttribute('aria-hidden', 'true');  // Added for screen readers
    }
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.removeAttribute('inert');
      mainContent.removeAttribute('aria-hidden');  // Clean up when popover is closed
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="text-white text-center font-bold">
            Hospital Staff Availability
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-gray-100" id="main-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="text-center font-bold">
              Hospital Staff Availability
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="p-4">
          <IonSearchbar
            value={searchTerm}
            onIonInput={(e) => setSearchTerm(e.detail.value!)}
            placeholder="Search"
            className="bg-white rounded-lg"
          ></IonSearchbar>

          <IonButtons className="justify-center mb-4">
            <IonButton
              onClick={() => handleFilter("availability", "*")}
              className={`mx-1 px-4 py-2 ${
                activeAvailabilityFilter === "*" ? "bg-blue-500 text-white" : "bg-white border border-gray-300 text-blue-500"
              } rounded-md`}
            >
              All
            </IonButton>
            <IonButton
              onClick={() => handleFilter("availability", "available")}
              className={`mx-1 px-4 py-2 ${
                activeAvailabilityFilter === "available" ? "bg-green-500 text-white" : "bg-white border border-gray-300 text-green-500"
              } rounded-md`}
            >
              Available
            </IonButton>
            <IonButton
              onClick={() => handleFilter("availability", "unavailable")}
              className={`mx-1 px-4 py-2 ${
                activeAvailabilityFilter === "unavailable" ? "bg-red-500 text-white" : "bg-white border border-gray-300 text-red-500"
              } rounded-md`}
            >
              Unavailable
            </IonButton>
          </IonButtons>
          <IonSelect
            interface="popover"
            placeholder="Select Hospital"
            onIonChange={(e) => handleFilter("hospital", e.detail.value)}
            onIonFocus={handlePopoverOpen}
            onIonBlur={handlePopoverClose}
            className="px-2 bg-white rounded-lg shadow-md w-full mb-4"
          >
            <IonSelectOption value="*">All Hospitals</IonSelectOption>
            {hospitals.map((hospital) => (
              <IonSelectOption key={hospital} value={hospital}>
                {hospital}
              </IonSelectOption>
            ))}
          </IonSelect>
          
          <IonSelect
            interface="popover"
            placeholder="Select Department"
            onIonChange={(e) => handleFilter("department", e.detail.value)}
            onIonFocus={handlePopoverOpen}
            onIonBlur={handlePopoverClose}
            className="px-2 bg-white rounded-lg shadow-md w-full mb-4"
          >
            <IonSelectOption value="*">All Departments</IonSelectOption>
            {departments.map((dept) => (
              <IonSelectOption key={dept} value={dept}>
                {dept}
              </IonSelectOption>
            ))}
          </IonSelect>

          {loading ? (
             <>
             {/* Skeleton for doctors list */}
             {[...Array(5)].map((_, index) => (
               <IonCard key={index}>
                 <IonCardContent>
                   <IonSkeletonText animated style={{ width: '70%' }} />
                   <IonSkeletonText animated style={{ width: '60%' }} />
                   <IonSkeletonText animated style={{ width: '40%' }} />
                   <IonSkeletonText animated style={{ width: '80%' }} />
                 </IonCardContent>
               </IonCard>
             ))}
           </>
          ): (
          <IonGrid>
            <IonRow>
              {filteredDoctors.map((doctor:any) => (
                <IonCol key={doctor.id} size="12" size-sm="6" size-md="4" size-lg="3">
                  <div className="aspect-w-1 aspect-h-1">
                    <IonCard className="h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <IonCardHeader className="bg-gray-50 p-4">
                        <IonCardTitle className="doctor-name text-lg font-semibold">
                          {doctor.name}
                        </IonCardTitle>
                        <IonCardSubtitle className="text-gray-600">
                          <IonIcon
                            icon={getIconForDepartment(doctor.designation)}
                            className="mr-2"
                          />
                          {doctor.designation}
                        </IonCardSubtitle>
                        <p className="text-gray-500 mt-1">
                          Registration Number: {doctor.id}
                        </p>
                        <p className="text-gray-500 mt-1">
                          Hospital: {doctor.facility_posted}
                        </p>
                      </IonCardHeader>
                      <IonCardContent className="p-4">
                        <div className={`flex items-center mb-2 p-2 ${getStatusBadgeColor(doctor.availability)} rounded-lg`}>
                          <IonIcon
                            icon={doctor.availability === "Available" ? checkmark : close}
                            className="mr-2"
                          />
                          <span className="font-medium">{doctor.availability}</span>
                        </div>

                        <IonButton
                          expand="block"
                          fill="outline"
                          className="mt-2"
                          onClick={() => setSelectedDoctor(doctor)}
                        >
                          View Details
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          )}

          <IonModal isOpen={!!selectedDoctor} onDidDismiss={handleCloseModal}>
            {selectedDoctor && (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <IonButton
                    fill="clear"
                    className="absolute top-4 right-4"
                    onClick={handleCloseModal}
                  >
                    <IonIcon icon={close} />
                  </IonButton>
                  <IonIcon
                    icon={person} // User icon
                    className="text-blue-500 text-5xl mr-4"
                  />
                  <div>
                    <p className="text-2xl font-semibold">{selectedDoctor.name}</p>
                    <p className="text-gray-600">ID: {selectedDoctor.id}</p>
                    <p className="text-gray-600">Hospital: {selectedDoctor.facility_posted}</p>
                    <p className="text-gray-600">Year of Registration: {selectedDoctor.registration_year}</p>
                    <p className="text-gray-600">Degree: {selectedDoctor.qualification}</p>
                    <p className="text-gray-600">Specialization: {selectedDoctor.designation}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-lg font-medium">
                    <IonIcon
                      icon={getIconForDepartment(selectedDoctor.designation)}
                      className="mr-2"
                    />
                    {selectedDoctor.department}
                  </p>
                  <p className="text-gray-600">Experience: {selectedDoctor.experience}</p>
                </div>

                {/* <div className="mt-4">
                  <p className="text-gray-800">{selectedDoctor.bio}</p>
                </div> */}
              </div>
            )}
          </IonModal>
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

export default StaffComponent;
