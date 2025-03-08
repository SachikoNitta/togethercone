"use client";
import { useState } from "react";

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerComplete, setAnswerComplete] = useState(false);
  const [completeQuestion, setCompleteQuestion] = useState("");

  const askAI = async () => {
    if (!question.trim()) return; // Prevent empty submissions
    setAnswer("Thinking... 🤔"); // Show loading message

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        setAnswer(`❌ Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const textResponse = await response.text();
      if (!textResponse) {
        setAnswer("❌ Error: Empty response from API");
        return;
      }

      const result = JSON.parse(textResponse);
      setAnswer(result.answer || "No answer received.");
      setAnswerComplete(true);
      setCompleteQuestion(result.question || "No question received");

    } catch (error) {
      setAnswer(`❌ Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        🔎 Together AIに質問する
      </h1>

      {/* ❓ 質問入力 */}
      <section className="mb-6 p-6 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">💬 質問を入力</h2>
        <p className="text-gray-600 mb-4">Together AIに聞きたい質問を入力してください。</p>

        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full h-14 p-4 text-lg border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </section>

      {/* 🚀 AIに質問ボタン */}
      <section className="mb-6 text-center">
        <button
          onClick={askAI}
          disabled={!question.trim()}
          className={`w-full px-6 py-5 rounded-lg font-bold text-xl shadow-lg transition-all duration-300
            ${question.trim()
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          🔎 質問する
        </button>
      </section>

      {/* 🤖 AIの回答 */}
      {answer && (
        <section className="mb-6 p-6 bg-gray-50 shadow-md rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">🤖 AIの回答</h2>
          <p className="text-lg text-gray-600">{answer}</p>
        </section>
      )}

      {/* 📌 AIに送った質問 */}
      {completeQuestion && (
        <section className="mb-6 p-6 bg-gray-50 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">📌 TogetherConeがAIに送った質問</h2>
          <p className="text-lg text-gray-600">{completeQuestion}</p>
        </section>
      )}

      {/* 💡 AI回答向上のヒント */}
      {answerComplete && (
        <section className="p-6 bg-gray-50 shadow-md rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">💡 回答を向上させるためのヒント</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>📌 インデックスに保存するドキュメントの長さを調整する</li>
            <li>📌 使用する Together AI の LLM モデルを変更する</li>
          </ul>
        </section>
      )}
    </div>
  );
    
}