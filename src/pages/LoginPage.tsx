import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Shield, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    adminEmail: 'priya.sharma@delhiuniv.ac.in',
    adminPassword: 'admin123',
    candidateEmail: 'ananya.patel@student.delhiuniv.ac.in',
    candidatePassword: 'student123'
  });
  
  const handleLogin = async (role: 'admin' | 'candidate') => {
    setLoading(true);
    
    const email = role === 'admin' ? formData.adminEmail : formData.candidateEmail;
    const password = role === 'admin' ? formData.adminPassword : formData.candidatePassword;
    
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Login Successful',
          description: `Welcome back! Redirecting to ${role} dashboard...`,
        });
        
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/candidate');
          }
        }, 1000);
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Login Error',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Exam Portal</h1>
          <p className="text-muted-foreground">
            Secure online examination platform
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Choose your role and sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="candidate" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="candidate" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="candidate" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="ananya.patel@student.delhiuniv.ac.in"
                    value={formData.candidateEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, candidateEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.candidatePassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, candidatePassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-primary" 
                  onClick={() => handleLogin('candidate')}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In as Student'}
                </Button>
              </TabsContent>
              
              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="priya.sharma@delhiuniv.ac.in"
                    value={formData.adminEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, adminEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.adminPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, adminPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-primary" 
                  onClick={() => handleLogin('admin')}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In as Admin'}
                </Button>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot your password?
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground text-center mb-2">
              Demo Credentials (pre-filled):
            </p>
            <div className="text-xs space-y-2">
              <div><strong>Student:</strong> ananya.patel@student.delhiuniv.ac.in / student123</div>
              <div><strong>Admin:</strong> priya.sharma@delhiuniv.ac.in / admin123</div>
              <div className="text-muted-foreground mt-2">
                <strong>Other available accounts:</strong><br/>
                Admin: rajesh.kumar@iitb.ac.in / admin123<br/>
                Students: arjun.singh@student.delhiuniv.ac.in, priyanka.reddy@student.iitb.ac.in / student123
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}