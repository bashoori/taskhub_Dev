/* ============================================
   Convert to MP3 Tool (Client-side)
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("mp3-file");
  const btn = document.getElementById("convert-btn");
  const result = document.getElementById("convert-result");

  if (!fileInput || !btn || !result) return;

  btn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) return alert("Select a file");

    result.textContent = "Conversion completed (mock).";
  });
});
