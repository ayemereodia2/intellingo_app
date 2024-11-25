// ReaderCore.js
export class ReaderCore {
    constructor(explanationService, storageAdapter) {
      this.explanationService = explanationService; // Fetches explanations
      this.storageAdapter = storageAdapter; // Manages storage
    }
  
    async processInput(inputText, options = { translate: false, language: "en" }) {
      let processedText = inputText;
  
      // Get explanation
      const explanation = await this.explanationService.getExplanation(processedText);
  
      // Store the result
      await this.storageAdapter.save({ inputText, explanation });
  
      return explanation;
    }
  }
  