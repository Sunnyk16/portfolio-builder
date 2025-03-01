// import localFont from "next/font/local";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Portfolio",
//   description: "My personal portfolio builder",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider>
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <div data-theme="dark" className="" >{children}
//           <ToastContainer/>
//         </div>
//       </body>
//     </html>
//     </ClerkProvider>
//   );
// }
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the application
export const metadata = {
  title: "Portfolio Builder",
  description: "Build and showcase your portfolio with ease.",
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Apply dark theme and ensure full height */}
          <div data-theme="dark" className="min-h-screen">
            {children}
            {/* Toast notifications */}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}