// Manually invoke prism so only code blocks have highlights but
// inline code has styles from the document.
const isAllWhitespace = (str) => str === str.trim();

const codeBlocks = document.querySelectorAll("pre > code");
codeBlocks.forEach((codeBlock) => {
  const lines = codeBlock.textContent.split("\n");
  let initialSpace = 0;

  for (const line of lines) {
    if (!isAllWhitespace(line)) {
      initialSpace = line.length - line.trimStart().length;
    }
  }

  codeBlock.textContent = lines
    .map((line) => line.substring(initialSpace))
    .join("\n");

  if (codeBlock.previousSibling.nodeType === 3) {
    codeBlock.previousSibling.remove();
  }

  if (codeBlock.nextSibling.nodeType === 3) {
    codeBlock.nextSibling.remove();
  }

  Prism.highlightElement(codeBlock);
});
