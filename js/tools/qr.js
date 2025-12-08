/* =====================================================
   QR GENERATOR TOOL — Clean, Fast, AdSense-Friendly
   - Generates QR from text/URL
   - Supports size selection
   - Download PNG
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#qr-input");
  const sizeSelect = document.querySelector("#qr-size");
  const generateBtn = document.querySelector("#qr-generate");
  const downloadBtn = document.querySelector("#qr-download");
  const qrBox = document.querySelector("#qr-box");

  let qrInstance = null;

  if (!input || !sizeSelect || !generateBtn || !qrBox) {
    console.warn("QR Tool: Missing HTML elements");
    return;
  }

  generateBtn.addEventListener("click", () => {
    const text = input.value.trim();
    const size = parseInt(sizeSelect.value);

    if (!text) {
      showStatus("لطفاً متن یا لینک را وارد کنید.", "error");
      return;
    }

    // Clear old QR
    qrBox.innerHTML = "";

    // Generate new QR
    qrInstance = new QRCode(qrBox, {
      text: text,
      width: size,
      height: size,
      colorDark: "#0f172a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    showStatus("QR با موفقیت ساخته شد.", "success");
    downloadBtn.style.display = "inline-block";
  });

  downloadBtn.addEventListener("click", () => {
    if (!qrInstance) return;

    // Extract canvas from QR library
    const img = qrBox.querySelector("img") || qrBox.querySelector("canvas");
    if (!img) return;

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = img.src || img.toDataURL("image/png");
    link.click();
  });

  function showStatus(message, type) {
    const status = document.querySelector("#qr-status");
    if (!status) return;

    status.textContent = message;

    if (type === "error") {
      status.style.background = "#fee2e2";
      status.style.color = "#b91c1c";
      status.style.border = "1px solid #fecaca";
    } else {
      status.style.background = "#ecfdf5";
      status.style.color = "#065f46";
      status.style.border = "1px solid #bbf7d0";
    }
  }
});
