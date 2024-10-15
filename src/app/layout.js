import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ToastProvider from "../context/ToastProvider"
import Footer from "@/components/Footer/Footer";
import { UserStoreProvider } from "@/context/StoreContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Business Solutions",
  description: "A Digital Store Creator for Your Business",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >

        <UserStoreProvider>
          <ToastProvider>
              <Navbar />
              <div className="w-full max-w-7xl mx-auto h-auto min-h-[40rem] pt-14">
                {children}
              </div>
              <Footer />
          </ToastProvider>
        </UserStoreProvider>
      </body>
    </html>
  );
}
