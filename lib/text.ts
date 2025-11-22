import { DomUtils, parseDocument } from "htmlparser2";

type DefaultHtml = string | null | undefined;

// Function to extract text from HTML string and truncate it
const extractText = (defaultHtml: DefaultHtml, maxLength: number): string => {
  const html = defaultHtml || "";
  const dom = parseDocument(html); // Parse the HTML into a DOM-like structure
  const text = DomUtils.textContent(dom); // Extract text content
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export { extractText };
