import React, { useState } from "react";
import { LuSend } from "react-icons/lu";

import { FaCopy } from "react-icons/fa";
export default function TextProcessingInterface() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [language, setLanguage] = useState("en");
  const [TheDetectedLanguage, setTheDetectedLanguage] = useState({
    language: null,
    confidence: null,
  });
  const [summary, setSummary] = useState(null);
  const [translatedText, setTranslatedText] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      setOutputText(inputText);
      setInputText("");
      await detectLanguage(inputText);
    } catch (err) {
      setError(err.message || "Error processing text.");
    } finally {
      setLoading(false);
    }
  };

  const detectLanguage = async (text) => {
    if (!("ai" in self && "languageDetector" in self.ai)) {
      setError("Language Detector API not supported.");
      return;
    }
    try {
      const languageDetector = await self.ai.languageDetector.create();
      const results = await languageDetector.detect(text);

      if (results && results.length > 0) {
        const topResult = results[0];
        const detectedLanguage = topResult.detectedLanguage;
        const confidence = Math.round(topResult.confidence * 100);

        if (setTheDetectedLanguage) {
          setTheDetectedLanguage({
            language: detectedLanguage,
            confidence: confidence,
          });
        }


        return { language: detectedLanguage, confidence: confidence };
      } else {
        setError("No language detected.");
        console.error("No language detected.");
        return null;
      }
    } catch (err) {
      const errorMessage = err.message || "Error detecting language.";
      if (setError) {
        setError(errorMessage);
      }
      console.error(errorMessage);
      return null;
    }
  };

  const summarizeText = async () => {
    setLoading(true);
    setError(null);

    try {
      const summarizer = await self.ai.summarizer.create();
      console.log("Text being summarized:", outputText);
      console.log("Starting summarization...");

      const summaryResult = await summarizer.summarize(outputText);

      if (summaryResult) {
        setSummary(summaryResult);
      } else {
        setError("Summarization returned no result.");
      }
    } catch (err) {
      setError(err.message || "Error summarizing text.");
      console.error("Summarization error:", err);
    } finally {
      setLoading(false);
    }
  };

  const replaceWithSummary = () => {
    if (summary) {
      setOutputText(summary);
      setSummary(null);
    }
  };

  const translateText = async () => {
    setLoading(true);
    setError(null);
    if (outputText.length > 150) {
      setError(
        "Text is more than 150 characters. Summarize before translating."
      );
      setLoading(false);
      return;
    }
    if (!("ai" in self && "translator" in self.ai)) {
      setError("Translator API not supported.");
      setLoading(false);
      return;
    }
    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: TheDetectedLanguage.language || "en",
        targetLanguage: language,
      });
      const translated = await translator.translate(outputText);
      setTranslatedText(translated);
    } catch (err) {
      setError(err.message || "Error translating text.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    console.log(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const clearMessage = () => {
    setOutputText("");
  };
  const wordCount = inputText.length;
  const outputWords = outputText.length;

  const languageMap = {
    en: "English",
    es: "Spanish",
    fr: "French",
    pt: "Portuguese",
    ru: "Russian",
    tr: "Turkish",
  };

  return (
    <div className="flex flex-col justify-end border border-blue-500 max-w-full mx-auto p-2 shadow-xl bg-pink-100 min-h-screen relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-200 bg-opacity-60 backdrop-blur-md z-50">
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg">
            <div className="flex space-x-2">
              <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce delay-300"></div>
            </div>
            <p className="mt-4 text-green-500 text-lg font-semibold text-center">
              Loading... Please wait a few seconds.
            </p>
          </div>
        </div>
      )}
      {outputText && (
       <div className=" flex justify-end w-full">
       <div className="border border-green-300 shadow-lg p-3 mt-5 rounded-xl mx-5 bg-blue-100 max-w-[500px]">
         <h1 className="flex justify-center w-full text-[20px] font-bold underline decoration-wavy font-[open_sans] ">
           Results of the output
         </h1>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              <div className="shadow-lg shadow-green-100/50 p-4 border border-green-400 rounded-lg bg-transparent  relative">
                <span className="absolute top-0 right-0 p-2">
                  {outputWords} characters
                </span>
                {summary && (
                  <div className="mb-3 p-3 bg-blue-100 rounded-lg">
                    <p className="text-blue-600 font-medium">{summary}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition"
                        onClick={summarizeText}
                      >
                        Summarize Again
                      </button>
                      <button
                        className="p-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition"
                        onClick={replaceWithSummary}
                      >
                        Replace Text
                      </button>
                    </div>
                  </div>
                )}
                <p className=" font-[Open_Sans]  text-gray-800 text-lg font-semibold cursor-pointer pt-3">
                  {outputText}
                </p>

                {TheDetectedLanguage.language && (
                  <>
                    <p className="text-pink-500 italic mt-3">
                      Confidence at{" "}
                      <span className="text-green-500">
                        {TheDetectedLanguage.confidence}%
                      </span>{" "}
                      that the text input is in{" "}
                      <span className="text-green-500">
                        {languageMap[TheDetectedLanguage.language] ||
                          TheDetectedLanguage.language}
                      </span>{" "}
                    </p>
                  </>
                )}
                {outputText.length > 150 &&
                  TheDetectedLanguage.language === "en" &&
                  !summary && (
                    <button
                      className="mt-2 p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition"
                      onClick={summarizeText}
                    >
                      Summarize
                    </button>
                  )}

                <div className="mt-3 flex gap-3 items-center">
                  <div className="relative w-48 mt-2">
                    <select
                      className="w-full p-2 border rounded-lg bg-white text-gray-700 shadow-sm appearance-none cursor-pointer "
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="pt">Portuguese</option>
                      <option value="es">Spanish</option>
                      <option value="ru">Russian</option>
                      <option value="tr">Turkish</option>
                      <option value="fr">French</option>
                    </select>

                    <span className="absolute right-3 top-2 text-gray-500 pointer-events-none">
                      ▼
                    </span>
                  </div>

                  <button
                    className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-300 shadow-md ${
                      outputText.length > 150
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 active:scale-95"
                    }`}
                    onClick={translateText}
                    disabled={outputText.length > 150}
                  >
                    Translate
                  </button>
                </div>

                {translatedText && (
                  <p className="mt-4 text-green-600 font-medium">
                    The input text in{" "}
                    <span className="text-gray-600">
                      {languageMap[language] || language}
                    </span>{" "}
                    is : <span className="text-pink-500">{translatedText}</span>
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span
                  className="flex border justify-center hover:cursor-pointer hover:bg-pink-400 border border-pink-200 shadow-lg rounded-xl items-center gap-2 p-2"
                  onClick={copyToClipboard}
                >
                  <FaCopy /> Copy
                </span>
                {copied && (
                  <p className="text-green-500 text-sm">Copied to clipboard!</p>
                )}

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  onClick={clearMessage}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center mt-3 shadow-lg">
        <div className="relative w-[80%] md:w-[60%] h-[150px] p-4">
          <textarea
            className="shadow-md p-4 w-full h-full border rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-pink-400"
            placeholder="Enter text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <span className="absolute bottom-2 right-6 text-gray-500 text-sm p-4">
            {wordCount} characters
          </span>
        </div>
        <button
          className="h-[60px] p-4 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition mt-3"
          onClick={handleSend}
          disabled={loading}
        >
          {outputText ? "Clear First" : <LuSend />}
        </button>
      </div>
<p className="w-full flex justify-center text-[12px] text-green-600">Enter more than 150 characters to access summarise</p>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}
