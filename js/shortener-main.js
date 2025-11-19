document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("urlInput");
  const btn = document.getElementById("shortenBtn");
  const outputBox = document.getElementById("output");
  const resultMsg = document.getElementById("resultMsg");
  const copyBtn = document.getElementById("copyBtn");

  btn.addEventListener("click", async function () {
    const url = (input.value || "").trim();

    // Basic validation
    if (!/^https?:\/\//i.test(url)) {
      alert("Please enter a valid URL starting with http or https.");
      return;
    }

    resultMsg.textContent = "Shortening...";
    outputBox.classList.remove("hidden");
    copyBtn.classList.add("hidden");

    try {
      // Main API
      const apiURL = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiURL);

      if (!response.ok) throw new Error("API error");
      const shortUrl = await response.text();

      if (!shortUrl.startsWith("http"))
        throw new Error("Invalid TinyURL response");

      // Show success
      resultMsg.innerHTML = `
        <strong>Shortened URL:</strong>
        <a href="${shortUrl}" target="_blank" rel="noopener noreferrer">${shortUrl}</a>
      `;

      // Show Copy button
      copyBtn.classList.remove("hidden");

      copyBtn.onclick = () => {
        navigator.clipboard.writeText(shortUrl);
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = "Copy Link";
        }, 2000);
      };

    } catch (error) {
      console.error(error);

      // Backup fallback API - is.gd (very stable)
      try {
        const fallbackRes = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
        const fallbackUrl = await fallbackRes.text();

        resultMsg.innerHTML = `
          <strong>Shortened URL (Backup):</strong>
          <a href="${fallbackUrl}" target="_blank" rel="noopener noreferrer">${fallbackUrl}</a>
        `;

        copyBtn.classList.remove("hidden");

        copyBtn.onclick = () => {
          navigator.clipboard.writeText(fallbackUrl);
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = "Copy Link";
          }, 2000);
        };

      } catch (fallbackError) {
        resultMsg.textContent = "Error: Unable to shorten the URL.";
      }
    }
  });
});
