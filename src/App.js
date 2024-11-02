
import React, { useState } from "react";
import RegisterFormComponent from "./components/renderRegisterForm";
import RenderChat from "./components/renderChat"


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('register');
  const [userProfile, setUserProfile] = useState(null);

  const handleFormSubmit = (formData) => {
    setUserProfile(formData);
    setCurrentScreen('chat');
  };

  const handleBack = () => {
    setCurrentScreen('register');
    setUserProfile(null);
  };

  return (
    currentScreen === 'register' ? (
      <RegisterFormComponent onSubmit={handleFormSubmit} />
    ) : (
      <RenderChat userProfile={userProfile} onBack={handleBack} />
    )
  );
};

export default App;
