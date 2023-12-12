// components/UserForm.tsx
import React, { useState, useEffect } from "react";

interface UserFormProps {
  onSubmit: (userData: { name: string; email: string; age: number }) => void;
  initialData?: { name: string; email: string; age: number };
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [age, setAge] = useState(
    initialData?.age ? initialData.age.toString() : ""
  );

  useEffect(() => {
    // Update form fields if initialData changes (e.g., when editing)
    setName(initialData?.name || "");
    setEmail(initialData?.email || "");
    setAge(initialData?.age ? initialData.age.toString() : "");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, age: parseInt(age, 10) });
    // Reset form fields
    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl ml-auto mt-10">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="age"
        >
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
