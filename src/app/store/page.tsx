"use client";
import { useState } from "react";

export default function StorePage() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const storeData = async () => {
    if (!text.trim()) return; // Prevent empty submissions
    setStatus("Storing data... ⏳");

    try {
      const response = await fetch("/api/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        setStatus(`❌ Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const textResponse = await response.text();
      if (!textResponse) {
        setStatus("❌ Error: Empty response from API");
        return;
      }

      const result = JSON.parse(textResponse);
      setStatus(result.message || "✅ Stored successfully!");
      setText(""); // Clear input after successful storage

    } catch (error) {
      if (error instanceof Error) {
        setStatus(`❌ Error: ${error.message}`);
      } else {
        setStatus("❌ An unknown error occurred");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        📥 Pineconeにデータを保存する
      </h1>

      {/* 📂 入力エリア */}
      <section className="mb-6 p-6 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">📌 テキストを入力</h2>
        <p className="text-gray-600 mb-4">保存したいテキストを入力してください。</p>

        <textarea
          placeholder="Enter text to store..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-green-500 focus:outline-none resize-none h-60 text-lg"
        ></textarea>
        
      </section>

      {/* 🔘 保存ボタン */}
      <section className="mb-6 text-center">
        <button
          onClick={storeData}
          disabled={!text.trim()} 
          className={`w-full px-6 py-6 rounded-lg font-bold text-xl shadow-lg transition-all duration-300
            ${text.trim() 
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          📥 テキストを保存
        </button>
      </section>

      {/* 📝 ステータス表示 */}
      {status && (
        <section className="p-6 text-center">
          <p className="text-xl font-semibold text-gray-800">{status}</p>
        </section>
      )}
    </div>
  );
}