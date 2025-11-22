import { ChatbotView } from './chatBotView.js';
import { PromptService } from './promptService.js';
import { ChatbotController } from './chatBotController.js';

(async () => {
  const [css, html, systemPrompt, config, llmsTxt] = await Promise.all([
    fetch('../aspect_assistant/aspect-chatbot.css').then((r) => r.text()),
    fetch('../aspect_assistant/aspect-chatbot.html').then((r) => r.text()),
    fetch('../aspect_assistant/systemPrompt.txt').then((r) => r.text()),
    fetch('../aspect_assistant/chatbot-config.json').then((r) => r.json()),
    fetch('../aspect_assistant/llms.txt').then((r) => r.text()),
  ]);

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  const promptService = new PromptService();
  const chatbotView = new ChatbotView(config);
  const controller = new ChatbotController({ chatbotView, promptService });

  const text = systemPrompt.concat('\n', llmsTxt);
  controller.init({
    firstBotMessage: config.firstBotMessage,
    text,
  });
})();
