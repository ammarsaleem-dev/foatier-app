import { Head, router } from "@inertiajs/react";

export default function Dashboard({ auth }) {
  return (
    <>
      <Head title="Dashboard" />
      {/* <h1 className="text-2xl font-semibold text-gray-800">Welcome, {auth.user.name}</h1> */}
      {/* Example widgets or stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">Widget 1</div>
        <div className="bg-white p-4 rounded-xl shadow">Widget 2</div>
        <div className="bg-white p-4 rounded-xl shadow">Widget 3</div>
        <div className="bg-white p-4 rounded-xl shadow">Widget 4</div>
      </div>
    </>
  );
}
