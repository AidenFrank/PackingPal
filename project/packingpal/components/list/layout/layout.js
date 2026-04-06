export function createLayout(doc) {
  // Define list margins
  const marginLeft = 15;
  const marginRight = 15;
  const marginTop = 20;
  const marginBottom = 20;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const usableWidth = pageWidth - marginLeft - marginRight;

  let y = marginTop;

  const lineHeight = 6;

  // Check if text needs to go on new page
  const ensureSpace = (lines = 1) => {
    if (y + lines * lineHeight > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
    }
  };

  // --- Text Block (LEFT ALIGNED) ---
  const addText = (text, indent = 0) => {
    const x = marginLeft + indent;
    const width = usableWidth - indent;

    const lines = doc.splitTextToSize(text, width);

    ensureSpace(lines.length);

    doc.text(lines, x, y);
    y += lines.length * lineHeight;
  };

  // --- Centered Text Block ---
  const addCenteredText = (text, maxLines = null) => {
    let lines = doc.splitTextToSize(text, usableWidth);

    if (maxLines) {
      lines = lines.slice(0, maxLines);
    }

    ensureSpace(lines.length);

    lines.forEach((line) => {
      const textWidth = doc.getTextWidth(line);
      const x = marginLeft + (usableWidth - textWidth) / 2;

      doc.text(line, x, y);
      y += lineHeight + 2;
    });
  };

  // --- Section Header ---
  const addHeader = (text) => {
    doc.setFont("helvetica", "bold");
    addText(text);
    doc.setFont("helvetica", "normal");
    y += 2;
  };

  // --- Divider Line ---
  const addDivider = () => {
    ensureSpace(1);

    doc.line(marginLeft, y, pageWidth - marginRight, y);

    y += 6;
  };

  return {
    doc,
    get y() {
      return y;
    },
    set y(val) {
      y = val;
    },
    marginLeft,
    usableWidth,
    lineHeight,
    addText,
    addCenteredText,
    ensureSpace,
    addHeader,
    addDivider,
  };
}
