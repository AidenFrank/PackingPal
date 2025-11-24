import { jsPDF } from "jspdf";
import fs from "fs";

// Read and parse JSON file
const data = JSON.parse(fs.readFileSync("./camping.json", "utf-8"));

// Create PDF
const doc = new jsPDF();

// Title
doc.setFontSize(18);
doc.text(data.title, 10, 20);

// Author
doc.setFontSize(12);
doc.text(`Author: ${data.author}`, 10, 30);

// Table header
let y = 50;
doc.setFont("helvetica", "bold");
doc.text("Item", 10, y);
doc.text("Quantity", 60, y);
doc.text("Weight", 120, y);
doc.setFont("helvetica", "normal");

// Table rows
data.items.forEach((item) => {
  y += 10;
  doc.text(item.name, 10, y);
  doc.text(item.quantity.toString(), 60, y);
  doc.text(`${item.weight.toFixed(2)}`, 120, y);
});

// Save PDF
const outputFile = "report.pdf";
doc.save(outputFile);
