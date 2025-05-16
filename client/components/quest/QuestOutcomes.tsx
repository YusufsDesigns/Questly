import { QuestOutcome } from "@/lib/types";
import { motion } from "framer-motion";

interface QuestOutcomeProps {
  outcome: QuestOutcome;
  onNextStage: () => void;
  loading: boolean;
}

const QuestOutcomes = ({ outcome, onNextStage, loading } : QuestOutcomeProps) => {
  return (
    <motion.div
      key="outcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-4"
    >
      <div
        className={`sm:p-6 p-3 rounded-lg relative overflow-hidden ${
          outcome.outcome.success
            ? "border-yellow-500 shadow-lg shadow-yellow-900/20"
            : "border-gray-700 shadow-lg shadow-red-900/20"
        }`}
        style={{
          background: outcome.outcome.success
            ? "linear-gradient(rgba(26, 54, 18, 0.8), rgba(38, 83, 28, 0.9))"
            : "linear-gradient(rgba(54, 18, 18, 0.8), rgba(83, 28, 28, 0.9))",
        }}
      >
        {/* Decorative corner flourishes */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400 opacity-70"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-400 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-400 opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-400 opacity-70"></div>

        {/* Fantasy background pattern - subtle magical symbols */}
        <div
          className="absolute inset-0 opacity-5 mix-blend-overlay"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          }}
        ></div>

        <div className="text-center mb-4">
          <h3
            className={`font-bold text-2xl mb-1 ${
              outcome.outcome.success ? "text-yellow-300" : "text-red-300"
            }`}
            style={{
              textShadow: outcome.outcome.success
                ? "0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.4)"
                : "0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.4)",
            }}
          >
            {outcome.outcome.success ? "TRIUMPH!" : "DEFEAT"}
          </h3>

          <div
            className="w-24 h-1 mx-auto rounded"
            style={{
              background: outcome.outcome.success
                ? "linear-gradient(90deg, transparent, #DAA520, transparent)"
                : "linear-gradient(90deg, transparent, #8B0000, transparent)",
            }}
          ></div>
        </div>

        <p className="text-gray-200 mb-4 italic font-medium leading-relaxed">
          {outcome.outcome.description}
        </p>

        <div
          className={`mt-4 p-3 rounded ${
            outcome.outcome.success
              ? "bg-green-900 bg-opacity-20 border border-green-800"
              : "bg-red-900 bg-opacity-20 border border-red-800"
          }`}
        >
          <p className="text-white text-sm">
            {outcome.outcome.success
              ? "The fates have smiled upon your endeavor!"
              : "Fortune has turned against you this day."}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="btn-fantasy relative group overflow-hidden px-8 py-3"
          onClick={onNextStage}
          disabled={loading}
          style={{
            background: "linear-gradient(to bottom, #8B6914, #DAA520)",
            border: "2px solid #FFD700",
            borderRadius: "4px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.3), inset 0 0 6px rgba(255,215,0,0.5)",
          }}
        >
          <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          <span
            className="text-white font-medium relative z-10"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
          >
            {loading ? "Divining Fate..." : "Continue Your Journey"}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default QuestOutcomes;
