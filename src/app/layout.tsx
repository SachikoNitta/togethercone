import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TogetherCone",
  description: "Simple chatbot using Pinecone and Together AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col items-center">
        
        {/* 🔹 Fixed Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex justify-center items-center z-50">
          <div className="max-w-3xl flex space-x-6">
            <Link
              href="/"
              className="text-4xl px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              📖
            </Link>
            <Link
              href="/setting"
              className="text-4xl px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              🔑
            </Link>
            <Link
              href="/store"
              className="text-4xl px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              📥
            </Link>
            <Link
              href="/ask"
              className="text-4xl px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              🔎
            </Link>
          </div>
        </nav>

        {/* 🔹 Page Content */}
        <main className="w-full max-w-3xl my-20 p-6 bg-white shadow-lg rounded-lg">
          {children}
        </main>
      </body>
    </html>
  );
}