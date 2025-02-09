"use client";
import { Button } from "@/components/ui/button";
import { addTransaction } from "@/utils/supabase/queries";
import { Mic, MicOff } from "lucide-react";
import React, { useEffect, useState } from "react";

const AddDataWithMic = ({user}: any) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = async (event: any) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;
        setTranscript(text);
        await processVoiceInput(text);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      (window as any).recognition = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      (window as any).recognition?.stop();
      setIsListening(false);
    } else {
      (window as any).recognition?.start();
      setIsListening(true);
    }
  };

  const processVoiceInput = async (text: string) => {
    try {
      const systemPrompt = `You are a financial assistant. Parse the following text and return a JSON object with these fields:
        - type: either "expense" or "income"
        - amount: a number (parse any mentioned amount)
        - description: a brief description of the transaction starting with an emoji
        Example input: "add expense for lunch 500 rupees"
        Should return: {"type": "expense", "amount": 500, "description": "🍚 lunch"}`;

      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text },
          ],
          model: "openai",
          jsonMode: true,
          private: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process voice input");
      }

      const data: any = await response.json();

      const transaction: any = {
        user_id: user.id,
        type: data.type,
        amount: data.amount,
        description: data.description,
      }

     await addTransaction(transaction);
    
    } catch (error) {
      console.error("Error processing voice input:", error);
    }
  };

  return (
    <div>
       <Button
        size="icon"
        onClick={toggleListening}
        className={`rounded-full w-14 h-14 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
        }`}
      >
        {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default AddDataWithMic;
