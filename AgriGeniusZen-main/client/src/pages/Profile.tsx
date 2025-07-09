import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  farmSize: z.string().min(1, "Farm size is required"),
  farmType: z.string().min(1, "Farm type is required"),
  notificationsEnabled: z.boolean(),
  voiceAssistantEnabled: z.boolean(),
  autoScanEnabled: z.boolean(),
  darkModeEnabled: z.boolean()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Default values for the form - in a real app this would be fetched from the API
  const defaultValues: ProfileFormValues = {
    name: "Farmer Raj",
    phone: "9876543210",
    email: "raj@agrimail.com",
    location: "Rajpur, Madhya Pradesh",
    farmSize: "5.5 acres",
    farmType: "Mixed (Rice, Wheat)",
    notificationsEnabled: true,
    voiceAssistantEnabled: true,
    autoScanEnabled: false,
    darkModeEnabled: false
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const res = await apiRequest('POST', '/api/user/profile', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, this would call the updateProfileMutation
    // For the demo, we'll just show a success toast
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
    setIsEditing(false);
  };

  return (
    <div className="py-4">
      <div className="glass rounded-2xl p-5 shadow-glass mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-quicksand font-medium text-secondary-dark flex items-center gap-2">
            <i className="ri-user-line"></i> Your Profile
          </h2>
          <button 
            className="text-accent-dark text-sm flex items-center gap-1"
            onClick={() => setIsEditing(!isEditing)}
          >
            <i className={isEditing ? "ri-save-line" : "ri-edit-line"}></i> 
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <i className="ri-user-line text-4xl text-green-700"></i>
          </div>
          <h3 className="text-lg font-medium text-secondary-dark">{form.watch("name")}</h3>
          <p className="text-sm text-secondary-dark opacity-75">{form.watch("location")}</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-md font-medium text-secondary-dark">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          disabled={!isEditing}
                          className="glass"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your phone number" 
                          {...field} 
                          disabled={!isEditing}
                          className="glass"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Your email" 
                          {...field} 
                          disabled={!isEditing}
                          className="glass"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your location" 
                          {...field} 
                          disabled={!isEditing}
                          className="glass"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-md font-medium text-secondary-dark">Farm Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="farmSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Size</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Farm size in acres" 
                          {...field} 
                          disabled={!isEditing}
                          className="glass"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="farmType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Type</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Type of crops" 
                          {...field} 
                          disabled={!isEditing}
                          className="glass"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-md font-medium text-secondary-dark">App Settings</h3>
              
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="notificationsEnabled"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Push Notifications</FormLabel>
                        <FormDescription className="text-xs">
                          Receive alerts for weather, crop health, and market changes
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!isEditing}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="voiceAssistantEnabled"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Voice Assistant</FormLabel>
                        <FormDescription className="text-xs">
                          Enable voice commands and responses
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!isEditing}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="autoScanEnabled"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Auto Scan</FormLabel>
                        <FormDescription className="text-xs">
                          Automatically scan crops when opening camera
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!isEditing}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="darkModeEnabled"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Dark Mode</FormLabel>
                        <FormDescription className="text-xs">
                          Switch between light and dark theme
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!isEditing}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {isEditing && (
              <div className="flex gap-3 justify-end">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            )}
          </form>
        </Form>
      </div>
      
      <div className="glass rounded-2xl p-5 shadow-glass mb-6">
        <h3 className="text-md font-medium text-secondary-dark mb-4">App Information</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary-dark">Version</span>
            <span className="text-sm font-medium text-secondary-dark">2.1.0</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary-dark">Last Updated</span>
            <span className="text-sm font-medium text-secondary-dark">Yesterday</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary-dark">Storage Usage</span>
            <span className="text-sm font-medium text-secondary-dark">45 MB</span>
          </div>
        </div>
        
        <div className="mt-5 space-y-2">
          <Button variant="outline" className="w-full">
            <i className="ri-question-line mr-2"></i> Help & Support
          </Button>
          
          <Button variant="outline" className="w-full">
            <i className="ri-information-line mr-2"></i> Terms & Privacy Policy
          </Button>
          
          <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
            <i className="ri-logout-box-line mr-2"></i> Sign Out
          </Button>
        </div>
      </div>
      
      <Link href="/">
        <div className="text-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/80 rounded-full text-secondary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all mx-auto">
            <i className="ri-arrow-left-line"></i> Back to Home
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
