import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { User, Send } from "lucide-react";

const App = () => {
  const [step, setStep] = useState("register"); // 'register' or 'chat'
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    interests: "",
    photo: "",
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStep("chat");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const botGender = formData.gender === "male" ? "female" : "male";

    setMessages([
      ...messages,
      { text: newMessage, sender: "user" },
      {
        text: getBotResponse(newMessage, botGender),
        sender: "bot",
      },
    ]);
    setNewMessage("");
  };

  const getBotResponse = (message, botGender) => {
    const responses = {
      male: [
        "Merhaba, profiliniz çok etkileyici görünüyor!",
        "İlgi alanlarınız gerçekten ilginç. Daha fazla bahseder misiniz?",
        "Boş zamanlarınızda neler yapmaktan hoşlanırsınız?",
        "Harika bir sohbet oldu, başka neler paylaşmak istersiniz?",
      ],
      female: [
        "Profilinizi inceledim, çok hoş görünüyor!",
        "Paylaştığınız ilgi alanları dikkatimi çekti. Biraz daha anlatır mısınız?",
        "Hafta sonları genelde neler yaparsınız?",
        "Bu konuşma çok keyifli, devam edelim mi?",
      ],
    };

    return responses[botGender][
      Math.floor(Math.random() * responses[botGender].length)
    ];
  };

  if (step === "register") {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-center">
            Flört Uygulamasına Hoş Geldiniz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Adınız"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Yaşınız"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                required
                className="w-full"
              />
            </div>
            <div>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
              >
                <option value="">Cinsiyet Seçin</option>
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
              </select>
            </div>
            <div>
              <Input
                placeholder="İlgi Alanlarınız"
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.files[0] })
                }
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Sohbete Başla
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10 h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-6 h-6" />
          {formData.gender === "male" ? "Bayan" : "Bay"} ile sohbet
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto flex flex-col">
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
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default App;
