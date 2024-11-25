import { ReaderCore } from "./controllers/readercore.js";
import { Highlighter } from "./views/highlighter.js";
import { ExplanationService, TextExplanationFetcher, ImageExplanationFetcher } from "./services/explanation.js";
import { LocalStorageAdapter } from "./data/storageadapter.js";

// Setup components
// const translator = new Translator(new GoogleTranslateAPI());
const explanationService = new ExplanationService([
  new TextExplanationFetcher(),
  new ImageExplanationFetcher(),
]);
const storageAdapter = new LocalStorageAdapter();

// Initialize core
const readerCore = new ReaderCore(explanationService, storageAdapter);

// Example: Process highlighted text
document.addEventListener("mouseup", async () => {
  const selectedText = Highlighter.extractText(document);
  if (selectedText) {
    const explanation = await readerCore.processInput(selectedText, { translate: true, language: "fr" });
    console.log("Explanation:", explanation);
  }
});
