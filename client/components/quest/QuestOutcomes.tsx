import { QuestOutcome } from "@/lib/types";
import { motion } from "framer-motion";

interface QuestOutcomeProps {
  outcome: QuestOutcome;
  onNextStage: () => void;
  loading: boolean;
}

const QuestOutcomes = ({ outcome, onNextStage, loading } : QuestOutcomeProps) => {
  // Helper function to determine styles based on outcomeStatus
  const getStatusStyles = () => {
    switch(outcome.outcome.outcomeStatus) {
      case "success":
        return {
          border: "border-yellow-500 shadow-lg shadow-yellow-900/20",
          background: "linear-gradient(rgba(26, 54, 18, 0.8), rgba(38, 83, 28, 0.9))",
          title: "TRIUMPH!",
          titleColor: "text-yellow-300",
          titleShadow: "0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.4)",
          gradient: "linear-gradient(90deg, transparent, #DAA520, transparent)",
          messageBox: "bg-green-900 bg-opacity-20 border border-green-800",
          message: "The fates have smiled upon your endeavor!",
          rewardBg: "bg-green-900/30",
          rewardBorder: "border-yellow-600"
        };
      case "partial":
        return {
          border: "border-amber-500 shadow-lg shadow-amber-900/20",
          background: "linear-gradient(rgba(42, 42, 18, 0.8), rgba(70, 60, 28, 0.9))",
          title: "MIXED FORTUNE",
          titleColor: "text-amber-300",
          titleShadow: "0 0 10px rgba(255, 191, 0, 0.7), 0 0 20px rgba(255, 191, 0, 0.4)",
          gradient: "linear-gradient(90deg, transparent, #B8860B, transparent)",
          messageBox: "bg-amber-900 bg-opacity-20 border border-amber-800",
          message: "Fortune smiles, yet shadows linger on your path.",
          rewardBg: "bg-amber-900/30",
          rewardBorder: "border-amber-600"
        };
      case "failure":
        return {
          border: "border-gray-700 shadow-lg shadow-red-900/20",
          background: "linear-gradient(rgba(54, 18, 18, 0.8), rgba(83, 28, 28, 0.9))",
          title: "DEFEAT",
          titleColor: "text-red-300",
          titleShadow: "0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.4)",
          gradient: "linear-gradient(90deg, transparent, #8B0000, transparent)",
          messageBox: "bg-red-900 bg-opacity-20 border border-red-800",
          message: "Fortune has turned against you this day.",
          rewardBg: "bg-red-900/30",
          rewardBorder: "border-red-800"
        };
      default:
        return {
          border: "border-gray-700 shadow-lg shadow-gray-900/20",
          background: "linear-gradient(rgba(30, 30, 30, 0.8), rgba(50, 50, 50, 0.9))",
          title: "UNCERTAIN",
          titleColor: "text-gray-300",
          titleShadow: "0 0 10px rgba(200, 200, 200, 0.7), 0 0 20px rgba(200, 200, 200, 0.4)",
          gradient: "linear-gradient(90deg, transparent, #708090, transparent)",
          messageBox: "bg-gray-900 bg-opacity-20 border border-gray-800",
          message: "The outcome remains shrouded in mystery.",
          rewardBg: "bg-gray-900/30",
          rewardBorder: "border-gray-700"
        };
    }
  };

  const styles = getStatusStyles();

  // Helper to render stat changes
  const renderStatChanges = () => {
    if (!outcome.outcome.rewards?.statChange) return null;
    
    const changes = outcome.outcome.rewards.statChange;
    const statEntries = Object.entries(changes).filter(([_, value]) => value > 0);
    
    if (statEntries.length === 0) return null;
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
        {statEntries.map(([stat, value]) => (
          <div key={stat} className={`flex items-center gap-2f p-2 rounded ${styles.rewardBg} border ${styles.rewardBorder}`}>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-opacity-30 mr-2">
              {getStatIcon(stat)}
            </div>
            <div>
              <p className="capitalize text-white text-sm font-semibold">{stat}</p>
              <p className="text-green-300 text-xs font-bold">+{value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Helper to get appropriate icon for each stat
  const getStatIcon = (stat: string) => {
    switch(stat.toLowerCase()) {
      case 'strength':
        return "💪";
      case 'agility':
        return "🏃";
      case 'intellect':
        return "🧠";
      case 'charisma':
        return "💫";
      case 'luck':
        return "🍀";
      default:
        return "✨";
    }
  };

  return (
    <motion.div
      key="outcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-4"
    >
      <div
        className={`sm:p-6 p-3 rounded-lg relative overflow-hidden ${styles.border}`}
        style={{
          background: styles.background,
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
            className={`font-bold text-2xl mb-1 ${styles.titleColor}`}
            style={{
              textShadow: styles.titleShadow,
            }}
          >
            {styles.title}
          </h3>

          <div
            className="w-24 h-1 mx-auto rounded"
            style={{
              background: styles.gradient,
            }}
          ></div>
        </div>

        <p className="text-gray-200 mb-4 italic font-medium leading-relaxed">
          {outcome.outcome.description}
        </p>

        {/* Rewards Section */}
        {outcome.outcome.rewards && (
          <div className="mt-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-1 bg-yellow-600 rounded-full mr-2"></div>
              <h4 className="text-yellow-300 font-bold text-lg">REWARDS</h4>
              <div className="w-8 h-1 bg-yellow-600 rounded-full ml-2"></div>
            </div>
            
            {/* XP Reward */}
            {outcome.outcome.rewards.xp > 0 && (
              <div className={`p-3 rounded ${styles.rewardBg} border ${styles.rewardBorder} mb-3 flex items-center`}>
                <div>
                  <p className="text-white font-bold">Experience Gained</p>
                  <p className="text-yellow-300 font-bold text-xl">+{outcome.outcome.rewards.xp} XP</p>
                </div>
              </div>
            )}
            
            {/* Stat Changes */}
            {renderStatChanges()}
          </div>
        )}

        <div className={`mt-4 p-3 rounded ${styles.messageBox}`}>
          <p className="text-white text-sm">
            {styles.message}
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