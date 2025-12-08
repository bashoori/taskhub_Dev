/* =====================================================
   URL SHORTENER TOOL — Clean, Fast, Stable
   API: shrtco.de (Free + Reliable)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#url-input");
  const btn = document.querySelector("#shorten-btn");
  const output = document.querySelector("#output-box");
  const copyBtn = document.querySelector("#copy-btn");

  if (!input || !btn || !output) {
    console.warn("URL Shortener: Elements not found");
    return;
  }

  btn.addEventListener("click", async () => {
    const url = input.value.trim();

    if (!url) {
      showOutput("⚠️ لطفاً یک لینک وارد کنید.", "error");
      return;
    }

    try {
      btn.disabled = true;
      btn.textContent = "در حال کوتاه‌سازی...";

      const api = `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`;
      const res = await fetch(api);
      const data = await res.json();

      if (data.ok) {
        const short = data.result.full_short_link;
        showOutput(short, "success");
        copyBtn.style.display = "inline-flex";
        copyBtn.dataset.copy = short;
      } else {
        showOutput("❌ لینک معتبر نیست.", "error");
      }

    } catch (err) {
      showOutput("مشکلی پیش آمد. دوباره تلاش کنید.", "error");
      console.error(err);

    } finally {
      btn.disabled = false;
      btn.textContent = "کوتاه کن";
    }
  });

  // Copy functionality
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const text = copyBtn.dataset.copy;
      navigator.clipboard.writeText(text);
      copyBtn.textContent = "کپی شد!";
      setTimeout(() => (copyBtn.textContent = "کپی"), 1200);
    });
  }

  function showOutput(message, type = "success") {
    output.textContent = message;

    if (type === "error") {
      output.style.background = "#fee2e2";
      output.style.color = "#b91c1c";
      output.style.border = "1px solid #fecaca";
    } else {
      output.style.background = "#f0f9ff";
      output.style.color = "#075985";
      output.style.border = "1px solid #bae6fd";
    }
  }
});
