import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, CheckCircle, Play, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  thumbnail: string;
  category: "firstAid" | "childHealth" | "maternalHealth";
}

const trainingModules: TrainingModule[] = [
  {
    id: "first-aid-1",
    title: "Basic First Aid Techniques",
    description: "Learn essential first aid skills for common emergencies",
    duration: "15 min",
    completed: true,
    videoUrl: "#",
    thumbnail: "https://placehold.co/600x400/2A9D8F/FFFFFF?text=First+Aid+Training",
    category: "firstAid"
  },
  {
    id: "first-aid-2",
    title: "CPR & Choking Response",
    description: "Life-saving techniques for cardiac emergencies",
    duration: "20 min",
    completed: false,
    videoUrl: "#",
    thumbnail: "https://placehold.co/600x400/2A9D8F/FFFFFF?text=CPR+Training",
    category: "firstAid"
  },
  {
    id: "child-health-1",
    title: "Child Fever Management",
    description: "How to assess and manage fever in children",
    duration: "12 min",
    completed: true,
    videoUrl: "#",
    thumbnail: "https://placehold.co/600x400/E9C46A/FFFFFF?text=Child+Fever",
    category: "childHealth"
  },
  {
    id: "child-health-2",
    title: "Childhood Nutrition Basics",
    description: "Essential nutrients for child development",
    duration: "18 min",
    completed: false,
    videoUrl: "#",
    thumbnail: "https://placehold.co/600x400/E9C46A/FFFFFF?text=Child+Nutrition",
    category: "childHealth"
  },
  {
    id: "maternal-health-1",
    title: "Prenatal Care Essentials",
    description: "Supporting maternal health during pregnancy",
    duration: "22 min",
    completed: false,
    videoUrl: "#",
    thumbnail: "https://placehold.co/600x400/E76F51/FFFFFF?text=Prenatal+Care",
    category: "maternalHealth"
  },
];

const MedSkillTrainer = () => {
  const [activeTab, setActiveTab] = useState("firstAid");
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const isMobile = useIsMobile();
  
  const filteredModules = trainingModules.filter(module => module.category === activeTab);
  const completedCount = trainingModules.filter(module => module.completed).length;
  const completionPercentage = (completedCount / trainingModules.length) * 100;

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader>
        <CardTitle>MedSkill Trainer</CardTitle>
        <CardDescription>Training modules for rural healthcare workers</CardDescription>
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b px-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="firstAid">First Aid</TabsTrigger>
              <TabsTrigger value="childHealth">Child Health</TabsTrigger>
              <TabsTrigger value="maternalHealth">Maternal Health</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="h-[calc(100%-48px)] overflow-auto">
            {selectedModule ? (
              <div className="p-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mb-4" 
                  onClick={() => setSelectedModule(null)}
                >
                  <ChevronRight className="mr-1 h-4 w-4 rotate-180" /> Back to modules
                </Button>
                
                <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                  <img 
                    src={selectedModule.thumbnail} 
                    alt={selectedModule.title}
                    className="h-full w-full object-cover"
                  />
                  <Button 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full"
                    size="icon"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{selectedModule.title}</h3>
                    <Badge>{selectedModule.duration}</Badge>
                  </div>
                  <p className="mt-2 text-muted-foreground">{selectedModule.description}</p>
                  
                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium">Learning Objectives</h4>
                    <ul className="list-inside list-disc space-y-2 text-sm">
                      <li>Understand the basic principles of {selectedModule.title.toLowerCase()}</li>
                      <li>Learn practical techniques for real-world scenarios</li>
                      <li>Develop confidence in applying these skills in rural settings</li>
                      <li>Know when to refer patients to more advanced healthcare</li>
                    </ul>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Download Materials</Button>
                      <Button>Start Training</Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <TabsContent value={activeTab} className="m-0 h-full">
                <div className="grid gap-4 p-6">
                  {filteredModules.map((module) => (
                    <div 
                      key={module.id} 
                      className="cursor-pointer overflow-hidden rounded-lg border transition-all hover:border-primary hover:shadow-md"
                      onClick={() => setSelectedModule(module)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative aspect-video w-full md:w-1/3">
                          <img 
                            src={module.thumbnail} 
                            alt={module.title} 
                            className="h-full w-full object-cover"
                          />
                          {module.completed && (
                            <div className="absolute right-2 top-2 rounded-full bg-medteal p-1">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold">{module.title}</h3>
                              <Badge>{module.duration}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {module.description}
                            </p>
                          </div>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              {module.completed ? (
                                <span className="flex items-center text-medteal">
                                  <CheckCircle className="mr-1 h-4 w-4" /> Completed
                                </span>
                              ) : (
                                <>
                                  <Video className="mr-1 h-4 w-4" /> Video lesson
                                </>
                              )}
                            </div>
                            <Button size="sm">
                              {module.completed ? "Review" : "Start"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-background/95 backdrop-blur">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-medteal" />
            <span className="font-medium">{completedCount} of {trainingModules.length} modules completed</span>
          </div>
          
          {!isMobile && (
            <Button variant="outline" size="sm">
              View All Courses
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MedSkillTrainer;
