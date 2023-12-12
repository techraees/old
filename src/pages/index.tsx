// pages/index.tsx
import React, { useEffect, useState } from "react";
import DataTable from "../components/Datatable";
import UserForm from "../components/UserForm";

const Home: React.FC = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserID, setDeleteUserId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  const handleAddUser = async (userData) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setData([...data, newUser]);
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async (userData) => {
    if (!selectedUser) {
      console.error("No user selected for editing.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        const updatedData = data.map((user) =>
          user._id === updatedUser.id ? updatedUser : user
        );
        setData(updatedData);
        setSelectedUser(null);
      } else {
        console.error("Error editing user:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserID) {
      console.error('No user selected for deletion.');
      return;
    }

    try {
      const response = await fetch(`/api/users/${deleteUserID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = data.filter((user) => user._id !== deleteUserID);
        setData(updatedData);
        setSelectedUser(null);
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFormSubmit = selectedUser ? handleEditUser : handleAddUser;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">User Data</h1>
      <DataTable
        data={data}
        onEdit={(user) => {
          setSelectedUser(user);
        }}
        onDelete={(id) => {
          setDeleteUserId(id);
          handleDeleteUser();
        }}
        // Add onDelete and other relevant props as needed
      />
      <UserForm onSubmit={handleFormSubmit} initialData={selectedUser} />
    </div>
  );
};

export default Home;
