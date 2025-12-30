import { useState } from "react";
import { Clock, Trophy, CheckCircle2, BarChart3, Mail, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SaveButton } from "@/components/ui/SaveButton";

export function NotificationSettings() {
  // Notification Type States
  const [studyReminders, setStudyReminders] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);
  const [processingComplete, setProcessingComplete] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  // Delivery Method States
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* 1. Notification Types Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Notification Types</h3>
        <div className="space-y-3 bg-white/50 rounded-xl border border-black/5 p-2">
            <NotificationRow
                icon={<Clock className="w-4 h-4" />}
                title="Study Reminders"
                desc="Get notified about scheduled study sessions"
                checked={studyReminders}
                onCheckedChange={setStudyReminders}
            />
            <NotificationRow
                icon={<Trophy className="w-4 h-4" />}
                title="Achievement Alerts"
                desc="Celebrate milestones and streaks"
                checked={achievementAlerts}
                onCheckedChange={setAchievementAlerts}
            />
            <NotificationRow
                icon={<CheckCircle2 className="w-4 h-4" />}
                title="Processing Complete"
                desc="Know when content transformation finishes"
                checked={processingComplete}
                onCheckedChange={setProcessingComplete}
            />
            <NotificationRow
                icon={<BarChart3 className="w-4 h-4" />}
                title="Weekly Reports"
                desc="Receive weekly progress summaries"
                checked={weeklyReports}
                onCheckedChange={setWeeklyReports}
            />
        </div>
      </div>

      {/* 2. Delivery Methods Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2C3E34]">Delivery Methods</h3>
        <div className="space-y-3 bg-white/50 rounded-xl border border-black/5 p-2">
            <NotificationRow
                icon={<Mail className="w-4 h-4" />}
                title="Email Notifications"
                desc="Receive updates via email"
                checked={emailNotifs}
                onCheckedChange={setEmailNotifs}
            />
            <NotificationRow
                icon={<Bell className="w-4 h-4" />}
                title="Push Notifications"
                desc="Get browser push notifications"
                checked={pushNotifs}
                onCheckedChange={setPushNotifs}
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

// --- Helper Component ---

function NotificationRow({ icon, title, desc, checked, onCheckedChange }: any) {
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