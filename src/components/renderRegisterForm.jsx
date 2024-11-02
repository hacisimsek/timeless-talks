import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { historicalFigures } from "../constants";

const RegisterFormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    figure: ''
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
                className="w-full p-2 border rounded-md overflow-y-auto"
                style={{ maxHeight: '150px' }}
                value={formData.figure}
                onChange={(e) => setFormData({ ...formData, figure: e.target.value })}
                required
              >
                <option value="">Select Figure</option>
                {historicalFigures.map((figure) => (
                  <option key={figure.name} value={figure.name}>{figure.name}</option>
                ))}
              </select>
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
