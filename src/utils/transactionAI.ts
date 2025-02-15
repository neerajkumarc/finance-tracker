import { TransactionData } from "@/types";

export async function processTransactionWithAI(input: string): Promise<TransactionData> {
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
        { role: "user", content: input },
      ],
      jsonMode: true,
      private: true,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to process input with AI");
  }

  const data = await response.json();
  
  return {
    type: data.type,
    amount: data.amount,
    description: data.description
  };
}