export class ChatbotController {
  #abortController = null;
  #chatbotView;
  #promptService;

  constructor({ chatbotView, promptService }) {
    this.#chatbotView = chatbotView;
    this.#promptService = promptService;
  }
  async init({ firstBotMessage, text }) {
    this.#setupEvents();
    this.#chatbotView.renderWelcomeBubble();
    this.#chatbotView.setInputEnabled(true);
    this.#chatbotView.appendBotMessage(firstBotMessage, null, false);
    return this.#promptService.init(text);
  }

  #setupEvents() {
    this.#chatbotView.setupEventHandlers({
      onOpen: this.#onOpen.bind(this),
      onSend: this.#chatBotReply.bind(this),
      onStop: this.#handleStop.bind(this),
    });
  }

  #handleStop() {
    if (this.#abortController) {
      this.#abortController.abort();
    }
  }
  async #chatBotReply(userMsg) {
    this.#chatbotView.showTypingIndicator();
    this.#chatbotView.setInputEnabled(false);

    try {
      this.#abortController = new AbortController();

      const contentNode = this.#chatbotView.createStreamingBotMessage();
      const response = this.#promptService.prompt(
        userMsg,
        this.#abortController.signal
      );
      let fullresponse = '';
      let lastMessage = 'noop';

      const updateText = () => {
        if (!fullresponse) return;
        if (fullresponse === lastMessage) return;

        lastMessage = fullresponse;
        this.#chatbotView.hideTypingIndicator();
        this.#chatbotView.updateStreamingBotMessage(contentNode, fullresponse);
      };

      const intervalId = setInterval(updateText, 200);
      const stopGenerating = () => {
        clearInterval(intervalId);
        updateText();
        this.#chatbotView.setInputEnabled(true);
      };

      this.#abortController.signal.addEventListener('abort', stopGenerating);

      for await (const chunk of response) {
        if (!chunk) return;

        fullresponse += chunk;
      }

      console.log('Full response', fullresponse);
      stopGenerating();
    } catch (error) {
      this.#chatbotView.hideTypingIndicator();
      if (
        typeof error === 'object' &&
        error !== null &&
        'name' in error &&
        error.name === 'AbortError'
      )
        return console.log('Request abortada pelo usuario');

      this.#chatbotView.appendBotMessage('Erro ao obter resposta da IA');
      console.log('IA prompt Error', error);
    }
  }

  async #onOpen() {
    const errors = this.#checkRequirements();
    if (errors.length) {
      const messages = errors.join('\n\n');
      this.#chatbotView.appendBotMessage(messages);

      this.#chatbotView.setInputEnabled(false);
      return;
    }
    this.#chatbotView.setInputEnabled(true);
  }

  #checkRequirements() {
    const errors = [];
    const iChrome = window.chrome;
    if (!iChrome) {
      errors.push(
        '⚠️ Este recurso, por enquanto, funciona somente na versão recente do Google Chrome. Em que alguns casos, mesmo após a configuração descrita abaixo, pode haver erro ao exibir imagens deste site ou erro no retorno da API CHAT. Devido configurações internas de redes corportativas.'
      );
    }
    if (!('LanguageModel' in window)) {
      errors.push('1️⃣ Na barra de pesquisa, digite: `chrome://flags`');
      errors.push('2️⃣ Busque por: `Prompt API for Gemini Nano`. OU:');
      errors.push(
        '3️⃣ Acesse diretamente: `chrome://flags/#prompt-api-for-gemini-nano`'
      );
      errors.push('🟢 Reinicie o Chrome e tente novamente.😉');
    }

    return errors;
  }
}
