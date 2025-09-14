import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Office Space",
  description: "Flexible Office Space for your Lifestyle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}