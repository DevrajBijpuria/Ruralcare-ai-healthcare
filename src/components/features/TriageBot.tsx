import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mic, Send, Phone, MessageCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const TriageBot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "bot"; content: string; urgency?: number }[]>([
    {
      role: "bot",
      content: "Hello, I'm your MedAI Triage assistant. Please describe your symptoms or health concern so I can help assess your situation."
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [urgencyScore, setUrgencyScore] = useState<number | null>(null);
  const [communicationMode, setCommunicationMode] = useState<"voice" | "text">("text");

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: message }]);
    
    // Simulate processing time
    setTimeout(() => {
      // Simulated bot response based on the message
      let botResponse = "I understand you're experiencing some health issues. Based on what you've told me, ";
      let newUrgency = 0;
      
      if (message.toLowerCase().includes("chest pain") || 
          message.toLowerCase().includes("can't breathe") ||
          message.toLowerCase().includes("severe bleeding")) {
        botResponse += "your symptoms suggest an urgent medical situation that requires immediate attention. Please seek emergency care right away.";
        newUrgency = 90;
      } else if (message.toLowerCase().includes("fever") ||
                message.toLowerCase().includes("headache") ||
                message.toLowerCase().includes("pain")) {
        botResponse += "your symptoms suggest you should see a healthcare provider soon, but it's not an immediate emergency. Would you like me to help you schedule an appointment?";
        newUrgency = 50;
      } else {
        botResponse += "your symptoms seem mild. I recommend rest and monitoring your condition. If symptoms persist or worsen, please contact a healthcare provider.";
        newUrgency = 20;
      }
      
      setUrgencyScore(newUrgency);
      setChatHistory(prev => [...prev, { 
        role: "bot", 
        content: botResponse,
        urgency: newUrgency
      }]);
    }, 1000);
    
    // Clear the input field
    setMessage("");
  };
  
  const handleRecordToggle = () => {
    // In a real app, this would connect to the browser's speech recognition API
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulated recording and response after 3 seconds
      setTimeout(() => {
        const simulatedVoiceInput = "I have a persistent headache and slight fever since yesterday.";
        setMessage(simulatedVoiceInput);
        setIsRecording(false);
      }, 3000);
    }
  };
  
  const getUrgencyColor = (score: number) => {
    if (score >= 70) return "bg-medred";
    if (score >= 40) return "bg-medgold";
    return "bg-medteal";
  };

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>MedAI Triage Bot</CardTitle>
            <CardDescription>Describe your symptoms for an initial assessment</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={communicationMode === "voice" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setCommunicationMode("voice")}
            >
              <Phone className="mr-1 h-4 w-4" /> Voice
            </Button>
            <Button 
              variant={communicationMode === "text" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setCommunicationMode("text")}
            >
              <MessageCircle className="mr-1 h-4 w-4" /> Text
            </Button>
          </div>
        </div>
        {urgencyScore !== null && (
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Urgency Assessment</span>
              <Badge 
                className={urgencyScore >= 70 ? "bg-medred" : urgencyScore >= 40 ? "bg-medgold" : "bg-medteal"}
              >
                {urgencyScore >= 70 ? "Urgent" : urgencyScore >= 40 ? "Soon" : "Routine"}
              </Badge>
            </div>
            <Progress 
              value={urgencyScore} 
              className="mt-1 h-2"
              indicatorClassName={getUrgencyColor(urgencyScore)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div 
              key={index}
              className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  chat.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p>{chat.content}</p>
                {chat.urgency && chat.urgency >= 70 && (
                  <Badge variant="destructive" className="mt-2">Seek immediate medical attention</Badge>
                )}
              </div>
            </div>
          ))}
          {isRecording && (
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-medred/20">
                <div className="h-8 w-8 animate-pulse-light rounded-full bg-medred" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-end gap-2">
          <Textarea
            placeholder="Type your symptoms here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[60px] flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleRecordToggle}
              className={isRecording ? "bg-medred text-white hover:bg-medred/90" : ""}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button onClick={handleSend} disabled={!message.trim()}>
              <Send className="mr-2 h-4 w-4" /> Send
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TriageBot;
