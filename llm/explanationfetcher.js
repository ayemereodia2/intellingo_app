// import { Configuration, OpenAIApi } from "openai";

export class TextExplanationFetcher {
  constructor(apiKey) {
    // this.api = new OpenAIApi(new Configuration({ apiKey }));
  }

  async fetch(inputText) {
    // const response = await this.api.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Explain the following text in simple terms: ${inputText}`,
    //   max_tokens: 150,
    // });
    return ["Here is your translated text.Here is your translated text.Here is your translated text"];
  }
}
