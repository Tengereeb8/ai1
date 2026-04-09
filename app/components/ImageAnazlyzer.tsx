"use client";

import { RotateCw, Sparkles, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { geminiAnalyzeFoodImage } from "../image/analyzeImage";
import ReactMarkdown from "react-markdown";

export default function ImageAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const analyzeImage = async () => {
    if (!file) return;
    setAnalysisResult("Analyzing...");
    try {
      const result = await geminiAnalyzeFoodImage(file);
      setAnalysisResult(result);
    } catch (err) {
      setAnalysisResult("Failed to analyze image. Please try again.");
      console.error(err);
    }
  };

  const clear = () => {
    setFile(null);
    setPreviewUrl("");
    setAnalysisResult("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="my-8 flex flex-col gap-4">
      <div className="flex w-145 justify-between gap-4">
        <div className="flex gap-2">
          <Sparkles />
          <h1 className="text-xl font-semibold">Image Analysis</h1>
        </div>
        <button
          className="py-2 px-3 rounded-md border border-[#E4E4E7] hover:bg-gray-50 transition-colors"
          onClick={clear}
        >
          <RotateCw className="w-5" />
        </button>
      </div>

      <p className="text-[#71717A] text-sm">
        Upload a food photo, and AI will detect the ingredients.
      </p>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        id="food-upload"
      />

      <label
        htmlFor="food-upload"
        className="flex items-center justify-center w-145 h-32 bg-[#FFFFFF] border-2 border-dashed border-[#E4E4E7] rounded-md cursor-pointer hover:border-gray-400 transition-all overflow-hidden"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-black font-bold">
            Click to choose{" "}
            <span className="text-[#71717a] font-inter">JPG or PNG</span>
          </span>
        )}
      </label>

      <div className="flex justify-end w-145">
        <button
          onClick={analyzeImage}
          disabled={!file}
          className="px-4 py-2 bg-[#18181B] rounded-md text-white disabled:bg-gray-400"
        >
          Analyze Food
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        <ImageIcon className="size-6" />
        <h1 className="text-xl font-semibold">Here is the summary</h1>
      </div>

      <div className="w-145 p-4 border border-[#E4E4E7] rounded-md min-h-25">
        {analysisResult ? (
          <ReactMarkdown>{analysisResult}</ReactMarkdown>
        ) : (
          <p className="text-[#71717A] text-sm ">
            {file
              ? "Ready to analyze..."
              : "First, upload an image to recognize ingredients."}
          </p>
        )}
      </div>
    </div>
  );
}
