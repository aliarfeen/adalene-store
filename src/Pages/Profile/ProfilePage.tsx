import React, { useEffect, useState } from "react";
import type { User } from "../../Types/User"; 

const STORAGE_KEY = "app_user_profile_v1";

const defaultUser: User = {
  resource: "user",
  id: "101",
  username: "User",
  email: "user@example.com",
};

const AccountDetails: React.FC = () => {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [editing, setEditing] = useState(false);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(user['avatar'] || null);
  const [form, setForm] = useState({ username: user.username, email: user.email });

  useEffect(() => {
    // persist small user object to storage (including avatar)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...user, avatar: avatarDataUrl }));
  }, [user, avatarDataUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setUser((u) => ({ ...u, username: form.username, email: form.email }));
    setEditing(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const initialLetter = (name: string) => {
    if (!name) return "U";
    return name.trim()[0].toUpperCase();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-28 h-28 rounded-full bg-[#f4e9e2] flex items-center justify-center text-3xl font-bold text-[#6a3a1b] overflow-hidden">
          {avatarDataUrl ? (
            <img src={avatarDataUrl} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span>{initialLetter(user.username || "U")}</span>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-[#4a2b0b]">{user.username}</h3>
          <p className="text-sm text-[#6b4a33]">{user.email}</p>
          <p className="text-xs text-gray-500 mt-1">ID: <span className="font-mono">{user.id}</span></p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#f0e6df]">
        <div className="flex flex-col gap-4">
          <label className="text-sm text-[#6b4a33]">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full p-3 rounded-md border ${editing ? "border-[#d8b69a]" : "border-transparent"} bg-[#fff]`}
          />

          <label className="text-sm text-[#6b4a33]">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full p-3 rounded-md border ${editing ? "border-[#d8b69a]" : "border-transparent"} bg-[#fff]`}
          />

          <label className="text-sm text-[#6b4a33]">Profile Image</label>
          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={handleFile} disabled={!editing} />
            {avatarDataUrl && <button type="button" className="text-sm text-[#a25a2a]" onClick={() => setAvatarDataUrl(null)}>Remove</button>}
          </div>

          <div className="flex gap-3 mt-4">
            {editing ? (
              <>
                <button type="button" onClick={handleSave} className="px-4 py-2 bg-[#a25a2a] text-white rounded-md">Save</button>
                <button type="button" onClick={() => { setEditing(false); setForm({ username: user.username, email: user.email }); }} className="px-4 py-2 border rounded-md">Cancel</button>
              </>
            ) : (
              <button type="button" onClick={() => setEditing(true)} className="px-4 py-2 border border-[#a25a2a] text-[#a25a2a] rounded-md">Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
