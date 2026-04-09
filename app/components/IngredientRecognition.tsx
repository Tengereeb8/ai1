"use client";

import { RotateCw, Sparkles, Image } from "lucide-react";

import { useState } from "react";
import { geminiTextToText } from "../image/recognizeIngredient";

export default function IngredientRecognition() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const getRecognition = async () => {
    const img = await geminiTextToText(prompt);

    if (img) {
      setImageUrl(img);
    }
  };

  const clear = () => {
    setPrompt("");
    setImageUrl("");
  };

  return (
    <div className="my-8 flex flex-col gap-4">
      <div className="flex w-145 justify-between gap-4">
        <div className="flex gap-2">
          <Sparkles />
          <h1 className="text-xl font-semibold">Ingredient Recognition</h1>
        </div>
        <button
          className="py-2 px-3 rounded-md border border-[#E4E4E7]"
          onClick={clear}
        >
          <RotateCw className="w-5" />
        </button>
      </div>
      <p className="text-[#71717A] text-sm">
        Describe the food, and AI will detect the ingredients.
      </p>
      <input
        value={prompt}
        className="flex justify-start w-145 h-34 bg-[#FFFFFF] border border-[#E4E4E7] px-3 py-2 rounded-md overflow-y-auto text-wrap"
        placeholder="Орц тодорхойлох"
        onChange={(event) => {
          setPrompt(event.target.value);
        }}
      />

      <div className="flex justify-end relative left-45">
        <button
          onClick={getRecognition}
          className="px-4 py-2 bg-[#18181B] rounded-md text-white "
        >
          Recognize
        </button>
      </div>
      <div className="flex gap-2">
        <Image className="size-6" />
        <h1 className="text-xl font-semibold">Identified Ingredients</h1>
      </div>
      <div className="w-fit h-fit">
        <p className="text-[#71717A] text-sm">
          First, enter your text to recognize an ingredients.
        </p>
      </div>
    </div>
  );
}
