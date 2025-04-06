import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Camera, CameraOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const PostureMonitor = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [posture, setPosture] = useState<"good" | "bad" | "unknown">("unknown");
  const [sessionDuration, setSessionDuration] = useState(0);
  const [goodPostureTime, setGoodPostureTime] = useState(0);
  const [consecutiveBadPostureTime, setConsecutiveBadPostureTime] = useState(0);
  const [alertShown, setAlertShown] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isCameraActive) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
        
        // Simulate posture detection (random for demo)
        const randomPosture = Math.random() > 0.3 ? "good" : "bad";
        setPosture(randomPosture as "good" | "bad");
        
        if (randomPosture === "good") {
          setGoodPostureTime(prev => prev + 1);
          setConsecutiveBadPostureTime(0);
        } else {
          setConsecutiveBadPostureTime(prev => prev + 1);
        }
        
        // Alert if bad posture for 10 seconds
        if (consecutiveBadPostureTime >= 10 && !alertShown) {
          setAlertShown(true);
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCameraActive, consecutiveBadPostureTime, alertShown]);

  const handleCameraToggle = async () => {
    if (isCameraActive && streamRef.current) {
      // Stop camera
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      toast.info("Camera stopped");
      return;
    }
    
    try {
      // Start camera with explicit constraints
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      };
      
      console.log("Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Camera access granted:", stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Ensure video plays when it's ready
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(e => console.error("Error playing video:", e));
          }
        };
      }
      
      setHasPermission(true);
      setIsCameraActive(true);
      setAlertShown(false);
      setSessionDuration(0);
      setGoodPostureTime(0);
      setConsecutiveBadPostureTime(0);
      toast.success("Camera activated successfully");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasPermission(false);
      toast.error("Failed to access camera. Please check your permissions.");
    }
  };

  const dismissAlert = () => {
    setAlertShown(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const postureScore = sessionDuration > 0 
    ? Math.round((goodPostureTime / sessionDuration) * 100) 
    : 0;

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader>
        <CardTitle>Posture AI Monitor</CardTitle>
        <CardDescription>Real-time posture detection and alerts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid h-full gap-4">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <Camera className="mb-2 h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {hasPermission === false 
                    ? "Camera access denied" 
                    : "Camera is currently disabled"}
                </p>
              </div>
            )}
            
            {isCameraActive && posture !== "unknown" && (
              <div className={`absolute bottom-4 right-4 rounded-full p-2 ${
                posture === "good" ? "bg-medteal" : "bg-medred"
              }`}>
                {posture === "good" 
                  ? <Check className="h-5 w-5 text-white" /> 
                  : <AlertCircle className="h-5 w-5 text-white" />}
              </div>
            )}
          </div>
          
          {alertShown && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Poor Posture Detected!</AlertTitle>
              <AlertDescription>
                You've been sitting with poor posture for more than 10 seconds. Please adjust your position.
              </AlertDescription>
              <Button variant="outline" size="sm" className="mt-2" onClick={dismissAlert}>
                Dismiss
              </Button>
            </Alert>
          )}
          
          {isCameraActive && (
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Posture Quality</span>
                  <span className="text-sm font-medium">{postureScore}%</span>
                </div>
                <Progress value={postureScore} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Session Duration:</span>
                  <p className="font-medium">{formatTime(sessionDuration)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Good Posture Time:</span>
                  <p className="font-medium">{formatTime(goodPostureTime)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleCameraToggle}
          variant={isCameraActive ? "destructive" : "default"}
        >
          {isCameraActive 
            ? <><CameraOff className="mr-2 h-4 w-4" /> Stop Monitoring</> 
            : <><Camera className="mr-2 h-4 w-4" /> Start Monitoring</>
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostureMonitor;
