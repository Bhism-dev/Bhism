import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonModal, IonInput, IonItem, IonLabel, IonAlert, IonToggle, IonCheckbox, IonList, IonFooter, IonCol, IonRow
} from "@ionic/react";
import { checkmark, close, trash, pencil, add, closeSharp} from "ionicons/icons";

interface Doctor {
  id: string;
  name: string;
  qualification: string;
  designation: string;
  facility_posted: string;
  postal_address: string;
  contact_number: string;
  district: string;
  availability: string;
  [key: string]: any;
}

const AdminStaffComponent: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteCheckboxes, setShowDeleteCheckboxes] = useState(false);
  const [selectedDoctors, setSelectedDoctors] = useState<Set<string>>(new Set());
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: "",
    qualification: "",
    designation: "",
    facility_posted: "",
    postal_address: "",
    contact_number: "",
    district: "",
    availability: "Available",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:3000/doctors/doctors", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const doctorsData = await response.json();
          setDoctors(doctorsData);
        } else {
          setAlertMessage("Error fetching data. Please try again.");
        }
      } catch (error) {
        setAlertMessage("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (doctorId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/doctors/${doctorId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDoctors((prev) => prev.filter((doctor) => doctor.id !== doctorId));
        setAlertMessage("Doctor deleted successfully.");
      } else {
        setAlertMessage("Failed to delete doctor.");
      }
    } catch (error) {
      setAlertMessage("Error deleting doctor. Please try again later.");
    }
  };

  const handleToggleAvailability = async (doctorId: string, availability: boolean) => {
    try {
      const response = await fetch(`http://localhost:3000/doctors/${doctorId}/availability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability }),
      });

      if (response.ok) {
        setDoctors((prev) =>
          prev.map((doctor) =>
            doctor.id === doctorId ? { ...doctor, availability: availability ? "Available" : "Unavailable" } : doctor
          )
        );
      } else {
        setAlertMessage("Error updating availability.");
      }
    } catch (error) {
      setAlertMessage("Error updating availability. Please try again later.");
    }
  };

  const handleEditDoctor = async () => {
    if (selectedDoctor) {
      try {
        const response = await fetch(`http://localhost:3000/doctors/${selectedDoctor.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedDoctor),
        });

        if (response.ok) {
          setDoctors((prev) =>
            prev.map((doctor) => (doctor.id === selectedDoctor.id ? selectedDoctor : doctor))
          );
          setIsEditMode(false);
        } else {
          setAlertMessage("Error updating doctor.");
        }
      } catch (error) {
        setAlertMessage("Error updating doctor. Please try again later.");
      }
    }
  };

  const openDetailsModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDetailsModalOpen(true);
    setIsEditMode(false);
  };

  const closeDetailsModal = () => {
    setSelectedDoctor(null);
    setIsDetailsModalOpen(false);
  };

  const handleSelectDoctor = (doctorId: string, isChecked: boolean) => {
    setSelectedDoctors((prev) => {
      const updated = new Set(prev);
      if (isChecked) {
        updated.add(doctorId);
      } else {
        updated.delete(doctorId);
      }
      return updated;
    });
  };

  const handleDeleteSelected = () => {
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteSelected = async () => {
    setShowDeleteConfirmModal(false);

    for (const doctorId of selectedDoctors) {
      await handleDeleteDoctor(doctorId);
    }

    setSelectedDoctors(new Set()); // Clear selection after deletion
    setShowDeleteCheckboxes(false); // Hide checkboxes after deletion
  };

  const handleAddDoctor = async () => {
    try {
      const response = await fetch("http://localhost:3000/doctors/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor),
      });

      if (response.ok) {
        const addedDoctor = await response.json();
        setDoctors((prev) => [...prev, addedDoctor]);
        setAlertMessage("Doctor added successfully.");
        setNewDoctor({
          name: "",
          qualification: "",
          designation: "",
          facility_posted: "",
          postal_address: "",
          contact_number: "",
          district: "",
          state:"",
          registration_year:0,
          availability: "Available",
        });
        setIsAddModalOpen(false);
      } else {
        setAlertMessage("Error adding doctor.");
      }
    } catch (error) {
      setAlertMessage("Error adding doctor. Please try again later.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="text-white">Admin - Manage Staff</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="p-4">
      <IonRow className="mb-4">
      <IonCol size="12" sizeMd="6" className='m-0 p-0 px-1'>
        <IonButton expand="block" onClick={() => setIsAddModalOpen(true)}>
          <IonIcon icon={add} slot="start" />
          Add New Staff
        </IonButton>
        </IonCol>
        <IonCol size="12" sizeMd="6" className='m-0 p-0 px-1'>
          <IonButton
          expand="block"
          color={showDeleteCheckboxes ? "danger" : "medium"}
          onClick={() => setShowDeleteCheckboxes(!showDeleteCheckboxes)}
          className=""
        >
          <IonIcon icon={trash} slot="start" />
          {showDeleteCheckboxes ? "Cancel Deletion" : "Select Staff to Delete"}
        </IonButton>
        </IonCol>
        </IonRow>

        {showDeleteCheckboxes && (
          <IonButton expand="block" color="danger" onClick={handleDeleteSelected} className="mt-2">
            <IonIcon icon={trash} slot="start" />
            Delete Selected Staff
          </IonButton>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          doctors.map((doctor) => (
            <IonCard key={doctor.id} className="mb-4">
  <IonCardHeader>
    <IonCardTitle>{doctor.name}</IonCardTitle>
  </IonCardHeader>
  <IonCardContent>
    {showDeleteCheckboxes && (
      <IonItem>
        <IonCheckbox
          checked={selectedDoctors.has(doctor.id)}
          onIonChange={(e) => handleSelectDoctor(doctor.id, e.detail.checked)}
        />
        <IonLabel>{doctor.name}</IonLabel>
      </IonItem>
    )}
    <p>Designation: {doctor.designation}</p>
    <p>Hospital: {doctor.facility_posted}</p>

    <IonToggle
      checked={doctor.availability === "Available"}
      onIonChange={(e) => handleToggleAvailability(doctor.id, e.detail.checked)}
    >
      Availability
    </IonToggle>

    {/* Container for button with responsive classes */}
    <div className="flex flex-col items-start mt-2 lg:flex-row lg:items-center lg:justify-end">
      <IonButton onClick={() => openDetailsModal(doctor)} className="lg:ml-4">
        <IonIcon icon={checkmark} slot="start" />
        Show Details
      </IonButton>
    </div>
  </IonCardContent>
</IonCard>


          ))
        )}

        {/* Add New Staff Modal */}
        <IonModal isOpen={isAddModalOpen} onDidDismiss={() => setIsAddModalOpen(false)}>
        <IonContent className="ion-padding" style={{overflowY: 'auto' }}>
          <div className="p-4">
            <h2>Add New Staff</h2>
            <IonItem>
              {}
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput
                value={newDoctor.name}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, name: e.detail.value! })}
                placeholder="Enter name"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Qualification</IonLabel>
              <IonInput
                value={newDoctor.qualification}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.detail.value! })}
                placeholder="Enter qualification"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Designation</IonLabel>
              <IonInput
                value={newDoctor.designation}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, designation: e.detail.value! })}
                placeholder="Enter designation"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Facility Posted</IonLabel>
              <IonInput
                value={newDoctor.facility_posted}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, facility_posted: e.detail.value! })}
                placeholder="Enter facility posted"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Postal Address</IonLabel>
              <IonInput
                value={newDoctor.postal_address}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, postal_address: e.detail.value! })}
                placeholder="Enter postal address"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Contact Number</IonLabel>
              <IonInput
                value={newDoctor.contact_number}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, contact_number: e.detail.value! })}
                placeholder="Enter contact number"
              />
            
            <IonLabel position="stacked">Registration Year</IonLabel>
            <IonInput
              type="number"
              value={newDoctor.registration_year}
              onIonChange={(e) => {
                const value = e.detail.value;
                if (value && /^\d{0,4}$/.test(value)) { // Validate to accept only up to 4 digits
                  setNewDoctor({ ...newDoctor, registration_year: value });
                }
              }}
              placeholder="Enter Year"
              min="1945"
              max={new Date().getFullYear()}
            />
          </IonItem>
            <IonItem>
              <IonLabel position="stacked">District</IonLabel>
              <IonInput
                value={newDoctor.district}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, district: e.detail.value! })}
                placeholder="Enter district"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">State</IonLabel>
              <IonInput
                value={newDoctor.state}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, state: e.detail.value! })}
                placeholder="Enter state"
              />
            </IonItem>
            
            <IonItem>
              <IonLabel position="stacked">Availability</IonLabel>
              <IonInput
                value={newDoctor.availability}
                onIonChange={(e) => setNewDoctor({ ...newDoctor, availability: e.detail.value! })}
                placeholder="Enter availability"
              />
            </IonItem>

            <IonButton expand="full" onClick={handleAddDoctor} color="success" className="mt-2">
              <IonIcon icon={add} slot="start" />
              Add Staff
            </IonButton>
            <IonButton expand="full" color="medium" onClick={() => setIsAddModalOpen(false)}>
              <IonIcon icon={close} slot="start" />
              Cancel
            </IonButton>
          </div>
          </IonContent>
        </IonModal>

        {/* Doctor Details Modal */}
        {selectedDoctor && (
          <IonModal isOpen={isDetailsModalOpen} onDidDismiss={closeDetailsModal}>
        
              {/* Header with Close Icon and Title */}
              <IonHeader className='bg-white pb-0'>
              <div className="flex items-center justify-between mb-4">
                
                <h2 className="text-lg font-bold text-center flex-grow">Staff Details</h2>
                <IonButton
                  onClick={closeDetailsModal}
                  fill="clear"
                  className="text-red-500"
                  style={{ padding: '0', margin: '0', minWidth: '0', fontSize: '1.5rem' }}
                >
                  <IonIcon icon={closeSharp} />
                </IonButton>
              </div>
              </IonHeader>
          <IonContent className="" style={{ overflowY: 'auto' }}>
        
              {/* Doctor Details Fields */}
              <div className="flex flex-col space-y-4">
                {Object.entries(selectedDoctor).map(([key, value]) => {
                  const isEditable =
                    key === "qualification" ||
                    key === "designation" ||
                    key === "facility_posted" ||
                    key === "postal_address" ||
                    key === "contact_number" ||
                    key === "district" ||
                    key === "registration_year" ||
                    key === "state";
        
                  return (
                    <IonItem key={key}>
                      <IonLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</IonLabel>
                      <IonInput
                        value={value}
                        onIonChange={(e) =>
                          setSelectedDoctor((prevDoctor) => ({
                            ...prevDoctor!,
                            [key]: e.detail.value!,
                          }))
                        }
                        disabled={!isEditMode || !isEditable}
                        className="text-gray-900"
                        />
                    </IonItem>
                  );
                })}
                </div>
                </IonContent>
                <IonFooter>
                <div className="flex space-x-2 mt-4">
                  {!isEditMode ? (
                    <IonButton expand="block" onClick={() => setIsEditMode(true)} className="flex-1">
                      <IonIcon icon={pencil} slot="start" />
                      Edit
                    </IonButton>
                  ) : (
                    <IonButton expand="block" color="success" onClick={handleEditDoctor} className="flex-1">
                      Save Changes
                    </IonButton>
                  )}
                </div>
                </IonFooter>
        </IonModal>
        
        )}

        <IonAlert
          isOpen={!!alertMessage}
          onDidDismiss={() => setAlertMessage(null)}
          header="Alert"
          message={alertMessage || ""}
          buttons={["OK"]}
        />

        <IonModal
          isOpen={showDeleteConfirmModal}
          onDidDismiss={() => setShowDeleteConfirmModal(false)}
        >
          <div className="p-4">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete the selected staff members?</p>
            <IonButton expand="full" color="danger" onClick={confirmDeleteSelected}>
              Confirm Deletion
            </IonButton>
            <IonButton expand="full" color="medium" onClick={() => setShowDeleteConfirmModal(false)}>
              Cancel
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AdminStaffComponent;
