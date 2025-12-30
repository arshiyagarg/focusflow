import { useState } from "react";
import { BarChart3, Presentation, Sparkles, Share2, Download, Trash2, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SaveButton } from "@/components/ui/SaveButton";
import { cn } from "@/lib/utils";

export function PrivacySettings() {
  // Privacy States
  const [behaviorTracking, setBehaviorTracking] = useState(true);
  const [usageAnalytics, setUsageAnalytics] = useState(true);
  const [personalizedContent, setPersonalizedContent] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* 1. Data Collection Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Data Collection</h3>
        <div className="space-y-3 bg-white/50 rounded-xl border border-black/5 p-2">
            <PrivacyToggleRow
                icon={<BarChart3 className="w-4 h-4" />}
                title="Behavior Tracking"
                desc="Allow tracking of learning patterns to optimize content delivery"
                checked={behaviorTracking}
                onCheckedChange={setBehaviorTracking}
            />
            <PrivacyToggleRow
                icon={<Presentation className="w-4 h-4" />}
                title="Usage Analytics"
                desc="Help improve FocusFlow by sharing anonymous usage data"
                checked={usageAnalytics}
                onCheckedChange={setUsageAnalytics}
            />
            <PrivacyToggleRow
                icon={<Sparkles className="w-4 h-4" />}
                title="Personalized Content"
                desc="Enable AI-powered content recommendations based on behavior"
                checked={personalizedContent}
                onCheckedChange={setPersonalizedContent}
            />
            <PrivacyToggleRow
                icon={<Share2 className="w-4 h-4" />}
                title="Third-Party Data Sharing"
                desc="Share anonymized data with educational research partners"
                checked={dataSharing}
                onCheckedChange={setDataSharing}
            />
        </div>
      </div>

      {/* 2. Data Management Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Data Management</h3>
        <div className="space-y-3 bg-white/50 rounded-xl border border-black/5 p-2">
            <ActionRow
                icon={<Download className="w-4 h-4" />}
                title="Export Your Data"
                desc="Download all your learning data and preferences"
            />
            <ActionRow
                icon={<Trash2 className="w-4 h-4" />}
                title="Delete Account"
                desc="Permanently remove your account and all data"
                isDestructive // Prop to make it red
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

function PrivacyToggleRow({ icon, title, desc, checked, onCheckedChange }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 border border-transparent hover:border-black/5 hover:bg-white/60 transition-all">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-full text-[#6B8E78] shadow-sm border border-black/5">
                    {icon}
                </div>
                <div>
                    <h4 className="font-bold text-sm text-[#2C3E34]">{title}</h4>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
            </div>
            <Switch 
                checked={checked} 
                onCheckedChange={onCheckedChange}
                className="data-[state=checked]:bg-[#6B8E78]"
            />
        </div>
    )
}

function ActionRow({ icon, title, desc, isDestructive }: any) {
    return (
        <button className={cn(
            "w-full flex items-center justify-between p-4 rounded-lg border border-transparent transition-all group",
            isDestructive 
                ? "bg-red-50/50 hover:bg-red-50 hover:border-red-100" 
                : "bg-white/40 hover:bg-white/60 hover:border-black/5"
        )}>
            <div className="flex items-center gap-4">
                <div className={cn(
                    "p-2 rounded-full shadow-sm border border-black/5 bg-white",
                    isDestructive ? "text-red-500" : "text-[#6B8E78]"
                )}>
                    {icon}
                </div>
                <div className="text-left">
                    <h4 className={cn("font-bold text-sm", isDestructive ? "text-red-700" : "text-[#2C3E34]")}>
                        {title}
                    </h4>
                    <p className={cn("text-xs", isDestructive ? "text-red-600/70" : "text-muted-foreground")}>
                        {desc}
                    </p>
                </div>
            </div>
            <ChevronRight className={cn(
                "w-4 h-4 transition-transform group-hover:translate-x-1",
                isDestructive ? "text-red-400" : "text-gray-400"
            )} />
        </button>
    )
}