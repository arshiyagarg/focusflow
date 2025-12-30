import { useState } from "react";
import { Check, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { SaveButton } from "@/components/ui/SaveButton";
export function InterfaceSettings() {
  const [theme, setTheme] = useState("light");
  const [audioSpeed, setAudioSpeed] = useState([1.0]);
  const [videoSpeed, setVideoSpeed] = useState([1.0]);
  const [textSize, setTextSize] = useState("medium");

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* 1. Color Theme Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Color Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ThemeCard
            id="light"
            title="Light"
            desc="Bright and clear"
            colorClass="bg-white border-gray-200"
            previewClass="bg-gray-50"
            active={theme === "light"}
            onClick={() => setTheme("light")}
          />
          <ThemeCard
            id="dark"
            title="Dark"
            desc="Easy on the eyes"
            colorClass="bg-slate-900 border-slate-800"
            previewClass="bg-slate-800"
            active={theme === "dark"}
            onClick={() => setTheme("dark")}
            darkText // prop to handle text color on dark bg
          />
          <ThemeCard
            id="soft"
            title="Soft"
            desc="Low contrast comfort"
            colorClass="bg-[#FFFDF7] border-[#E8E6DE]"
            previewClass="bg-[#F5F2EA]"
            active={theme === "soft"}
            onClick={() => setTheme("soft")}
          />
        </div>
      </div>

      {/* 2. Playback Speed Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Playback Speed</h3>
        
        {/* Audio Slider */}
        <div className="space-y-4 p-2">
            <div className="flex justify-between items-center text-sm font-medium text-[#2C3E34]">
                <span>Audio Speed</span>
                <span className="font-mono text-muted-foreground">{audioSpeed[0]}x</span>
            </div>
            <Slider 
                defaultValue={[1.0]} 
                max={2.0} 
                min={0.5} 
                step={0.1} 
                value={audioSpeed} 
                onValueChange={setAudioSpeed}
                className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>2.0x</span>
            </div>
        </div>

        {/* Video Slider */}
        <div className="space-y-4 p-2">
            <div className="flex justify-between items-center text-sm font-medium text-[#2C3E34]">
                <span>Video Speed</span>
                <span className="font-mono text-muted-foreground">{videoSpeed[0]}x</span>
            </div>
            <Slider 
                defaultValue={[1.0]} 
                max={2.0} 
                min={0.5} 
                step={0.1} 
                value={videoSpeed} 
                onValueChange={setVideoSpeed}
                className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>2.0x</span>
            </div>
        </div>
      </div>

      {/* 3. Typography Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Typography</h3>
        <div className="space-y-3 bg-white/50 rounded-xl border border-black/5 p-2">
          <TypographyOption
            id="small"
            title="Small"
            active={textSize === "small"}
            onClick={() => setTextSize("small")}
            previewSize="text-xs"
          />
          <TypographyOption
            id="medium"
            title="Medium"
            active={textSize === "medium"}
            onClick={() => setTextSize("medium")}
            previewSize="text-base"
          />
          <TypographyOption
            id="large"
            title="Large"
            active={textSize === "large"}
            onClick={() => setTextSize("large")}
            previewSize="text-xl"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 flex items-center justify-end border-t border-gray-100">
        <SaveButton label="Save Preferences" />
      </div>
    </div>
  );
}

// --- Helper Components ---

function ThemeCard({ id, title, desc, colorClass, previewClass, active, onClick, darkText }: any) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-start text-left rounded-xl border-2 transition-all duration-200 h-32 overflow-hidden",
          active ? "border-[#6B8E78] ring-1 ring-[#6B8E78]" : "border-transparent hover:shadow-md",
          colorClass
        )}
      >
        {/* Mock Content Preview inside the card */}
        <div className={cn("w-full h-1/2 p-3", previewClass)}>
            <div className={cn("w-3/4 h-2 rounded-full mb-2 opacity-20", darkText ? "bg-white" : "bg-black")}></div>
            <div className={cn("w-1/2 h-2 rounded-full opacity-20", darkText ? "bg-white" : "bg-black")}></div>
        </div>

        <div className="p-3">
          <h4 className={cn("font-bold text-sm mb-0.5", darkText ? "text-white" : "text-[#2C3E34]")}>{title}</h4>
          <p className={cn("text-xs", darkText ? "text-slate-400" : "text-muted-foreground")}>{desc}</p>
        </div>
        
        {/* Active Checkmark */}
        {active && (
            <div className="absolute top-2 right-2 text-[#6B8E78] bg-white rounded-full p-0.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 fill-current" />
            </div>
        )}
      </button>
    );
  }

function TypographyOption({ id, title, active, onClick, previewSize }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
        active
          ? "border-[#6B8E78] bg-white shadow-sm"
          : "border-transparent hover:bg-white/60"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
            "flex items-center justify-center w-5 h-5 rounded-full border transition-colors",
            active ? "border-[#6B8E78] bg-[#6B8E78]" : "border-gray-300"
        )}>
            {active && <Circle className="w-2 h-2 fill-white text-white" />}
        </div>
        <span className="font-bold text-sm text-[#2C3E34]">{title}</span>
      </div>
      
      <span className={cn("text-muted-foreground font-serif", previewSize)}>Aa</span>
    </button>
  );
}