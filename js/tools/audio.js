/* ============================================
   Audio Player Tool
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("audio-file");
  const audio = document.getElementById("audio-player");

  if (!fileInput || !audio) return;

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.load();
  });
});
