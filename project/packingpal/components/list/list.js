"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { subscribeToPDF } from "@/app/lib/pdfStore";

export default function List() {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // Subscribe to changes in the JSON
    const unsubscribe = subscribeToPDF((data) => {
      generatePdf(data);
    });

    return unsubscribe;
  }, []);

  const generatePdf = (data) => {
    if (!data) return;

    const doc = new jsPDF();

    let y = 20; // start a little lower for top margin

    // --- Title Styling ---
    const title = data.basicDetails?.title || "Camping Trip";
    doc.setFont("helvetica", "bold"); // bold font
    doc.setFontSize(22); // bigger font for title

    // Center the title
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const x = (pageWidth - titleWidth) / 2;

    doc.text(title, x, y);

    y += 15; // spacing after title

    // --- Basic Details ---
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal"); // normal text
    if (data.basicDetails) {
      doc.text(`Location: ${data.basicDetails.location || "-"}`, 10, y);
      y += 8;
      doc.text(`Days: ${data.basicDetails.durationDays || 0}`, 10, y);
      y += 8;
      doc.text(`People: ${data.basicDetails.people || 0}`, 10, y);
      y += 12;
    }

    // --- Packing List ---
    if (data.packingList) {
      Object.entries(data.packingList).forEach(([category, items]) => {
        doc.setFont("helvetica", "bold");
        doc.text(category.toUpperCase(), 10, y);
        y += 8;

        doc.setFont("helvetica", "normal");
        items.forEach((item) => {
          doc.text(`- ${item}`, 15, y);
          y += 6;
        });

        y += 4;
      });
    }

    const url = doc.output("bloburl");
    setPdfUrl(url);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {pdfUrl ? (
        <iframe src={pdfUrl} className="flex-1 w-full border-none" />
      ) : (
        <p>No PDF generated yet.</p>
      )}
    </div>
  );
}
