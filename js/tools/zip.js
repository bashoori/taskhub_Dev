/* ============================================
   ZIP Tool
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("zip-file");
  const btn = document.getElementById("zip-btn");
  const output = document.getElementById("zip-result");

  if (!fileInput || !btn || !output) return;

  btn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) return alert("Choose a file first");

    output.textContent = "ZIP file created (mock).";
  });
});
