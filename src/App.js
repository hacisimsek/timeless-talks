
import React, { useState } from "react";
import RegisterFormComponent from "./components/renderRegisterForm";
import RenderChat from "./components/renderChat"


const App = () => {
  const [step, setStep] = useState("register");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    interests: "",
    photo: "",
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStep("chat");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const botGender = formData.gender === "male" ? "female" : "male";
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, sender: "user" },
      { text: getBotResponse(newMessage, botGender), sender: "bot" },
    ]);
    setNewMessage("");
  };

  const getBotResponse = (message, botGender) => {
    const responses = {
      male: [
        "Hi, your profile looks very impressive!",
        "Your interests are really interesting. Can you tell us more about them?",
        "What do you like to do in your free time?",
        "This has been a great conversation, what else would you like to share?",
      ],
      female: [
        "I checked out your profile, it looks very nice!",
        "I noticed the interests you share. Can you tell me more about them?",
        "What do you usually do on weekends?",
        "This conversation is very enjoyable, shall we continue?",
      ],
    };
    return responses[botGender][Math.floor(Math.random() * responses[botGender].length)];
  };

  return (
    <div>
      {step === "register" ? (
        <RegisterFormComponent
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />
      ) : (
        <RenderChat
          formData={formData}
          messages={messages}
          newMessage={newMessage}
          handleSendMessage={handleSendMessage}
          setNewMessage={setNewMessage}
        />
      )}
    </div>
  );
};

export default App;
