import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, AlignCenter, Smile, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  link, 
  color
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  color: string;
}) => {
  return (
    <Card className="feature-card overflow-hidden">
      <CardHeader className="p-4">
        <div className={`feature-icon ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Link to={link}>
          <Button variant="outline" className="w-full">
            Launch <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Rural Aid Nexus AI</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          AI-powered healthcare tools for rural communities
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard 
          title="MedAI Triage Bot" 
          description="Symptom analysis and urgency assessment"
          icon={HeartPulse}
          link="/triage"
          color="text-medteal bg-medteal/10"
        />
        <FeatureCard 
          title="Posture AI" 
          description="Real-time posture monitoring and alerts"
          icon={AlignCenter}
          link="/posture"
          color="text-medblue bg-medblue/10"
        />
        <FeatureCard 
          title="Emotion Analysis" 
          description="Detect emotional states during telehealth"
          icon={Smile}
          link="/emotion"
          color="text-medgold bg-medgold/10"
        />
        <FeatureCard 
          title="MedSkill Trainer" 
          description="Training for rural healthcare workers"
          icon={BookOpen}
          link="/training"
          color="text-medred bg-medred/10"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent interactions with Rural Aid Nexus AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <HeartPulse className="mt-0.5 h-5 w-5 text-medteal" />
                <div>
                  <p className="font-medium">Triage Assessment</p>
                  <p className="text-sm text-muted-foreground">Completed symptom analysis for fever and headache</p>
                  <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <BookOpen className="mt-0.5 h-5 w-5 text-medred" />
                <div>
                  <p className="font-medium">Training Module</p>
                  <p className="text-sm text-muted-foreground">Completed "Basic First Aid Techniques" module</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 10:15 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used tools and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start">
                <HeartPulse className="mr-2 h-4 w-4 text-medteal" />
                Emergency First Aid Guide
              </Button>
              <Button variant="outline" className="justify-start">
                <BookOpen className="mr-2 h-4 w-4 text-medred" />
                Offline Training Materials
              </Button>
              <Button variant="outline" className="justify-start">
                <Smile className="mr-2 h-4 w-4 text-medgold" />
                Telehealth Connection Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
