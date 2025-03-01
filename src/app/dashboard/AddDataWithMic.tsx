"use client";
import { Button } from "@/components/ui/button";
import { useAddingStore } from "@/store/useAddingStore";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { processTransactionWithAI } from "@/utils/transactionAI";
import { useRouter } from "next/navigation";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useFloatingMenuStore } from "@/store/useToggleFloatingMenu";

const AddDataWithMic = () => {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showShakeAnimation, setShowShakeAnimation] = useState<boolean>(false);
  const { setIsAdding } = useAddingStore();

  const { addNewTransaction } = useTransactionStore();
  const { setIsOpen } = useFloatingMenuStore();

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

      const transaction = await processTransactionWithAI(text);
      if (transaction.amount == 0) {
        setShowShakeAnimation(true);
      } else {
        await addNewTransaction(transaction);
        setIsOpen(false);
        router.refresh();
      }
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
          rounded-full w-12 h-12 transition-colors duration-200
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
