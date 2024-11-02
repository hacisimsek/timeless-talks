import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User, Send, Loader } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
console.log("API Key:", apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

const RenderChat = ({ userProfile, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateSystemPrompt = (userProfile) => {
    const oppositeGender = userProfile.gender === "male" ? "female" : "male";
    return `You are a ${oppositeGender} chat bot.
    Chatting with: ${userProfile.name},
    Age: ${userProfile.age},
    Interests: ${userProfile.interests}.
    Speak in English, be flirtatious, kind, and attentive.
    Keep your responses short and friendly.
    Engage in conversation based on their interests.`;
  };

  const generateAIResponse = async (userMessage) => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = generateSystemPrompt(userProfile) + " " + userMessage;
      const result = await model.generateContent(prompt);
      return result.response.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Google Generative AI Error:", error);
      return "Sorry, an error occurred. Could you try again?";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userProfile) return;

    const userMsg = {
      text: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    const aiResponse = await generateAIResponse(newMessage);
    const aiMsg = {
      text: aiResponse,
      sender: "ai",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-6 h-6" />
              Your AI Chat Partner
            </div>
            <Button variant="outline" size="sm" onClick={onBack}>
              Go Back
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto flex flex-col p-4">
          <div className="flex-1 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
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
          <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RenderChat;
