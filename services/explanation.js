// ExplanationService.js
export class ExplanationService {
    constructor(fetchers = []) {
      this.fetchers = fetchers; // Array of explanation fetchers (e.g., Text, Image, Video)
    }
  
    async getExplanation(inputText) {
      const explanations = await Promise.all(
        this.fetchers.map((fetcher) => fetcher.fetch(inputText))
      );
  
      return explanations.flat(); // Combine all formats
    }
  }

  
  // Example fetcher: ImageExplanationFetcher.js
  export class ImageExplanationFetcher {
    async fetch(inputText) {
      return [`https://example.com/image?q=${encodeURIComponent(inputText)}`];
    }
  }
  