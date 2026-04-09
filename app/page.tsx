"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageCreator from "./components/ImageCreator";
import ImageAnalysis from "./components/ImageAnazlyzer";
import IngredientRecognition from "./components/IngredientRecognition";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center mt-10 font-inter h-full">
      <h1 className="text-2xl font-bold w-100">
        I used Gemini, so my money is spent everytime you generate something.
        Please use it for testcase
      </h1>
      <Tabs defaultValue="overview" className="w-100 h-9 pt-10">
        <TabsList className="bg-[#F4F4F5] h-full flex text-lg font-bold rounded-lg font-inter">
          <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
          <TabsTrigger value="Ingredient recognition">
            Ingredient recognition
          </TabsTrigger>
          <TabsTrigger value="Image Creator">Image creator</TabsTrigger>
        </TabsList>
        <TabsContent value="Image analysis">
          <ImageAnalysis />
        </TabsContent>
        <TabsContent value="Ingredient recognition">
          <IngredientRecognition />
        </TabsContent>
        <TabsContent value="Image Creator">
          <ImageCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
