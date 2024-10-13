import jsPDF from "jspdf";
import { options } from "pdfkit";

export default async function CertificateGen(name: string, courseName: string) {
  const doc = new jsPDF({
    orientation: "landscape",
  });

  doc.addImage(
    "/certificate_temp.jpeg",
    "JPEG",
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight()
  );
  doc.setFontSize(30);
  doc.text(
    name,
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight() / 2 + 8,
    { align: "center" }
  );

  doc.setFontSize(13);
  doc.text(
    "Has Successfully completed the",
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight() / 2 + 20,
    { align: "center" }
  );
  doc.setFontSize(18);
  doc.setFont("couruer", "bold");
  doc.text(
    courseName,
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight() / 2 + 28,
    { align: "center" }
  );
  doc.save("certificate.pdf");
}
