import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Smile, Frown, Meh, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type EmotionData = {
  emotion: string;
  value: number;
  color: string;
};

const EmotionAnalysis = () => {
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [emotionData, setEmotionData] = useState<EmotionData[]>([
    { emotion: "Neutral", value: 70, color: "bg-gray-400" },
    { emotion: "Happy", value: 15, color: "bg-medteal" },
    { emotion: "Anxious", value: 10, color: "bg-medgold" },
    { emotion: "Distressed", value: 5, color: "bg-medred" }
  ]);
  const [dominantEmotion, setDominantEmotion] = useState("Neutral");
  
  // Simulate emotion updates when video is active
  useEffect(() => {
    let interval: number | undefined;
    
    if (isVideoActive) {
      interval = window.setInterval(() => {
        // Randomize emotions for demo purposes
        const newEmotionData = [
          { emotion: "Neutral", value: Math.floor(Math.random() * 70) + 10, color: "bg-gray-400" },
          { emotion: "Happy", value: Math.floor(Math.random() * 40) + 5, color: "bg-medteal" },
          { emotion: "Anxious", value: Math.floor(Math.random() * 30) + 5, color: "bg-medgold" },
          { emotion: "Distressed", value: Math.floor(Math.random() * 20), color: "bg-medred" }
        ];
        
        // Normalize to 100%
        const total = newEmotionData.reduce((sum, item) => sum + item.value, 0);
        newEmotionData.forEach(item => {
          item.value = Math.round((item.value / total) * 100);
        });
        
        setEmotionData(newEmotionData);
        
        // Set dominant emotion
        const dominant = newEmotionData.reduce((prev, current) => 
          prev.value > current.value ? prev : current
        );
        setDominantEmotion(dominant.emotion);
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoActive]);

  const handleVideoToggle = async () => {
    if (isVideoActive) {
      // Stop video
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsVideoActive(false);
      return;
    }
    
    try {
      // Start video
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
      setIsVideoActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasPermission(false);
    }
  };
  
  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case "Happy": return <Smile className="h-6 w-6 text-medteal" />;
      case "Distressed": return <Frown className="h-6 w-6 text-medred" />;
      case "Anxious": return <Meh className="h-6 w-6 text-medgold" />;
      default: return <Smile className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader>
        <CardTitle>Emotion-Aware Telehealth</CardTitle>
        <CardDescription>Facial expression and voice tone analysis during telehealth sessions</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid h-full gap-4">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            {isVideoActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <Video className="mb-2 h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {hasPermission === false 
                    ? "Camera access denied" 
                    : "Start the emotion analysis"}
                </p>
              </div>
            )}
            
            {isVideoActive && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-white">
                {getEmotionIcon(dominantEmotion)}
                <span>{dominantEmotion}</span>
              </div>
            )}
          </div>
          
          {isVideoActive && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-medblue" />
                <span className="font-semibold">Emotion Analysis</span>
              </div>
              
              <div className="space-y-2">
                {emotionData.map((item) => (
                  <div key={item.emotion}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.emotion}</span>
                      <span className="text-sm">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className={`h-2 ${item.color}`} />
                  </div>
                ))}
              </div>
              
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Analysis Insights</h4>
                <p className="text-sm text-muted-foreground">
                  {dominantEmotion === "Neutral" && "Patient appears calm and attentive. Proceed with normal consultation."}
                  {dominantEmotion === "Happy" && "Patient seems comfortable and positive. Good timing for important information."}
                  {dominantEmotion === "Anxious" && "Patient may be feeling anxious. Consider a more reassuring approach."}
                  {dominantEmotion === "Distressed" && "Patient shows signs of distress. Immediate attention and empathy recommended."}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleVideoToggle}
          variant={isVideoActive ? "destructive" : "default"}
        >
          {isVideoActive 
            ? <><VideoOff className="mr-2 h-4 w-4" /> Stop Analysis</> 
            : <><Video className="mr-2 h-4 w-4" /> Start Analysis</>
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmotionAnalysis;
