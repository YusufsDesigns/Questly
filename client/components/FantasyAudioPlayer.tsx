// components/FantasyAudioPlayer.tsx
"use client";

import { useState, useEffect, useRef, ChangeEvent, ReactElement } from "react";
import { Play, Pause, Volume2 } from "lucide-react";// Adjust the path as necessary

export default function FantasyAudioPlayer(): ReactElement {
  const audioPath = "https://amaranth-charming-marlin-562.mypinata.cloud/ipfs/bafybeifqhue4d23oxd6jdzfhpry5qeevbpw2ikqrods5bzooyzvv5prkbi"
  console.log("Audio path received:", audioPath); // Debug log to check path
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Set initial state to true
  const [volume, setVolume] = useState<number>(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState<boolean>(false);
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Use a more specific type for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log("Creating audio element with path:", audioPath);
    // Create audio element
    const audio = new Audio(audioPath);
    audioRef.current = audio;
    audio.volume = volume;
    audio.loop = true;

    // Debug log to see if audio is loading properly
    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
    });

    const handleCanPlayThrough = (): void => {
      console.log("Audio can play through, attempting autoplay");
      setAudioLoaded(true);
      // Auto-play the audio once it's loaded
      if (audio) {
        // Try to play the audio
        const playPromise = audio.play();
        
        // Handle potential autoplay restrictions in browsers
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Autoplay started successfully
              setIsPlaying(true);
            })
            .catch(err => {
              // Autoplay was prevented
              console.warn("Autoplay was prevented by the browser:", err);
              setIsPlaying(false);
            });
        }
      }
    };
    
    audio.addEventListener("canplaythrough", handleCanPlayThrough);

    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [audioPath, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = (): void => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleVolumeControl = (): void => {
    setShowVolumeControl(!showVolumeControl);
  };

  // Animated rune circle that rotates when music is playing
  const runeCircle = (): ReactElement => (
    <div
      className={`absolute inset-0 rounded-full ${
        isPlaying ? "animate-spin-slow" : ""
      }`}
      style={{ animationDuration: "10s" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#b8860b"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
        {/* Ancient runes symbols around the circle */}
        <text x="50" y="15" textAnchor="middle" fill="#b8860b" fontSize="10">
          ᚠ
        </text>
        <text x="80" y="30" textAnchor="middle" fill="#b8860b" fontSize="10">
          ᚹ
        </text>
        <text x="85" y="55" textAnchor="middle" fill="#b8860b" fontSize="10">
          ᛒ
        </text>
        <text x="70" y="80" textAnchor="middle" fill="#b8860b" fontSize="10">
          ᛉ
        </text>
        <text x="40" y="85" textAnchor="middle" fill="#b8860b" fontSize="10">
          ᛋ
        </text>
        <text x="15" y="70" textAnchor="middle" fill="#b8860b" fontSize="10">
          ᛏ
        </text>
        <text x="10" y="40" textAnchor="middle" fill="#b8860b" fontSize="10">
          ᚢ
        </text>
        <text x="30" y="20" textAnchor="middle" fill="#b8860b" fontSize="10">
          ᚨ
        </text>
      </svg>
    </div>
  );

  return (
    <div
      className="fixed top-20 right-8 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowVolumeControl(false);
      }}
    >
      {/* Player container */}
      <div className="relative flex flex-col items-center">
        {/* Volume slider (conditionally rendered) */}
        {showVolumeControl && (
          <div className="absolute -top-24 transform -translate-x-1/2 left-1/2 glass-panel p-2 rounded-xl animate-fade-in">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-amber-400"
            />
          </div>
        )}

        {/* Main button with play/pause */}
        <button
          onClick={togglePlay}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center
                     bg-gradient-to-br from-amber-700/80 to-amber-900/80 backdrop-blur-lg 
                     border border-amber-500/30 shadow-lg transition-all duration-300
                     ${isHovered ? "scale-110 shadow-amber-500/20" : ""}`}
          disabled={!audioLoaded}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {/* Rotating rune circle */}
          {runeCircle()}

          {/* Inner content with icon */}
          <div className="relative z-10 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-amber-300" />
            ) : (
              <Play className="w-6 h-6 text-amber-300 ml-1" />
            )}
          </div>

          {/* Magical glow effect */}
          <div
            className={`absolute inset-0 rounded-full bg-amber-500/20 blur-md transition-opacity duration-500
                          ${
                            isPlaying
                              ? "opacity-100 animate-pulse"
                              : "opacity-0"
                          }`}
          ></div>
        </button>

        {/* Volume icon */}
        <button
          onClick={toggleVolumeControl}
          className={`absolute -left-8 top-1/2 transform -translate-y-1/2 p-2 rounded-full
                     bg-gradient-to-br from-amber-700/70 to-amber-900/70 backdrop-blur-lg
                     border border-amber-500/30 transition-all duration-300
                     ${isHovered ? "opacity-100" : "opacity-0"}`}
          aria-label="Volume control"
        >
          <Volume2 className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </div>
  );
}