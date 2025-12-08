/* =====================================================
   IMAGE RESIZER PRO
   - Resize by width / height / percentage
   - Keep aspect ratio
   - Change format (JPG/PNG/WEBP)
   - Control quality
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.querySelector("#pro-img-file");
  const metaBox = document.querySelector("#pro-img-meta");
  const previewImg = document.querySelector("#pro-img-preview");
  const resultImg = document.querySelector("#pro-img-result");
  const statusBox = document.querySelector("#pro-status");
  const resizeBtn = document.querySelector("#pro-resize-btn");
  const downloadBtn = document.querySelector("#pro-download");

  const widthInput = document.querySelector("#pro-width");
  const heightInput = document.querySelector("#pro-height");
  const keepRatioChk = document.querySelector("#pro-keep-ratio");
  const formatSelect = document.querySelector("#pro-format");
  const qualityInput = document.querySelector("#pro-quality");
  const qualityLabel = document.querySelector("#pro-quality-label");

  const modeWidth = document.querySelector("#mode-width");
  const modeHeight = document.querySelector("#mode-height");
  const modePercent = document.querySelector("#mode-percent");

  let originalImage = null;
  let originalWidth = 0;
  let originalHeight = 0;
  let resizedDataUrl = "";

  if (!fileInput || !resizeBtn) {
    console.warn("Image Resizer Pro: missing DOM elements");
    return;
  }

  qualityInput.addEventListener("input", () => {
    qualityLabel.textContent = qualityInput.value + "%";
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showStatus("Please select an image file.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      originalImage = new Image();
      originalImage.src = e.target.result;
      originalImage.onload = () => {
        originalWidth = originalImage.width;
        originalHeight = originalImage.height;

        previewImg.src = originalImage.src;
        previewImg.style.display = "block";

        metaBox.textContent =
          `Original: ${originalWidth} × ${originalHeight} px`;

        showStatus("Image loaded. Choose resize settings.", "info");
      };
    };
    reader.readAsDataURL(file);
  });

  resizeBtn.addEventListener("click", () => {
    if (!originalImage) {
      showStatus("First upload an image.", "error");
      return;
    }

    const mode = modeWidth.checked
      ? "width"
      : modeHeight.checked
      ? "height"
      : "percent";

    let targetWidth = originalWidth;
    let targetHeight = originalHeight;

    const keepRatio = keepRatioChk.checked;

    if (mode === "width") {
      const w = parseInt(widthInput.value, 10);
      if (isNaN(w) || w <= 0) {
        showStatus("Enter a valid width.", "error");
        return;
      }
      targetWidth = w;
      targetHeight = keepRatio
        ? Math.round((originalHeight / originalWidth) * w)
        : parseInt(heightInput.value || originalHeight, 10);
    } else if (mode === "height") {
      const h = parseInt(heightInput.value, 10);
      if (isNaN(h) || h <= 0) {
        showStatus("Enter a valid height.", "error");
        return;
      }
      targetHeight = h;
      targetWidth = keepRatio
        ? Math.round((originalWidth / originalHeight) * h)
        : parseInt(widthInput.value || originalWidth, 10);
    } else if (mode === "percent") {
      const p = parseInt(widthInput.value, 10);
      if (isNaN(p) || p <= 0) {
        showStatus("Enter a valid percentage.", "error");
        return;
      }
      const factor = p / 100;
      targetWidth = Math.round(originalWidth * factor);
      targetHeight = Math.round(originalHeight * factor);
    }

    if (targetWidth < 50 || targetHeight < 50) {
      showStatus("Resulting image is too small.", "error");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(originalImage, 0, 0, targetWidth, targetHeight);

    const quality = parseInt(qualityInput.value, 10) / 100;
    const format = formatSelect.value;

    let mime = "image/jpeg";
    if (format === "png") mime = "image/png";
    if (format === "webp") mime = "image/webp";

    resizedDataUrl = canvas.toDataURL(mime, quality);

    resultImg.src = resizedDataUrl;
    resultImg.style.display = "block";

    downloadBtn.style.display = "inline-block";

    showStatus(
      `Done! New size: ${targetWidth} × ${targetHeight} px, format: ${format.toUpperCase()}, quality: ${qualityInput.value}%.`,
      "success"
    );
  });

  downloadBtn.addEventListener("click", () => {
    if (!resizedDataUrl) return;
    const a = document.createElement("a");
    a.href = resizedDataUrl;
    a.download = "image-optimized." + formatSelect.value;
    a.click();
  });

  function showStatus(message, type) {
    if (!statusBox) return;
    statusBox.textContent = message;

    if (type === "error") {
      statusBox.style.background = "#fee2e2";
      statusBox.style.color = "#b91c1c";
      statusBox.style.border = "1px solid #fecaca";
    } else if (type === "success") {
      statusBox.style.background = "#ecfdf5";
      statusBox.style.color = "#166534";
      statusBox.style.border = "1px solid #bbf7d0";
    } else {
      statusBox.style.background = "#eff6ff";
      statusBox.style.color = "#1e3a8a";
      statusBox.style.border = "1px solid #bfdbfe";
    }
  }
});
