import { useState } from "react";
import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SaveButtonProps {
  onSave?: () => Promise<void> | void; // Can handle async or sync functions
  label?: string;
  className?: string;
}

export function SaveButton({ onSave, label = "Save Changes", className }: SaveButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = async () => {
    setStatus("loading");
    
    // 1. Simulate API delay (min 800ms so user sees the animation)
    // In a real app, you would await onSave() here
    const minDelay = new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
        if (onSave) await onSave();
        await minDelay; // Wait for at least 1.5s
        setStatus("success");
        
        // 2. Reset back to idle after showing success message
        setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
        console.error("Save failed", error);
        setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-[#6B8E78] animate-in fade-in slide-in-from-left-2 duration-300">
        <div className="p-1 rounded-full border border-[#6B8E78]">
            <Check className="w-3 h-3" />
        </div>
        <span className="font-medium text-sm">Preferences saved</span>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleClick}
      disabled={status === "loading"}
      className={cn(
        "min-w-[140px] transition-all duration-300", 
        // Loading State Styles (Lighter green, disabled look)
        status === "loading" 
            ? "bg-[#6B8E78]/70 text-white cursor-wait" 
            : "bg-[#6B8E78] hover:bg-[#5a7a65] text-white",
        className
      )}
    >
      {status === "loading" ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          {/* Default Icon (Check or Save depending on preference) */}
          <Check className="w-4 h-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
}