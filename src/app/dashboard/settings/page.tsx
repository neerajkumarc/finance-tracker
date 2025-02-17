"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import Logout from "@/components/Logout";

const SettingsPage = () => {
  return (
    <div className="p-4 space-y-2 max-w-md mx-auto">
      <h2 className="text-xl font-medium mb-6">Settings</h2>

      {/* Preferences */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Preferences
        </h3>
        <Card className="p-4 flex justify-between items-center">
          <p>Theme</p>
          <ModeToggle />
        </Card>
      </div>

      {/* Currency Settings */}
      {/* <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Currency</h3>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p>Currency Format</p>
              <p className="text-sm text-muted-foreground">₹ (INR)</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>
      </div> */}

      {/* Language */}
      {/* <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Language</h3>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Languages className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-1">
                <p>Language</p>
                <p className="text-sm text-muted-foreground">English (US)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>
      </div> */}

      {/* Support */}
      {/* <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Support</h3>
        <Link href="/help">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <span>Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </Link>
      </div> */}

      {/* Account Actions */}
      <div className="pt-6">
        <Logout />
      </div>
    </div>
  );
};

export default SettingsPage;
