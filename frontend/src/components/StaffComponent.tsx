import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonButtons,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
} from "@ionic/react";
import {
  checkmark,
  close,
  heart,
  pulse,
  body,
  medical,
  man,
  woman,
  person,
} from "ionicons/icons";
import "../theme/tailwind.css";

// Mock data for doctors with added degree and specialization properties
const doctors = [
  { id: 1, name: "Dr. John Doe", department: "Cardiology", availability: "Available", experience: "10 years", bio: "Specialist in cardiovascular diseases.", hospital: "City Hospital", registrationYear: 2014, degree: "MD", specialization: "Interventional Cardiology" },
  { id: 2, name: "Dr. Jane Smith", department: "Neurology", availability: "Unavailable", experience: "8 years", bio: "Expert in brain and nervous system disorders.", hospital: "Central Clinic", registrationYear: 2016, degree: "PhD", specialization: "Cognitive Neurology" },
  { id: 3, name: "Dr. Mike Johnson", department: "Pediatrics", availability: "Available", experience: "12 years", bio: "Specialized in children's healthcare.", hospital: "Greenwood Hospital", registrationYear: 2012, degree: "MD", specialization: "Neonatology" },
  { id: 4, name: "Dr. Sarah Brown", department: "Oncology", availability: "Available", experience: "7 years", bio: "Specialist in cancer treatment.", hospital: "City Hospital", registrationYear: 2017, degree: "MD", specialization: "Medical Oncology" },
  { id: 5, name: "Dr. Chris Lee", department: "Orthopedics", availability: "Unavailable", experience: "15 years", bio: "Expert in bone and joint surgery.", hospital: "Orthopedic Center", registrationYear: 2009, degree: "DO", specialization: "Joint Replacement" },
  { id: 6, name: "Dr. Emily Davis", department: "Dermatology", availability: "Available", experience: "9 years", bio: "Expert in skin treatments.", hospital: "Skin Care Clinic", registrationYear: 2015, degree: "MD", specialization: "Dermatopathology" },
  { id: 7, name: "Dr. Robert Wilson", department: "Cardiology", availability: "Unavailable", experience: "11 years", bio: "Specialist in heart surgeries.", hospital: "City Hospital", registrationYear: 2013, degree: "MD", specialization: "Electrophysiology" },
  { id: 8, name: "Dr. Lisa Anderson", department: "Neurology", availability: "Available", experience: "6 years", bio: "Expert in neurological disorders.", hospital: "Central Clinic", registrationYear: 2018, degree: "PhD", specialization: "Epileptology" },
];

const departments = [...new Set(doctors.map((doctor) => doctor.department))];
const hospitals = [...new Set(doctors.map((doctor) => doctor.hospital))];

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
    case "Dermatology":
      return woman;
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
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);

  // Active state for buttons
  const [activeAvailabilityFilter, setActiveAvailabilityFilter] = useState("*");

  const handleFilter = (type: "availability" | "department" | "hospital", value: string) => {
    if (type === "availability") {
      setActiveAvailabilityFilter(value);
    }
    setFilter((prev) => ({ ...prev, [type]: value }));
  };

  // Filter doctors based on search term and selected filters
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesAvailability =
      filter.availability === "*" ||
      doctor.availability.toLowerCase() === filter.availability;
    const matchesDepartment =
      filter.department === "*" || doctor.department === filter.department;
    const matchesHospital =
      filter.hospital === "*" || doctor.hospital === filter.hospital;
    const matchesSearchTerm =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toString().includes(searchTerm); // Include search by ID
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="text-white text-center font-bold">
            Hospital Staff Availability
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-gray-100">
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
            placeholder="Search for a doctor or ID..."
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
            className="px-2 bg-white rounded-lg shadow-md w-full mb-4"
          >
            <IonSelectOption value="*">All Departments</IonSelectOption>
            {departments.map((dept) => (
              <IonSelectOption key={dept} value={dept}>
                {dept}
              </IonSelectOption>
            ))}
          </IonSelect>

          <IonGrid>
            <IonRow>
              {filteredDoctors.map((doctor) => (
                <IonCol key={doctor.id} size="12" size-sm="6" size-md="4" size-lg="3">
                  <div className="aspect-w-1 aspect-h-1">
                    <IonCard className="h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <IonCardHeader className="bg-gray-50 p-4">
                        <IonCardTitle className="doctor-name text-lg font-semibold">
                          {doctor.name}
                        </IonCardTitle>
                        <IonCardSubtitle className="text-gray-600">
                          <IonIcon
                            icon={getIconForDepartment(doctor.department)}
                            className="mr-2"
                          />
                          {doctor.department}
                        </IonCardSubtitle>
                        <p className="text-gray-500 mt-1">
                          Registration Number: {doctor.id}
                        </p>
                        <p className="text-gray-500 mt-1">
                          Hospital: {doctor.hospital}
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
                    <p className="text-gray-600">Hospital: {selectedDoctor.hospital}</p>
                    <p className="text-gray-600">Year of Registration: {selectedDoctor.registrationYear}</p>
                    <p className="text-gray-600">Degree: {selectedDoctor.degree}</p>
                    <p className="text-gray-600">Specialization: {selectedDoctor.specialization}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-lg font-medium">
                    <IonIcon
                      icon={getIconForDepartment(selectedDoctor.department)}
                      className="mr-2"
                    />
                    {selectedDoctor.department}
                  </p>
                  <p className="text-gray-600">Experience: {selectedDoctor.experience}</p>
                </div>

                <div className="mt-4">
                  <p className="text-gray-800">{selectedDoctor.bio}</p>
                </div>
              </div>
            )}
          </IonModal>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default StaffComponent;
