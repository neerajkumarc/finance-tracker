"use client";
import { Button } from "@/components/ui/button";
import { useAddingStore } from "@/store/useAddingStore";
import { addTransaction } from "@/utils/supabase/queries";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface VoiceInputProps {
  user: {
    id: string;
  };
}

interface TransactionData {
  type: "expense" | "income";
  amount: number;
  description: string;
}

const AddDataWithMic = ({ user }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showShakeAnimation, setShowShakeAnimation] = useState<boolean>(false);
  const { setIsAdding } = useAddingStore();

  // Reset shake animation after it plays
  useEffect(() => {
    if (showShakeAnimation) {
      const timer = setTimeout(() => {
        setShowShakeAnimation(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showShakeAnimation]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new (window as any).webkitSpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = async (event: any) => {
        const text = event.results[event.results.length - 1][0].transcript;
        await processVoiceInput(text);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setShowShakeAnimation(true);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const processVoiceInput = async (text: string) => {
    try {
      setIsProcessing(true);
      setIsAdding(true);

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
          jsonMode: true,
          private: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process voice input");
      }

      const data: TransactionData = await response.json();

      if (data.amount === 0) {
        setShowShakeAnimation(true);
        return;
      }

      const transaction: any = {
        user_id: user.id,
        type: data.type,
        amount: data.amount,
        description: data.description,
      };

      await addTransaction(transaction);
    } catch (error) {
      console.error("Error processing voice input:", error);
      setShowShakeAnimation(true);
    } finally {
      setIsProcessing(false);
      setIsAdding(false);
    }
  };

  const toggleListening = useCallback(() => {
    if (!recognition) {
      setShowShakeAnimation(true);
      return;
    }

    if (isProcessing) {
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error("Failed to start recognition:", error);
        setShowShakeAnimation(true);
      }
    }
  }, [recognition, isListening, isProcessing]);

  return (
    <div className="relative">
      <Button
        size="icon"
        onClick={toggleListening}
        disabled={isProcessing}
        className={`
          rounded-full w-14 h-14 transition-colors duration-200
          ${
            isListening
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          }
          ${isProcessing ? "animate-pulse cursor-not-allowed" : ""}
          ${showShakeAnimation ? "animate-shake" : ""}
        `}
      >
        {isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default AddDataWithMic;
