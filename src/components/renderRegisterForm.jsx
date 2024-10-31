import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const RegisterFormComponent = ({ formData, handleInputChange, handleFormSubmit }) => {
  return (
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
};

export default RegisterFormComponent;
