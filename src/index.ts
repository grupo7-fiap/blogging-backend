import openai from './openaiConfig';

async function chatWithOpenAI(contentFromPost: string): Promise<string> {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: `Quero que você gere 2 perguntas, cada pergunta deve ter 5 alternativas e a primeira alternativa sempre deve ter a resposta correta, quero a resposta no formato json. Utilize esse conteúdo para criar as perguntas: ${contentFromPost}` },
            ],
        });

        const response = chatCompletion.choices[0].message?.content;

    if (!response) {
      throw new Error('Não ouve retorno da OpenAI.');
    }

    return response;
    } catch (error: any) {
        console.error("Erro ao acessar a API:", error.response?.data || error.message);
        throw error;
    }
}

export default chatWithOpenAI;
