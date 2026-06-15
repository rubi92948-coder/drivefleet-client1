import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DriveFleet",
  description: "Car rental platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        <Footer/>

      </body>
    </html>
  );
}