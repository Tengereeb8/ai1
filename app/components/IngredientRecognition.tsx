// "use client";

// import ReactMarkdown from "react-markdown";
// import { RotateCw, Sparkles, Image } from "lucide-react";

// import { useState } from "react";
// import { geminiTextToText } from "../image/recognizeIngredient";

// export default function IngredientRecognition() {
//   const [prompt, setPrompt] = useState("");
//   const [food, setFood] = useState("");

//   const getRecognition = async () => {
//     const respoonse = await geminiTextToText(prompt);
//     setFood(respoonse);
//   };

//   const clear = () => {
//     setPrompt("");
//   };

//   return (
//     <div className="my-8 flex flex-col gap-4">
//       <div className="flex w-145 justify-between gap-4">
//         <div className="flex gap-2">
//           <Sparkles />
//           <h1 className="text-xl font-semibold">Ingredient Recognition</h1>
//         </div>
//         <button
//           className="py-2 px-3 rounded-md border border-[#E4E4E7]"
//           onClick={clear}
//         >
//           <RotateCw className="w-5" />
//         </button>
//       </div>
//       <p className="text-[#71717A] text-sm">
//         Describe the food, and AI will detect the ingredients.
//       </p>
//       <input
//         value={prompt}
//         className="flex justify-start w-145 h-34 bg-[#FFFFFF] border border-[#E4E4E7] px-3 py-2 rounded-md overflow-y-auto text-wrap"
//         placeholder="Орц тодорхойлох"
//         onChange={(event) => {
//           setPrompt(event.target.value);
//         }}
//       />

//       <div className="flex justify-end relative left-45">
//         <button
//           onClick={getRecognition}
//           className="px-4 py-2 bg-[#18181B] rounded-md text-white "
//         >
//           Recognize
//         </button>
//       </div>
//       <div className="flex gap-2">
//         <Image className="size-6" />
//         <h1 className="text-xl font-semibold">Identified Ingredients</h1>
//       </div>
//       <div className="w-fit h-fit">
//         {food ? (
//           <ReactMarkdown>{food}</ReactMarkdown>
//         ) : (
//           <p>First, upload an image to recognize ingredients.</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import ReactMarkdown from "react-markdown";
import { RotateCw, Sparkles, Image } from "lucide-react";

import { useState } from "react";
import { geminiTextToText } from "../image/recognizeIngredient";

export default function IngredientRecognition() {
  const [prompt, setPrompt] = useState("");
  const [food, setFood] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRecognition = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await geminiTextToText(prompt);
      setFood(response);
    } catch (error) {
      console.error("Error recognizing ingredients:", error);
      setFood("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setPrompt("");
    setFood("");
  };

  const isButtonDisabled = !prompt.trim() || isLoading;

  return (
    <div className="my-8 flex flex-col gap-4">
      <div className="flex w-145 justify-between gap-4">
        <div className="flex gap-2">
          <Sparkles />
          <h1 className="text-xl font-semibold">Ingredient Recognition</h1>
        </div>
        <button
          className="py-2 px-3 rounded-md border border-[#E4E4E7] hover:bg-gray-50 transition-colors"
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
        placeholder="Describe the food or ingredients..."
        onChange={(event) => {
          setPrompt(event.target.value);
        }}
      />

      <div className="flex justify-end relative left-45">
        <button
          onClick={getRecognition}
          disabled={isButtonDisabled}
          className={`px-4 py-2 rounded-md text-white transition-colors ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#18181B] hover:bg-gray-800"
          }`}
        >
          {isLoading ? "Recognizing..." : "Recognize"}
        </button>
      </div>
      <div className="flex gap-2">
        <Image className="size-6" />
        <h1 className="text-xl font-semibold">Identified Ingredients</h1>
      </div>
      <div className="w-fit h-fit">
        {food ? (
          <ReactMarkdown>{food}</ReactMarkdown>
        ) : (
          <p>Describe a food item above to recognize its ingredients.</p>
        )}
      </div>
    </div>
  );
}
