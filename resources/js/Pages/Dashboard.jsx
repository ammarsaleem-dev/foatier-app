import useAuth from "../Components/hooks/useAuth";

export default function Dashboard() {
  const { hasRole } = useAuth();

  if (!hasRole("admin")) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <div className="bg-white p-4 rounded-xl shadow">Widget 1</div>
      <div className="bg-white p-4 rounded-xl shadow">Widget 2</div>
      <div className="bg-white p-4 rounded-xl shadow">Widget 3</div>
      <div className="bg-white p-4 rounded-xl shadow">Widget 4</div>
    </div>
  );
}
