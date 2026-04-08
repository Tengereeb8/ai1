// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [imageB64, setImageB64] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     if (!prompt) return;
//     setLoading(true);
//     try {
//       const res = await fetch("/api/ai", {
//         // ← was /api/generate
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await res.json(); // only read once

//       if (!res.ok) {
//         console.error("Server error:", data);
//         throw new Error(data.error || "Server error");
//       }

//       setImageB64(data.image);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   return (
//     <main>
//       <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
//         Chef AI <span style={{ opacity: 0.5 }}>| Food Art Generator</span>
//       </h1>

//       <div style={{ display: "flex", gap: "10px", marginBottom: "2rem" }}>
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="e.g., A futuristic sushi roll with glowing neon rice..."
//           disabled={loading}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleGenerate();
//           }}
//         />

//         <button onClick={handleGenerate} disabled={loading}>
//           {loading ? "Cooking..." : "Generate Art"}
//         </button>
//       </div>
//       {imageB64 && (
//         <img
//           src={`data:image/png;base64,${imageB64}`}
//           alt="Generated"
//           style={{ marginTop: "20px", maxWidth: "400px" }}
//         />
//       )}
//     </main>
//   );
// }
// // server / app / api / ai / route.ts;

"use client";

import { useState } from "react";
import { geminiTextToImage } from "./image/getImage";

export default function ImageCreator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const getImage = async () => {
    const img = await geminiTextToImage(prompt);

    if (img) {
      setImageUrl(img);
    }
  };

  return (
    <div>
      <h1>Food image generator</h1>
      <input
        value={prompt}
        className="w-70 border border-green-600"
        onChange={(event) => {
          setPrompt(event.target.value);
        }}
      />

      <button onClick={getImage} className="border border-red-500 rounded-full">
        generate image
      </button>
      {imageUrl && <img src={imageUrl} className="w-100" />}
    </div>
  );
}
