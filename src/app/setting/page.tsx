"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Settings() {
  // 🔹 Pinecone State
  const [pineconeKey, setPineconeKey] = useState("");
  const [pineconeIndex, setPineconeIndex] = useState("");
  const [pineconeIndexHost, setPineconeIndexHost] = useState("");

  // 🔹 Together AI State
  const [togetherApiKey, setTogetherApiKey] = useState("");
  const [togetherAiModel, setTogetherAiModel] = useState("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free");

  const [showKeys, setShowKeys] = useState(false); // 👀 Toggle key visibility

  useEffect(() => {
    setPineconeKey(Cookies.get("pineconeKey") || "");
    setPineconeIndex(Cookies.get("pineconeIndex") || "");
    setPineconeIndexHost(Cookies.get("pineconeIndexHost") || "");
    setTogetherApiKey(Cookies.get("togetherApiKey") || "");
    setTogetherAiModel(Cookies.get("togetherAiModel") || "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free");
  }, []);

  const saveKeys = () => {
    Cookies.set("pineconeKey", pineconeKey, { expires: 7 });
    Cookies.set("pineconeIndex", pineconeIndex, { expires: 7 });
    Cookies.set("pineconeIndexHost", pineconeIndexHost, { expires: 7 });
    Cookies.set("togetherApiKey", togetherApiKey, { expires: 7 });
    Cookies.set("togetherAiModel", togetherAiModel, { expires: 7 });
    alert("✅ API Keys saved in cookies!");
  };

  const maskKey = (key: string) => {
    if (!key) return "";
    if (key.length < 8) return "****";
    return key.slice(0, 4) + "..." + key.slice(-4);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        🔑 APIキーの設定
      </h1>

      {/* 🌲 Pinecone 設定 */}
      <section className="mb-6 p-6 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">🌲 Pineconeの設定</h2>
        <div className="my-6">
          <label className="text-sm font-semibold">APIキーを入力</label>
          <input
            type={showKeys ? "text" : "password"}
            placeholder="Enter Pinecone API Key"
            value={showKeys ? pineconeKey : maskKey(pineconeKey)}
            onChange={(e) => setPineconeKey(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
          />
        </div>

        <div className="my-6">
          <label className="text-sm font-semibold">インデックス名</label>
          <input
            type="text"
            placeholder="Enter Pinecone Index"
            value={pineconeIndex}
            onChange={(e) => setPineconeIndex(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
          />
        </div>

        <div className="my-6">
          <label className="text-sm font-semibold">インデックスのホスト</label>
          <input
            type="text"
            placeholder="Enter Pinecone Index Host"
            value={pineconeIndexHost}
            onChange={(e) => setPineconeIndexHost(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
          />
        </div>

        <div className="my-6">
          <details className="mt-2">
            <summary className="text-sm font-semibold text-blue-600 cursor-pointer">
              Pinecone APIキーの取得方法
            </summary>
            <ol className="list-decimal list-inside text-sm text-gray-600 mt-2">
              <li><a href="https://app.pinecone.io" target="_blank">Pinecone</a>にログインする</li>
              <li>ダッシュボードの左サイドメニューから「API keys」をクリック</li>
              <li>「Create API Key」をクリック</li>
              <li>APIキーの名前を入力し、「Create Key」をクリック</li>
            </ol>
          </details>
          <details className="mt-2">
            <summary className="text-sm font-semibold text-blue-600 cursor-pointer">
              Pinecone インデックス名&ホストの取得方法
            </summary>
            <ol className="list-decimal list-inside text-sm text-gray-600 mt-2">
              <li><a href="https://app.pinecone.io" target="_blank">Pinecone</a>にログインする</li>
              <li>ダッシュボードの左サイドメニューから「Database」をクリック</li>
              <li>インデックスを新たに作成する場合は「Create Index」からインデックスを作成</li>
              <li>「Database」の「Indexes」で使用したいインデックスのラベル（インデックス名）と「Host」（ホスト）を確認</li>
            </ol>
          </details>
        </div>
      </section>

      {/* 🤖 Together AI 設定 */}
      <section className="mb-6 p-6 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">🤖 Together AIの設定</h2>

        <div className="my-6">
          <label className="text-sm font-semibold">APIキー</label>
          <input
            type={showKeys ? "text" : "password"}
            placeholder="Enter Together AI API Key"
            value={showKeys ? togetherApiKey : maskKey(togetherApiKey)}
            onChange={(e) => setTogetherApiKey(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
          />
        </div>

        <div className="my-6">
          <label className="text-sm font-semibold">モデルID</label>
          <input
            type="text"
            placeholder="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"
            value={togetherAiModel}
            onChange={(e) => setTogetherAiModel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
          />
        </div>

        <div className="my-6">
          <details className="mt-2">
            <summary className="text-sm font-semibold text-blue-600 cursor-pointer">
              Together AI APIキーの取得方法
            </summary>
            <ol className="list-decimal list-inside text-sm text-gray-600 mt-2">
              <li><a href="https://api.together.ai" target="_blank">Together AI</a>にログインする</li>
              <li>画面右上のプロフィール画像をクリックし、「Settings」をクリック</li>
              <li>画面左サイドメニューの「API KEYS」をクリック</li>
              <li>「Together.ai user key」をコピー、もしくは「ADD KEY」から新しいAPIキーを作成</li>
            </ol>
          </details>
          <details className="mt-2">
            <summary className="text-sm font-semibold text-blue-600 cursor-pointer">
            Together AI モデルIDの取得方法
            </summary>
            <ol className="list-decimal list-inside text-sm text-gray-600 mt-2">
              <li><a href="https://api.together.ai" target="_blank">Together AI</a>にログインする</li>
              <li>画面上のナビゲーションバーから「MODELS」をクリック</li>
              <li>お好きなモデルをクリック</li>
              <li>モデルの詳細画面に書かれている「meta-llama/Llama-2-7b-chat-hf」のような文字列の横のコピーマークをクリック</li>
            </ol>
          </details>
        </div>
      </section>

      {/* 🔹 Buttons */}
      <section className="text-center">
        <div className="flex gap-4">
          <button
            onClick={() => setShowKeys(!showKeys)}
            className="w-full bg-gradient-to-r from-gray-300 to-gray-400 text-black px-4 py-5 rounded-md font-semibold hover:opacity-90 transition-all"
          >
            {showKeys ? "🔒 キーを隠す" : "👀 キーを確認する"}
          </button>

          <button
            onClick={saveKeys}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-5 rounded-md font-semibold hover:opacity-90 transition-all"
          >
            ✅ 設定を保存する
          </button>
        </div>
      </section>
    </div>
  );
}
