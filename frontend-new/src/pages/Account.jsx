import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";

const Account = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Account</h1>

        <div className="bg-white rounded shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Login & Security</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-600 mt-1">Email cannot be changed</p>
              </div>

              <button
                onClick={handleSave}
                className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-500"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-lg font-semibold">{user?.name}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="text-lg font-semibold">{user?.email}</p>
                <p className="text-xs text-gray-600 mt-1">
                  We'll use this email address to send you account-related notifications
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-lg font-semibold">{user?.phone || "Not provided"}</p>
              </div>
            </div>
          )}
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Addresses</h2>
            <button className="text-blue-600 hover:text-blue-800 font-bold">
              + Add New Address
            </button>
          </div>

          <p className="text-gray-600">
            No addresses found. Add a new address to get started.
          </p>
        </div>

        {/* Actions */}
        <div className="bg-white rounded shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">More Actions</h2>

          <div className="space-y-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
              📋 Your Orders
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
              💌 Your Reviews & Recommendations
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
              ❤️ Your Wishlist
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
              🔑 Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
