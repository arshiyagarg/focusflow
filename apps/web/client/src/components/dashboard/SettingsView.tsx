import { useState } from "react";
import { User, FileText, Layout, Clock, Bell, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSettingsForm from "./ProfileSettingsForm";
import { ContentSettings } from "./ContentSettings"; 
import { InterfaceSettings } from "./InterfaceSettings";
import { FocusSettings } from "./FocusSettings";
import { NotificationSettings } from "./NotificationSettings";
import { PrivacySettings } from "./PrivacySettings";

export function SettingsView() {
  const [activeSetting, setActiveSetting] = useState("profile");

  const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "content", label: "Content", icon: FileText },
    { id: "interface", label: "Interface", icon: Layout },
    { id: "focus", label: "Focus Sessions", icon: Clock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-[#2C3E34]">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Customize your learning experience and manage your account preferences.
        </p>
      </div>

      {/* TOP NAVIGATION BAR */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto pb-1" aria-label="Tabs">
          {navItems.map((item) => {
            const isActive = activeSetting === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSetting(item.id)}
                className={cn(
                  "group inline-flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "border-[#6B8E78] text-[#2C3E34]"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-[#6B8E78]" : "text-gray-400 group-hover:text-gray-500"
                  )}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="mt-8">
        
        {/* 1. PROFILE TAB */}
        {activeSetting === "profile" && (
          <div className="bg-white/50 rounded-2xl border border-black/5 p-1 max-w-3xl">
             <ProfileSettingsForm />
          </div>
        )}

        {/* 2. CONTENT TAB (New!) */}
        {activeSetting === "content" && (
           <div className="bg-white/50 rounded-2xl border border-black/5 p-6 max-w-4xl">
              <ContentSettings />
           </div>
        )}

        {/* 3. INTERFACE TAB (New!) */}
    {activeSetting === "interface" && (
       <div className="bg-white/50 rounded-2xl border border-black/5 p-6 max-w-4xl">
          <InterfaceSettings />
       </div>
    )}

    {/* 4. FOCUS SESSIONS TAB (New!) */}
    {activeSetting === "focus" && (
       <div className="bg-white/50 rounded-2xl border border-black/5 p-6 max-w-4xl">
          <FocusSettings />
       </div>
    )}

    {/* 5. NOTIFICATIONS TAB (New!) */}
    {activeSetting === "notifications" && (
       <div className="bg-white/50 rounded-2xl border border-black/5 p-6 max-w-4xl">
          <NotificationSettings />
       </div>
    )}

    {/* 6. PRIVACY TAB (New!) */}
    {activeSetting === "privacy" && (
       <div className="bg-white/50 rounded-2xl border border-black/5 p-6 max-w-4xl">
          <PrivacySettings />
       </div>
    )}
        
      </div>
    </div>
  );
}