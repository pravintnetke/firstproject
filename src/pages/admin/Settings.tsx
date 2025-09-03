import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Mail, 
  Database, 
  Cloud, 
  Lock,
  Users,
  Globe,
  Palette,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Camera,
  Mic,
  Monitor
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Settings() {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'Secure Exam Portal',
    systemEmail: 'admin@examportal.edu',
    timezone: 'UTC-5',
    language: 'en',
    
    // Security Settings
    sessionTimeout: 30,
    maxLoginAttempts: 3,
    passwordMinLength: 8,
    twoFactorRequired: false,
    
    // Exam Settings
    defaultExamDuration: 60,
    autoSubmitOnTimeout: true,
    allowBackNavigation: false,
    showQuestionNumbers: true,
    randomizeQuestionOrder: true,
    
    // Proctoring Settings
    enableFaceDetection: true,
    enableScreenRecording: true,
    enableTabSwitchDetection: true,
    enableAudioMonitoring: false,
    violationThreshold: 3,
    autoFlagViolations: true,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    examReminders: true,
    resultNotifications: true,
    
    // System Maintenance
    maintenanceMode: false,
    maintenanceMessage: 'System under maintenance. Please try again later.',
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: 30
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast({
      title: 'Settings Saved',
      description: 'System settings have been updated successfully.',
    });
  };

  const handleReset = () => {
    // Reset to default values
    toast({
      title: 'Settings Reset',
      description: 'All settings have been restored to default values.',
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide preferences and security settings
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} className="bg-gradient-primary">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="exam">Exam</TabsTrigger>
          <TabsTrigger value="proctoring">Proctoring</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                General Configuration
              </CardTitle>
              <CardDescription>
                Basic system settings and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => setSettings({...settings, systemName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="systemEmail">System Email</Label>
                  <Input
                    id="systemEmail"
                    type="email"
                    value={settings.systemEmail}
                    onChange={(e) => setSettings({...settings, systemEmail: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">UTC-8 (Pacific)</SelectItem>
                      <SelectItem value="UTC-7">UTC-7 (Mountain)</SelectItem>
                      <SelectItem value="UTC-6">UTC-6 (Central)</SelectItem>
                      <SelectItem value="UTC-5">UTC-5 (Eastern)</SelectItem>
                      <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of the portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark theme for the interface</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Compact Layout</Label>
                  <p className="text-sm text-muted-foreground">Use smaller spacing and condensed views</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Authentication and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Password Min Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => setSettings({...settings, passwordMinLength: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>Two-Factor Authentication Required</Label>
                    <p className="text-sm text-muted-foreground">
                      Require all users to enable 2FA
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorRequired}
                    onCheckedChange={(checked) => setSettings({...settings, twoFactorRequired: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">IP Restrictions</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Restrict access to specific IP addresses or ranges
                </p>
                <Textarea placeholder="Enter IP addresses (one per line)" rows={3} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Defaults</CardTitle>
              <CardDescription>
                Default settings for new examinations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultDuration">Default Duration (minutes)</Label>
                  <Input
                    id="defaultDuration"
                    type="number"
                    value={settings.defaultExamDuration}
                    onChange={(e) => setSettings({...settings, defaultExamDuration: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    key: 'autoSubmitOnTimeout',
                    label: 'Auto-Submit on Timeout',
                    description: 'Automatically submit exam when time expires'
                  },
                  {
                    key: 'allowBackNavigation',
                    label: 'Allow Back Navigation',
                    description: 'Allow students to go back to previous questions'
                  },
                  {
                    key: 'showQuestionNumbers',
                    label: 'Show Question Numbers',
                    description: 'Display question numbers in the interface'
                  },
                  {
                    key: 'randomizeQuestionOrder',
                    label: 'Randomize Question Order',
                    description: 'Shuffle questions for each attempt'
                  }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>{label}</Label>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    <Switch
                      checked={settings[key as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) => setSettings({...settings, [key]: checked})}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proctoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Proctoring Features
              </CardTitle>
              <CardDescription>
                Configure monitoring and security features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="violationThreshold">Violation Threshold</Label>
                  <Input
                    id="violationThreshold"
                    type="number"
                    value={settings.violationThreshold}
                    onChange={(e) => setSettings({...settings, violationThreshold: parseInt(e.target.value)})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of violations before auto-flagging
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    key: 'enableFaceDetection',
                    label: 'Face Detection',
                    description: 'Monitor candidate presence and identity',
                    icon: Camera
                  },
                  {
                    key: 'enableScreenRecording',
                    label: 'Screen Recording',
                    description: 'Record screen activity during exam',
                    icon: Monitor
                  },
                  {
                    key: 'enableTabSwitchDetection',
                    label: 'Tab Switch Detection',
                    description: 'Detect when candidate switches browser tabs',
                    icon: Monitor
                  },
                  {
                    key: 'enableAudioMonitoring',
                    label: 'Audio Monitoring',
                    description: 'Monitor audio for suspicious activity',
                    icon: Mic
                  },
                  {
                    key: 'autoFlagViolations',
                    label: 'Auto-Flag Violations',
                    description: 'Automatically flag suspicious behavior'
                  }
                ].map(({ key, label, description, icon: Icon }) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                      <div>
                        <Label>{label}</Label>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings[key as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) => setSettings({...settings, [key]: checked})}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure system-wide notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: 'emailNotifications',
                  label: 'Email Notifications',
                  description: 'Send notifications via email',
                  icon: Mail
                },
                {
                  key: 'smsNotifications',
                  label: 'SMS Notifications',
                  description: 'Send notifications via SMS'
                },
                {
                  key: 'examReminders',
                  label: 'Exam Reminders',
                  description: 'Send reminders before exam start time'
                },
                {
                  key: 'resultNotifications',
                  label: 'Result Notifications',
                  description: 'Notify when exam results are published'
                }
              ].map(({ key, label, description, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                    <div>
                      <Label>{label}</Label>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings[key as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) => setSettings({...settings, [key]: checked})}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Maintenance
              </CardTitle>
              <CardDescription>
                System status and maintenance options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode to prevent user access
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                />
              </div>
              
              {settings.maintenanceMode && (
                <div className="space-y-2">
                  <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                  <Textarea
                    id="maintenanceMessage"
                    value={settings.maintenanceMessage}
                    onChange={(e) => setSettings({...settings, maintenanceMessage: e.target.value})}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Backup Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic system backups
                  </p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
                />
              </div>
              
              {settings.autoBackup && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Backup Frequency</Label>
                    <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="retentionDays">Retention (days)</Label>
                    <Input
                      id="retentionDays"
                      type="number"
                      value={settings.retentionDays}
                      onChange={(e) => setSettings({...settings, retentionDays: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Create Manual Backup Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="font-medium">Database</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Online and responsive</p>
                </div>
                
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="font-medium">Storage</span>
                  </div>
                  <p className="text-sm text-muted-foreground">85% used (150GB free)</p>
                </div>
                
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="font-medium">Memory</span>
                  </div>
                  <p className="text-sm text-muted-foreground">High usage (92%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}