import { useEffect, useState } from "react";
import { api } from "../api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchUsers = async () => {
    const res = await api.get("/users", {
      params: { search, from, to }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="terminal p-6 mt-6">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className="bg-black border border-gray-700 px-3 py-2 rounded-lg"
          placeholder="Search username"
          onChange={e => setSearch(e.target.value)}
        />
        <input type="date" className="bg-black border border-gray-700 px-3 py-2 rounded-lg" onChange={e => setFrom(e.target.value)} />
        <input type="date" className="bg-black border border-gray-700 px-3 py-2 rounded-lg" onChange={e => setTo(e.target.value)} />
        <button className="btn-3d" onClick={fetchUsers}>Filter</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <a
            key={user._id}
            href={`https://www.instagram.com/${user.username}`}
            target="_blank"
            className="group bg-black border border-gray-700 rounded-xl p-4 hover:border-pink-500 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600" />
              <div>
                <p className="font-mono ig-text group-hover:underline">
                  @{user.username}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(user.createdAt).toDateString()}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
