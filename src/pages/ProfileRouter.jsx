import React from "react";
import { useAuth } from "../context/Authcontext";
import LearnerProfile from "./profiles/LearnerProfile";
import AdminProfile from "./profiles/AdminProfile";
import InstitutionProfile from "./profiles/InstitutionProfile";
import EmployerProfile from "./profiles/EmployerProfile";

const ProfileRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <h2>Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  // Route to appropriate profile based on role
  switch (user.role) {
    case 'Learner':
      return <LearnerProfile />;
    case 'Admin':
      return <AdminProfile />;
    case 'Institution':
      return <InstitutionProfile />;
    case 'Employer':
      return <EmployerProfile />;
    default:
      return <LearnerProfile />;
  }
};

export default ProfileRouter;
