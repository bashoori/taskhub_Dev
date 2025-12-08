/* =====================================================
   IMAGE RESIZER — FREE VERSION
   - Resize by width
   - Keep aspect ratio
   - Single image, super lightweight
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.querySelector("#img-file");
  const widthInput = document.querySelector("#img-width");
  const keepRatioChk = document.querySelector("#keep-ratio");
  const resizeBtn = document.querySelector("#resize-btn");
  const metaBox = document.querySelector("#img-meta");
  const statusBox = document.querySelector("#resize-status");
  const previewImg = document.querySelector("#img-preview");
  const resultImg = document.querySelector("#img-result");
  const downloadBtn = document.querySelector("#download-resized");

  let originalImage = null;
  let originalWidth = 0;
  let originalHeight = 0;
  let resizedDataUrl = "";

  if (!fileInput || !resizeBtn) {
    console.warn("Image Resizer: missing DOM elements");
    return;
  }

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

        metaBox.textContent = `Original size: ${originalWidth} × ${originalHeight} px`;
        showStatus("Image loaded. Now choose a new width.", "info");
      };
    };
    reader.readAsDataURL(file);
  });

  resizeBtn.addEventListener("click", () => {
    if (!originalImage) {
      showStatus("First upload an image.", "error");
      return;
    }

    const targetWidth = parseInt(widthInput.value, 10);
    if (isNaN(targetWidth) || targetWidth < 100 || targetWidth > 4000) {
      showStatus("Choose a width between 100 and 4000 pixels.", "error");
      return;
    }

    const keepRatio = keepRatioChk.checked;
    let targetHeight = originalHeight;

    if (keepRatio) {
      const ratio = originalHeight / originalWidth;
      targetHeight = Math.round(targetWidth * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(originalImage, 0, 0, targetWidth, targetHeight);

    resizedDataUrl = canvas.toDataURL("image/jpeg", 0.9);

    resultImg.src = resizedDataUrl;
    resultImg.style.display = "block";

    downloadBtn.style.display = "inline-block";
    showStatus(
      `Done! New size: ${targetWidth} × ${targetHeight} px (JPEG, ~compressed).`,
      "success"
    );
  });

  downloadBtn.addEventListener("click", () => {
    if (!resizedDataUrl) return;
    const a = document.createElement("a");
    a.href = resizedDataUrl;
    a.download = "resized-image.jpg";
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
