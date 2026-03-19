"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { subscribeToPDF } from "@/app/lib/pdfStore";
import { createLayout } from "./layout/layout";

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
    const layout = createLayout(doc);

    const {
      marginLeft,
      usableWidth,
      lineHeight,
      addText,
      addCenteredText,
      ensureSpace,
      addHeader,
      addDivider,
    } = layout;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    addCenteredText("Camping Trip Title Goes Here That Might Be Long", 2);

    layout.y += 4;

    //---Location---

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    addHeader("Location");
    addText("Hocking Hills State Park");
    addText("123 Forest Rd, Ohio");

    addDivider();

    //---People---

    addHeader("People");
    addText("Total: 3");
    addText("- John", 5);
    addText("- Sarah (Driver)", 5);
    addText("- Mike", 5);

    addDivider();

    //---Time Frame---

    addHeader("Trip Details");
    addText("Days: 3");
    addText("Nights: 2");
    addText("Departure: Friday 8:00 AM");
    addText("Return: Sunday 5:00 PM");
    /*
    // Title
    const usableWidth = pageWidth - marginLeft - marginRight;

    // Split title into multiple lines that fit within margins, limited to 2 lines
    const titleLines = doc.splitTextToSize(title, usableWidth).slice(0, 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    
    // Center EACH line
    titleLines.forEach((line) => {
      const lineWidth = doc.getTextWidth(line);
      const x = marginLeft + (usableWidth - lineWidth) / 2;

      doc.text(line, x, y);
      y += 10; // line spacing for title
    });

    y += 5; // extra spacing after title

    // --- Basic Details ---
    doc.setFont("helvetica", "normal");

    if (data.basicDetails) {
      const { location, people, timeframe } = data.basicDetails;

      addLineIfExists("Location", location);
      if (people && people.length > 0) {
        // Show total count
        doc.text(`People: ${people.length}`, 10, y);
        y += 8;

        // List each person
        people.forEach((person, index) => {
          if (!person?.name) return;

          const label = person.role
            ? `${index + 1}. ${person.name} (${person.role})`
            : `${index + 1}. ${person.name}`;

          doc.text(label, 15, y);
          y += 6;
        });

        y += 4;
      }

      // --- Timeframe Section ---
      if (timeframe) {
        const {
          durationDays,
          durationNights,
          departDay,
          departTime,
          returnDay,
          returnTime,
          season,
        } = timeframe;

        // Only show section if something exists
        const hasTimeframeData =
          durationDays ||
          durationNights ||
          departDay ||
          departTime ||
          returnDay ||
          returnTime ||
          season;

        if (hasTimeframeData) {
          y += 4;

          doc.setFont("helvetica", "bold");
          doc.text("Trip Details", 10, y);
          y += 8;

          doc.setFont("helvetica", "normal");

          addLineIfExists("Days", durationDays);
          addLineIfExists("Nights", durationNights);

          if (departDay || departTime) {
            addLineIfExists(
              "Departure",
              `${departDay || ""} ${departTime || ""}`.trim(),
            );
          }

          if (returnDay || returnTime) {
            addLineIfExists(
              "Return",
              `${returnDay || ""} ${returnTime || ""}`.trim(),
            );
          }

          addLineIfExists("Season", season);

          y += 4;
        }
      }

      y += 8;
    }
    */
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
        <p></p>
      )}
    </div>
  );
}
