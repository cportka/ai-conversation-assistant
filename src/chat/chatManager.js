const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const conversationContext = []; // store recent user & AI messages

async function getChatGPTResponse(userMessage) {
  // push user message
  conversationContext.push({ role: 'user', content: userMessage });

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversationContext,
    temperature: 0.7
  });

  const aiMessage = response.data.choices[0].message.content;
  // push AI message
  conversationContext.push({ role: 'assistant', content: aiMessage });

  return aiMessage;
}

module.exports = {
  getChatGPTResponse
};
