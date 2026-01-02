import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold ig-text">
          365 Days • Instagram User Tracker
        </h1>
      </header>
      <UserForm refresh={() => window.location.reload()} />
      <UserList />
    </div>
  );
}
