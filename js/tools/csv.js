/* =====================================================
   CSV CLEANER TOOL
   - Detects delimiter (comma, semicolon, tab)
   - Trims cells
   - Removes fully empty rows
   - Outputs cleaned CSV + lets user download
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#csv-input");
  const output = document.querySelector("#csv-output");
  const cleanBtn = document.querySelector("#csv-clean");
  const downloadBtn = document.querySelector("#csv-download");
  const statusBox = document.querySelector("#csv-status");

  if (!input || !output || !cleanBtn) {
    console.warn("CSV Cleaner: Missing DOM elements");
    return;
  }

  cleanBtn.addEventListener("click", () => {
    const raw = input.value;

    if (!raw.trim()) {
      setStatus("⚠️ لطفاً داده CSV را در باکس بالا paste کنید.", "error");
      return;
    }

    const lines = raw.split(/\r?\n/);
    if (!lines.length) {
      setStatus("هیچ داده‌ای پیدا نشد.", "error");
      return;
    }

    const delimiter = detectDelimiter(lines[0]);
    let cleanedLines = [];
    let removedRows = 0;

    for (let line of lines) {
      // skip completely empty lines
      if (!line.trim()) {
        removedRows++;
        continue;
      }

      const cells = line.split(delimiter).map((cell) =>
        cell.replace(/\s+/g, " ").trim()
      );

      // if all cells empty → skip
      if (cells.every((c) => c === "")) {
        removedRows++;
        continue;
      }

      cleanedLines.push(cells.join(delimiter));
    }

    const cleaned = cleanedLines.join("\n");
    output.value = cleaned;

    const originalRows = lines.length;
    const finalRows = cleanedLines.length;

    setStatus(
      `تمیزکاری انجام شد. ردیف‌های اولیه: ${originalRows} | ردیف‌های نهایی: ${finalRows} | ردیف حذف‌شده: ${removedRows}`,
      "success"
    );

    if (downloadBtn) {
      downloadBtn.style.display = "inline-flex";
      downloadBtn.onclick = () => downloadCSV(cleaned, "cleaned.csv");
    }
  });

  function detectDelimiter(line) {
    const counts = {
      ",": (line.match(/,/g) || []).length,
      ";": (line.match(/;/g) || []).length,
      "\t": (line.match(/\t/g) || []).length,
      "|": (line.match(/\|/g) || []).length,
    };

    let best = ",";
    let bestCount = -1;
    for (const [delim, count] of Object.entries(counts)) {
      if (count > bestCount) {
        bestCount = count;
        best = delim;
      }
    }
    return best;
  }

  function downloadCSV(text, filename) {
    const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function setStatus(message, type) {
    if (!statusBox) return;
    statusBox.innerHTML = message;

    if (type === "error") {
      statusBox.style.background = "#fee2e2";
      statusBox.style.color = "#b91c1c";
      statusBox.style.border = "1px solid #fecaca";
    } else {
      statusBox.style.background = "#ecfdf5";
      statusBox.style.color = "#065f46";
      statusBox.style.border = "1px solid #bbf7d0";
    }
  }
});
