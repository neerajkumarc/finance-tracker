"use client";

import { useState } from "react";
import { addTransactionForCurrentUser } from "@/actions/transactions";
import { Button } from "@/components/ui/button";
import { useAddingStore } from "@/store/useAddingStore";
import { TransactionData } from "@/types";
import { processTransactionWithAI } from "@/utils/transactionAI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenLine, Wand2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const COMMON_EMOJIS = {
  expense: ["💸", "🛒", "🍔", "🚗", "🏠", "💊", "📱", "🎮", "✈️", "🎫"],
  income: ["💰", "💵", "💎", "💳", "🏦", "📈", "💼", "🎁", "🏆", "💪"],
};

const AddDataManually = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAIMode, setIsAIMode] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [selectedEmoji, setSelectedEmoji] = useState(COMMON_EMOJIS.expense[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsAdding } = useAddingStore();

  const handleAIToggle = (enabled: boolean) => {
    setIsAIMode(enabled);
    if (enabled) {
      setAmount("");
      setDescription("");
    }
    setError(null); // Clear any existing errors when toggling modes
  };

  const handleTypeChange = (newType: "expense" | "income") => {
    setType(newType);
    setSelectedEmoji(COMMON_EMOJIS[newType][0]);
  };

  const validateManualInput = () => {
    if (!amount || !description) {
      setError("Please fill in all required fields");
      return false;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than 0");
      return false;
    }
    return true;
  };

  const processManualInput = async () => {
    if (!validateManualInput()) return false;

    const transaction: TransactionData = {
      type,
      amount: Number(amount),
      description: `${selectedEmoji} ${description}`,
    };

    await addTransactionForCurrentUser(transaction);
    return true;
  };

  const processAIInput = async () => {
    if (!description.trim()) {
      setError("Please enter a description");
      return false;
    }

    try {
      const aiResult = await processTransactionWithAI(description);
      
      if (!aiResult || aiResult.amount === 0) {
        setError("Unable to process the transaction description. Please be more specific or try manual mode.");
        return false;
      }

      await addTransactionForCurrentUser(aiResult);
      return true;
    } catch (err) {
      setError("Failed to process the transaction. Please try again or use manual mode.");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      setIsProcessing(true);
      setIsAdding(true);

      const success = await (isAIMode ? processAIInput() : processManualInput());
      
      if (success) {
        resetForm();
        setIsOpen(false); // Close dialog on success
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
      setIsAdding(false);
    }
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setType("expense");
    setSelectedEmoji(COMMON_EMOJIS.expense[0]);
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        >
          <PenLine className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            checked={isAIMode}
            onCheckedChange={handleAIToggle}
          />
          <Label className="flex items-center space-x-2">
            <Wand2 className="w-4 h-4" />
            <span>AI Mode</span>
          </Label>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {!isAIMode && (
            <>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter amount"
                  required={!isAIMode}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="description">
                {isAIMode ? "Describe your transaction" : "Description"}
              </Label>
              {!isAIMode && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      {selectedEmoji}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="grid grid-cols-5 gap-2">
                      {COMMON_EMOJIS[type].map((emoji) => (
                        <Button
                          key={emoji}
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEmoji(emoji)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <Input
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError(null);
              }}
              placeholder={isAIMode ? "e.g., spent 500 on lunch" : "Enter description"}
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 font-medium">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Add Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDataManually;