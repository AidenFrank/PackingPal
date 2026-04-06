"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { subscribeToPDF } from "@/app/lib/pdfStore";

import { createLayout } from "./layout/layout";
import { renderPeople } from "./sections/people";
import { renderLocation } from "./sections/location";
import { renderTimeFrame } from "./sections/timeframe";
import { renderPackingList } from "./sections/packinglist";

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

    const { addText, addCenteredText, addHeader, addDivider } = layout;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    addCenteredText(data.basicDetails.title || "Camping Trip", 2);

    layout.y += 4;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const sections = [
      {
        fn: renderPeople,
        data: data.basicDetails.people,
      },
      {
        fn: renderLocation,
        data: data.basicDetails.location,
      },
      {
        fn: renderTimeFrame,
        data: data.basicDetails.timeframe,
      },
    ];

    sections.forEach(({ fn, data }) => {
      const didRender = fn(layout, data);
      if (didRender) addDivider();
    });

    renderPackingList(layout, data.packingList);

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
