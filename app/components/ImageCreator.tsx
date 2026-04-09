"use client";

import { RotateCw, Sparkles, Image } from "lucide-react";

import { useState } from "react";
import { geminiTextToImage } from "../image/getImage";

export default function ImageCreator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const getImage = async () => {
    const img = await geminiTextToImage(prompt);

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
          <h1 className="text-xl font-semibold">Food image generator</h1>
        </div>
        <button
          className="py-2 px-3 rounded-md border border-[#E4E4E7]"
          onClick={clear}
        >
          <RotateCw className="w-5" />
        </button>
      </div>
      <p className="text-[#71717A] text-sm">
        What food image do you want? Describe it briefly.
      </p>
      <input
        value={prompt}
        className="flex justify-start w-145 h-34 bg-[#FFFFFF] border border-[#E4E4E7] px-3 py-2 rounded-md overflow-y-auto text-wrap"
        placeholder="Хоолны тайлбар"
        onChange={(event) => {
          setPrompt(event.target.value);
        }}
      />

      <div className="flex justify-end relative left-45">
        <button
          onClick={getImage}
          className="px-4 py-2 bg-[#18181B] rounded-md text-white "
        >
          Generate
        </button>
      </div>
      <div className="flex gap-2">
        <Image className="size-6" />
        <h1 className="text-xl font-semibold">Result</h1>
      </div>
      <div className="w-fit h-fit">
        {(imageUrl && <img src={imageUrl} className="w-full" />) || (
          <p className="text-[#71717A] text-sm">
            First, enter your text to generate an image.
          </p>
        )}
      </div>
    </div>
  );
}
