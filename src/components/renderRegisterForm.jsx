import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const RegisterFormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    interests: '',
    photo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome to the Chat Application</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Your Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
                className="w-full"
              />
            </div>
            <div>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <Input
                placeholder="Your Interests"
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Start Chatting
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterFormComponent;
