import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { User, Send } from "lucide-react";

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

  const renderRegisterForm = () => (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Welcome to the Dating App</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="number"
            placeholder="Your age"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            required
            className="w-full"
          />
          <select
            className="w-full p-2 border rounded-md"
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <Input
            placeholder="Fields of Interest"
            value={formData.interests}
            onChange={(e) => handleInputChange("interests", e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleInputChange("photo", e.target.files[0])}
            className="w-full"
          />
          <Button type="submit" className="w-full">Start Chat</Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderChat = () => (
    <Card className="w-full max-w-md mx-auto mt-10 h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-6 h-6" />
          {formData.gender === "male" ? "Bayan" : "Bay"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return step === "register" ? renderRegisterForm() : renderChat();
};

export default App;
