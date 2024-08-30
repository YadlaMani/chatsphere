import OpenAI from "openai";

let key;
if (typeof window !== undefined) {
  key = localStorage.getItem("openAiApiKey");
}

const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

async function chatGPTResponse(content, model) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: content }],
      model: model,
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error(`Error in ${model} response:`, error);
    return `An error occurred while fetching response from ${model}`;
  }
}

// GPT-4
export async function gpt4Response(content) {
  return chatGPTResponse(content, "gpt-4");
}

// GPT-4 Turbo
export async function gpt4oResponse(content) {
  return chatGPTResponse(content, "gpt-4o");
}

// GPT-4 Turbo
export async function gpt4oMiniResponse(content) {
  return chatGPTResponse(content, "gpt-4o-mini");
}

// GPT-3.5 Turbo
export async function gpt35TurboResponse(content) {
  return chatGPTResponse(content, "gpt-3.5-turbo");
}
