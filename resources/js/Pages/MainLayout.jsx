import { usePage } from "@inertiajs/react";
import Footer from "../Components/Layouts/Footer";
import FlashMessage from "../Components/UI/FlashMessage";
import Navbar from "../Components/UI/Navigation/Navbar";
import Sidebar from "../Components/UI/Navigation/Sidebar";

export default function MainLayout({ children }) {
  const { flash } = usePage().props; // Uncomment if you have flash messages

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <FlashMessage type={flash?.type} message={flash?.message} />
        {/* Main content area */}
        <main className="flex-1 py-2 px-6 overflow-y-auto">
          <div className="mt-4">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
