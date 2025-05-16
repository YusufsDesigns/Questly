import { Quest, QuestOption } from "@/lib/types";
import GoldenCorner from "../GoldenCorner";

export default function QuestBanner({ quest }: { quest: Quest }) {
  return (
    <div className="flex items-center justify-center w-full p-4 mb-10">
      {/* Main banner container */}
      <div className="w-full max-w-lg relative">
        {/* Dark wooden fantasy background */}
        <div
          className="absolute inset-0 rounded-lg"
        ></div>

        {/* Banner section */}
        <div className="relative">
          {/* Banner with golden border */}
          <div
            className="relative w-full p-4 pt-6 pb-4 rounded-lg flex flex-col items-center justify-center text-center"
            style={{
              background:
                "linear-gradient(rgba(73, 45, 25, 0.9), rgba(91, 58, 32, 0.9))",
              borderWidth: "4px",
              borderStyle: "solid",
              borderColor: "#DAA520",
            }}
          >
            {/* Golden corner decorations using the reusable component */}
            <GoldenCorner position="top-left" />
            <GoldenCorner position="top-right" />
            <GoldenCorner position="bottom-left" />
            <GoldenCorner position="bottom-right" />

            {/* Quest central emblem */}
            <div className="absolute -top-3">
              <div
                className="px-8 py-1 text-white font-bold text-xl"
                style={{
                  background:
                    "linear-gradient(to right, #B8860B, #DAA520, #B8860B)",
                  border: "3px solid #FFD700",
                  borderRadius: "6px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                Quest
              </div>
            </div>

            {/* Title text */}
            <div className="text-center text-white pt-3">
              <div
                className="font-bold text-xl"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
              >
                {quest?.title}
              </div>
              <div
                className="font-medium text-lg"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
              >
                Stage {quest.questStage} of {quest.totalStages}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
