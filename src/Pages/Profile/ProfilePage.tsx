import React, { useEffect, useState } from "react";
import type { User } from "../../Types/User";
import { Button } from "../../Components/Common/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
import apiFactory from "../../Api/apiFactory";

const STORAGE_KEY = "loggedUser";
// const API_URL = "https://68e4f1f88e116898997db023.mockapi.io/data";

const AccountDetails: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ username: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // ✅ Regex validation
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/; 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[cC][oO][mM]$/;

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      setUser(parsed);
      setForm({ username: parsed.username, email: parsed.email });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!user) return;

    // ✅ Validation قبل حفظ البيانات
    if (!usernameRegex.test(form.username)) {
      toast.error("Username must start with a letter and can contain letters, numbers, and underscores (6–16 chars)");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email address");
      return;
    }

    try {
      const updatedUser = { ...user, username: form.username, email: form.email };

      // تحديث الـ API
      await apiFactory.updateResource<User>({
  ...user,
  username: form.username,
  email: form.email,
  resource: "user",
});

      // تحديث اللوكال ستورج
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);

      // إشعار الصفحات الأخرى
      window.dispatchEvent(new Event("userUpdated"));

      toast.success("✅ Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      toast.error("❌ Failed to update profile on server");
    }
  };

  const handleEditClick = () => setShowModal(true);

  const handlePasswordCheck = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const stored = JSON.parse(raw);

    if (stored.password === passwordInput) {
      setShowModal(false);
      setEditing(true);
      setPasswordInput("");
    } else {
      toast.error("❌ Incorrect password!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto relative">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#f0e6df]">
        <div className="flex flex-col gap-4">
          <label className="text-sm text-[#6b4a33]">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full p-3 rounded-md border ${
              editing ? "border-[#d8b69a]" : "border-transparent"
            } bg-[#fff]`}
          />

          <label className="text-sm text-[#6b4a33]">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full p-3 rounded-md border ${
              editing ? "border-[#d8b69a]" : "border-transparent"
            } bg-[#fff]`}
          />

          <div className="flex gap-3 mt-4">
            {editing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#a25a2a] text-white rounded-md"
                  text="Save"
                />
                <Button
                  onClick={() => {
                    setEditing(false);
                    if (user)
                      setForm({ username: user.username, email: user.email });
                  }}
                  className="px-4 py-2 border rounded-md"
                  text="Cancel"
                />
              </>
            ) : (
              <Button
                onClick={handleEditClick}
                className="px-4 py-2 border border-[#a25a2a] text-[#a25a2a] rounded-md"
                text="Edit"
              />
            )}
          </div>
        </div>
      </div>

      {/* 🔒 Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-[#5c3317] mb-3">
              Confirm Your Password
            </h2>
            <p className="text-sm text-[#6b4a33] mb-4">
              Please enter your password to edit your account details.
            </p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-[#d8b69a] rounded-md mb-4"
            />
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md"
                text="Cancel"
              />
              <Button
                onClick={handlePasswordCheck}
                className="px-4 py-2 bg-[#a25a2a] text-white rounded-md"
                text="Confirm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
