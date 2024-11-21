import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Loader } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { historicalFigures } from "../constants";
import { franc } from "franc";
import ISO6391 from "iso-639-1";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const RenderChat = ({ userProfile, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("");

  const figureProfile = historicalFigures.find(
    (figure) => figure.name === userProfile.figure
  );

  const generateHistoricalFigurePrompt = () => {
    return `You are ${figureProfile.name}, a ${figureProfile.title} known for ${figureProfile.achievements}.
      You are speaking to: ${userProfile.name}, who is ${userProfile.age} years old.
      Your tone is ${figureProfile.tone}, wise, inspirational, and reflective.
      Share your knowledge, historical perspective, and vision.
      Engage in a way that educates, inspires, and draws upon your experiences in ${figureProfile.areasOfInfluence}.
      Make sure to address ${userProfile.name}'s curiosity and respond in a way that aligns with their interests and knowledge level.`;
  };

  const detectLanguage = (text) => {
    const langCode = franc(text);
    if (langCode === "und") return "No language detected";
    return ISO6391.getName(langCode) || "Unknown language";
  };

  const generateAIResponse = async (userMessage) => {
    setIsLoading(true);
    const prompt = `${generateHistoricalFigurePrompt()} ${userMessage} AI response language should be in ${language}.`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Google Generative AI Error:", error);
      return "Sorry, an error occurred. Could you try again?";
    } finally {
      setIsLoading(false);
    }
  };

  const generateAvataaarsAvatar = (options = {}) => {
    const baseUrl = "https://avataaars.io/";
    const queryString = Object.entries(options).map(([key, value]) => `${key}=${value}`).join("&");
    const avatarUrl = `${baseUrl}?${queryString}`;
    return avatarUrl;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = { text: newMessage, sender: "user", timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    if(newMessage.trim().length > 10) {
      const detectedLanguage = detectLanguage(newMessage);
      setLanguage(detectedLanguage);
    } else {
      setLanguage("");
    }

    const aiResponse = await generateAIResponse(newMessage);
    const aiMsg = { text: aiResponse, sender: "ai", timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col mx-4">
        <CardHeader className="border-b p-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={generateAvataaarsAvatar(figureProfile.avatarParams)}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="text-lg font-semibold">{figureProfile.name}</div>
            </div>
            <Button variant="outline" size="sm" onClick={onBack}>
              Go Back
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          <div className="flex-1 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 text-sm ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );  
};

export default RenderChat;
