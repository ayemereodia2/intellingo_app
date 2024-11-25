import { ReaderCore } from "./controllers/readercore.js";
import { ExplanationService } from "./services/explanation.js";
import { LocalStorageAdapter } from "./data/storageadapter.js";
import { TextExplanationFetcher } from "./llm/explanationfetcher.js";

// DOM elements
const loadDocumentButton = document.getElementById("loadDocument");
const deleteDocumentButton = document.getElementById("deleteDocument");
const readerContainer = document.querySelector(".reader-container");
const documentList = document.querySelector(".document-list");
const readerContent = document.getElementById("readerContent");
const explanationView = document.getElementById("explanationView");
const closeButton = document.getElementById("closeButton");

// Array to store loaded documents
const documents = [];

// Function to render the document list in the sidebar
function renderDocumentList() {
  // Clear the existing list
  documentList.innerHTML = "";

  // Render each document as a list item
  documents.forEach((doc, index) => {
    const docItem = document.createElement("div");
    docItem.classList.add("document-item");
    docItem.innerHTML = `
      <img src="${doc.thumbnail}" alt="Document Thumbnail">
      <p>${doc.title}</p>
    `;
    docItem.addEventListener("click", () => loadDocument(index));
    documentList.appendChild(docItem);
  });
}


loadDocumentButton.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt"; // Restrict file type to text files

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textContent = e.target.result;
        displayContent(textContent);
      };
      reader.readAsText(file);
    }
  });

  fileInput.click(); // Trigger the file input dialog
});

function displayContent(text) {
  // Clear the reader content
  readerContent.innerHTML = "";

  // Split text into paragraphs for formatting
  const paragraphs = text.split("\n");
  paragraphs.forEach((paragraph) => {
    if (paragraph.trim() !== "") {
      const p = document.createElement("p");
      p.textContent = paragraph;
      readerContent.appendChild(p);
    }
  });
}

deleteDocumentButton.addEventListener("click", () => {
  const selectedDocumentIndex = documents.findIndex((doc) => doc.isSelected);
  if (selectedDocumentIndex !== -1) {
    documents.splice(selectedDocumentIndex, 1);
    renderDocumentList();
    readerContainer.innerHTML = "<p>Select a document to begin reading.</p>";
  } else {
    alert("No document selected for deletion.");
  }
});


const explanationService = new ExplanationService([
  new TextExplanationFetcher()
]);
const storageAdapter = new LocalStorageAdapter();

// Initialize core
const readerCore = new ReaderCore(explanationService, storageAdapter);

readerContent.addEventListener("mouseup", async () => {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText) {
    // Highlight the selected text
    highlightSelection(selection);

    // Pass selected text to ReaderCore
    const explanation = await readerCore.processInput(selectedText, { translate: true, language: "en" });
    // Display the explanation
    renderExplanation(explanation);
  }
});

closeButton.addEventListener("click", () => {
  //removeHighlight();
  explanationView.style.display = "none";
  closeButton.style.display = "none";
});

let highlightedRange = null;

function highlightSelection(selection) {
  const range = selection.getRangeAt(0);
  const highlight = document.createElement("span");
  highlight.style.backgroundColor = "yellow"; // Highlight color
  highlight.textContent = selection.toString();
 // Store the range so we can remove the highlight later
  highlightedRange = range;
  range.deleteContents();
  range.insertNode(highlight);
}

function removeHighlight() {
  if (highlightedRange) {
    const highlight = highlightedRange.startContainer;
    
    // Check if the range contains a highlighted <span>
    if (highlight.nodeType === Node.TEXT_NODE) {
      console.log("no highlight...");
      return;  // No highlight was created, exit
    }

    const span = highlight.querySelector('span');
    if (span) {
      // Replace the span with its text content
      const text = span.textContent;
      const parent = span.parentNode;
      parent.replaceChild(document.createTextNode(text), span);
    }

    // Reset the range variable
    highlightedRange = null;
  }
}


function renderExplanation(content) {
  closeButton.style.display = "block";
  explanationView.innerHTML = `<p>${content}</p>`;
  explanationView.style.display = "block";
  console.log(closeButton.style.display);
}


// Initial rendering of the document list
renderDocumentList();
