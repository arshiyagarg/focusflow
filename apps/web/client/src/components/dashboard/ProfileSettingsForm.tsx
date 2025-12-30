import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import { SaveButton } from "@/components/ui/SaveButton";
export default function ProfileSettingsForm() {
  return (
    <div className="space-y-8">
      {/* Avatar Upload Section */}
      <div className="flex items-center gap-6 p-6 border rounded-xl bg-card/50">
        <div className="relative h-24 w-24">
          <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm">
            <img 
              src="https://github.com/shadcn.png" 
              alt="Profile" 
              className="h-full w-full object-cover" 
            />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-[#6B8E78] text-white rounded-full hover:bg-[#5a7a65] transition-colors shadow-sm ring-2 ring-white">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-lg text-[#2C3E34]">Profile Picture</h3>
          <p className="text-xs text-muted-foreground">Upload a new avatar. JPG, PNG or GIF. Max size 2MB.</p>
          <Button variant="outline" size="sm" className="mt-2 h-8 text-xs">Upload New Photo</Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue="Anusha Arora" className="bg-white h-11" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" defaultValue="anusha@email.com" className="bg-white h-11" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Tell us a little about your learning goals..." 
            className="resize-none bg-white min-h-[120px] leading-relaxed" 
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <SaveButton label="Save Changes" />
      </div>
    </div>
  );
}