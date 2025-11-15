import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToExcel = (data: any[]) => {
  if (!data || data.length === 0) {
    alert("No data to export!");
    return;
  }

  const exportData = data.map((item, index) => ({
    "S.No": index + 1,
    Title: item.title,
    Tag: item.tag,
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "DataTable.xlsx");
};

  export const exportToPDF = (data: any[]) => {
  if (!data || data.length === 0) {
    alert("No data to export!");
    return;
  }

  const doc = new jsPDF();
  const tableColumn = ["S.No", "Title", "Tag"];
  const tableRows = data.map((row, index) => [
    index + 1,
    row.title,
    row.tag,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.text("Data Table Export", 14, 10);
  doc.save("DataTable.pdf");
};

 
export const handlePrint = (data: any[]) => {
  if (!data || data.length === 0) {
    alert("No data to print!");
    return;
  }

  const html = `
    <html>
      <head>
        <title>DataTable Print</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #333; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Data Table Print</h2>
        <table>
          <thead>
            <tr><th>S.No</th><th>Title</th><th>Tag</th></tr>
          </thead>
          <tbody>
            ${data
              .map(
                (row, index) =>
                  `<tr><td>${index + 1}</td><td>${row.title}</td><td>${row.tag}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
        <script>window.print();</script>
      </body>
    </html>
  `;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);
};