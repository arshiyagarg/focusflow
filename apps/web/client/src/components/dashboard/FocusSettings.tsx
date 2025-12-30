import { useState } from "react";
import { Bell, Shield, Play } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SaveButton } from "@/components/ui/SaveButton";

export function FocusSettings() {
  const [sessionLength, setSessionLength] = useState(45);
  const [breakLength, setBreakLength] = useState(5);
  
  // Toggle States
  const [notifications, setNotifications] = useState(true);
  const [blocking, setBlocking] = useState(false);
  const [autoBreak, setAutoBreak] = useState(true);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* 1. Session Length Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Session Length</h3>
        
        {/* Quick Select Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TimeCard 
            val={15} label="Short" 
            active={sessionLength === 15} 
            onClick={() => setSessionLength(15)} 
          />
          <TimeCard 
            val={25} label="Pomodoro" 
            active={sessionLength === 25} 
            onClick={() => setSessionLength(25)} 
          />
          <TimeCard 
            val={45} label="Extended" 
            active={sessionLength === 45} 
            onClick={() => setSessionLength(45)} 
          />
          <TimeCard 
            val={60} label="Deep Work" 
            active={sessionLength === 60} 
            onClick={() => setSessionLength(60)} 
          />
        </div>

        {/* Custom Session Input */}
        <div className="flex items-center gap-3 mt-2">
            <Input 
                type="number" 
                value={sessionLength}
                onChange={(e) => setSessionLength(Number(e.target.value))}
                className="w-20 bg-white border-black/10 text-center font-bold text-[#2C3E34]"
            />
            <span className="text-sm text-muted-foreground">minutes</span>
        </div>
      </div>

      {/* 2. Break Interval Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Break Interval</h3>
        <div className="grid grid-cols-3 gap-4">
            <TimeCard 
                val={5} label="5 min" 
                active={breakLength === 5} 
                onClick={() => setBreakLength(5)} 
            />
            <TimeCard 
                val={10} label="10 min" 
                active={breakLength === 10} 
                onClick={() => setBreakLength(10)} 
            />
            <TimeCard 
                val={15} label="15 min" 
                active={breakLength === 15} 
                onClick={() => setBreakLength(15)} 
            />
        </div>

        {/* NEW: Custom Break Input */}
        <div className="flex items-center gap-3 mt-2">
            <Input 
                type="number" 
                value={breakLength}
                onChange={(e) => setBreakLength(Number(e.target.value))}
                className="w-20 bg-white border-black/10 text-center font-bold text-[#2C3E34]"
            />
            <span className="text-sm text-muted-foreground">minutes</span>
        </div>
      </div>

      {/* 3. Session Options (Toggles) */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Session Options</h3>
        <div className="space-y-3 bg-white/50 rounded-xl border border-black/5 p-2">
            <OptionRow
                icon={<Bell className="w-4 h-4" />}
                title="Session Notifications"
                desc="Get alerts when sessions start and end"
                checked={notifications}
                onCheckedChange={setNotifications}
            />
            <OptionRow
                icon={<Shield className="w-4 h-4" />}
                title="Distraction Blocking"
                desc="Block distracting websites during sessions"
                checked={blocking}
                onCheckedChange={setBlocking}
            />
            <OptionRow
                icon={<Play className="w-4 h-4" />}
                title="Auto-Start Breaks"
                desc="Automatically begin break timers"
                checked={autoBreak}
                onCheckedChange={setAutoBreak}
            />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 flex items-center justify-end border-t border-gray-100">
        <SaveButton label="Save Settings" />
      </div>
    </div>
  );
}

// --- Helper Components ---

function TimeCard({ val, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center py-6 rounded-xl border transition-all duration-200",
                active
                    ? "border-[#6B8E78] bg-white ring-1 ring-[#6B8E78] shadow-sm"
                    : "border-black/5 bg-white/40 hover:bg-white hover:border-black/10"
            )}
        >
            <span className={cn("text-2xl font-bold mb-1", active ? "text-[#2C3E34]" : "text-gray-600")}>
                {val}
            </span>
            <span className="text-xs text-muted-foreground font-medium">{label}</span>
        </button>
    )
}

function OptionRow({ icon, title, desc, checked, onCheckedChange }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 border border-transparent hover:border-black/5 transition-colors">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-full text-[#6B8E78] shadow-sm">
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