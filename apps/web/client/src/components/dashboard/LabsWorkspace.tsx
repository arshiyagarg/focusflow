import { Sparkles } from "lucide-react";
import { ContentUpload } from "./ContentUpload";
import { ProcessedContentDisplay } from "./ProcessedContentDisplay";
import { OutputSelector } from "./OutputPreferenceSelector"; 
import { FocusTimer } from "./FocusTimer";

interface LabsWorkspaceProps {
  type: 'text' | 'video' | 'audio';
}

export function LabsWorkspace({ type }: LabsWorkspaceProps) {
  
  // Dynamic Titles based on which tab is active
  const titles = {
    text: { 
      title: "Text Analysis Lab", 
      desc: "Paste articles or upload PDFs for instant summarization." 
    },
    video: { 
      title: "Video Focus Room", 
      desc: "Watch lectures with AI-driven focus tracking and note-taking." 
    },
    audio: { 
      title: "Audio Stream", 
      desc: "Transcribe and analyze real-time audio or voice notes." 
    }
  };

  // Fallback in case type is undefined, though it shouldn't be
  const { title, desc } = titles[type] || titles.text;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      {/* Workspace Header */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-[#2C3E34]">{title}</h2>
        <div className="flex items-center gap-2 mt-1">
            <Sparkles className="w-4 h-4 text-[#6B8E78]" />
            <p className="text-muted-foreground">{desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* LEFT COLUMN (2/3): The Main Work Area */}
        <div className="lg:col-span-2 space-y-6">
            {/* 1. Upload Section */}
            <div className="bg-white/50 border border-black/5 rounded-2xl p-1">
                <ContentUpload activeTab={type} />
            </div>

            {/* 2. Output Display */}
            <ProcessedContentDisplay />
        </div>

        {/* RIGHT COLUMN (1/3): Tools & Controls */}
        <div className="space-y-6">
            {/* Tool 1: The Timer (Essential for Labs) */}
            <div className="sticky top-6 space-y-6">
                <div className="bg-[#F9F9F7] rounded-2xl p-4 border border-black/5">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 ml-1">
                        Focus Timer
                    </h3>
                    {/* We use the timer we built earlier */}
                    <FocusTimer />
                </div>

                {/* Tool 2: Output Preferences */}
                <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                        Output Style
                    </h3>
                    <OutputSelector 
  onSelect={(value: string) => console.log("Selected style:", value)} 
/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}