import { useState } from "react";
import { Eye, Network, List, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SaveButton } from "@/components/ui/SaveButton";
export function ContentSettings() {
  const [outputFormat, setOutputFormat] = useState("bionic");
  const [detailLevel, setDetailLevel] = useState("balanced");

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* 1. Output Format Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Output Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormatCard
            id="bionic"
            title="Bionic Reading"
            desc="Enhanced readability with bold text patterns"
            icon={<Eye className="w-5 h-5" />}
            active={outputFormat === "bionic"}
            onClick={() => setOutputFormat("bionic")}
          />
          <FormatCard
            id="flowchart"
            title="Flowchart View"
            desc="Visual diagrams and mind maps"
            icon={<Network className="w-5 h-5" />} // "Network" looks like a flowchart node
            active={outputFormat === "flowchart"}
            onClick={() => setOutputFormat("flowchart")}
          />
          <FormatCard
            id="structured"
            title="Structured Text"
            desc="Organized bullet points and sections"
            icon={<List className="w-5 h-5" />}
            active={outputFormat === "structured"}
            onClick={() => setOutputFormat("structured")}
          />
        </div>
      </div>

      {/* 2. Detail Level Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Detail Level</h3>
        <div className="space-y-3 bg-white/50 rounded-xl border border-black/5 p-2">
          <DetailOption
            id="summary"
            title="Summary"
            desc="Key points only"
            active={detailLevel === "summary"}
            onClick={() => setDetailLevel("summary")}
          />
          <DetailOption
            id="balanced"
            title="Balanced"
            desc="Essential details"
            active={detailLevel === "balanced"}
            onClick={() => setDetailLevel("balanced")}
          />
          <DetailOption
            id="comprehensive"
            title="Comprehensive"
            desc="Full depth"
            active={detailLevel === "comprehensive"}
            onClick={() => setDetailLevel("comprehensive")}
          />
        </div>
      </div>

      {/* 3. Content Language */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Content Language</h3>
        <div className="relative">
          <select 
            className="w-full appearance-none bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B8E78]/20 transition-all"
            defaultValue="english"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
          {/* Custom arrow for styling consistency */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 flex items-center justify-end border-t border-gray-100">
        <SaveButton label="Save Preferences" />
      </div>
    </div>
    
  );
}

// --- Helper Components for clean code ---

function FormatCard({ id, title, desc, icon, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start text-left p-5 rounded-xl border transition-all duration-200 h-full",
        active
          ? "border-[#6B8E78] bg-white ring-1 ring-[#6B8E78] shadow-sm"
          : "border-black/5 bg-white/40 hover:bg-white hover:border-black/10"
      )}
    >
      <div className={cn(
        "mb-3 p-2 rounded-lg",
        active ? "bg-[#6B8E78] text-white" : "bg-gray-100 text-gray-500"
      )}>
        {icon}
      </div>
      <h4 className="font-bold text-sm text-[#2C3E34] mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </button>
  );
}

function DetailOption({ id, title, desc, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 text-left",
        active
          ? "border-[#6B8E78] bg-white shadow-sm"
          : "border-transparent hover:bg-white/60"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-5 h-5 rounded-full border transition-colors",
        active ? "border-[#6B8E78] bg-[#6B8E78]" : "border-gray-300"
      )}>
        {active && <Circle className="w-2 h-2 fill-white text-white" />}
      </div>
      <div>
        <h4 className="font-bold text-sm text-[#2C3E34]">{title}</h4>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </button>
  );
}