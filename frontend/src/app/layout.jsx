import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "E Health Nexus - Your Healthcare Partner",
    description: "Connect with doctors, schedule appointments, and manage your health seamlessly.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <body className="min-h-screen bg-white font-sans antialiased">
                <Toaster position="top-center" />
                {children}
            </body>
        </html>
    );
}