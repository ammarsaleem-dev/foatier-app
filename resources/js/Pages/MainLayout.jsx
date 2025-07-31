import { usePage } from "@inertiajs/react";
import Breadcrumb from "../Components/UI/Navigation/Breadcrumb";
import Navbar from "../Components/UI/Navigation/Navbar";
import Sidebar from "../Components/UI/Navigation/Sidebar";
import FlashMessage from "../Components/UI/FlashMessage";
import Footer from "../Components/Layouts/Footer";

export default function MainLayout({ children }) {
  const { flash } = usePage().props; // Uncomment if you have flash messages

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <FlashMessage type={flash?.type} message={flash?.message} />
        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
         
          <div className="mt-4">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
