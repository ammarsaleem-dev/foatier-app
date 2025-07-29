export default function Footer() {
  return (
    // <footer className="fixed bottom-0 lg:left-1/6 sm:left-1/6 min-w-screen justify-between bg-white px-6 py-4 text-sm text-gray-500  border border-gray-200">
    //   <div className="flex flex-row justify-between">
    //     <p>Foatier App Managing System © {new Date().getFullYear()} </p>
    //     <p>version 1.0.0</p>
    //   </div>
    // </footer>
    <footer className="flex flex-row justify-between bg-white px-6 py-2 border border-gray-200 text-gray-500">
      <p>Foatier App Managing System © {new Date().getFullYear()}</p>
      <p>version 1.0.0</p>
    </footer>
  );
}
