import { useState } from "react";
import { api } from "../api";

export default function UserForm({ refresh }) {
  const [username, setUsername] = useState("");

  const submit = async () => {
    if (!username) return;
    try {
      await api.post("/users", { username });
      setUsername("");
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="terminal p-6 space-y-4">
      <h2 className="text-xl ig-text font-semibold">
        Add Instagram Username
      </h2>

      <div className="flex gap-3">
        <input
          className="flex-1 bg-black border border-gray-700 rounded-lg sm:px-4 py-2 outline-none focus:border-pink-500"
          placeholder="@username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button className="btn-3d" onClick={submit}>
          Add
        </button>
      </div>
    </div>
  );
}
