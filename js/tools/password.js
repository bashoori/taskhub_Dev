/* =====================================================
   PASSWORD GENERATOR TOOL
   - Custom length
   - Toggles: lower, upper, numbers, symbols
   - Strength indicator
   - Copy to clipboard
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const lengthInput = document.querySelector("#pwd-length");
  const lowerChk = document.querySelector("#pwd-lower");
  const upperChk = document.querySelector("#pwd-upper");
  const numberChk = document.querySelector("#pwd-number");
  const symbolChk = document.querySelector("#pwd-symbol");
  const generateBtn = document.querySelector("#pwd-generate");
  const output = document.querySelector("#pwd-output");
  const strengthEl = document.querySelector("#pwd-strength");
  const copyBtn = document.querySelector("#pwd-copy");

  if (!lengthInput || !lowerChk || !upperChk || !numberChk || !symbolChk || !generateBtn || !output) {
    console.warn("Password Generator: Missing DOM elements");
    return;
  }

  generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthInput.value, 10);

    const useLower = lowerChk.checked;
    const useUpper = upperChk.checked;
    const useNumber = numberChk.checked;
    const useSymbol = symbolChk.checked;

    if (!useLower && !useUpper && !useNumber && !useSymbol) {
      showStrength("حداقل یکی از گزینه‌ها را انتخاب کنید.", "error");
      output.value = "";
      return;
    }

    if (isNaN(length) || length < 6 || length > 64) {
      showStrength("طول پسورد باید بین ۶ تا ۶۴ کاراکتر باشد.", "error");
      output.value = "";
      return;
    }

    const pwd = generatePassword(length, { useLower, useUpper, useNumber, useSymbol });
    output.value = pwd;

    const strength = evaluateStrength(pwd, { useLower, useUpper, useNumber, useSymbol });
    showStrength(strength.label, strength.level);

    if (copyBtn) {
      copyBtn.style.display = "inline-flex";
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const text = output.value;
      if (!text) return;

      navigator.clipboard.writeText(text);
      copyBtn.textContent = "کپی شد!";
      setTimeout(() => (copyBtn.textContent = "کپی"), 1200);
    });
  }

  function generatePassword(length, opts) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";

    let pool = "";
    if (opts.useLower) pool += lower;
    if (opts.useUpper) pool += upper;
    if (opts.useNumber) pool += numbers;
    if (opts.useSymbol) pool += symbols;

    let pwd = "";
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      pwd += pool[idx];
    }
    return pwd;
  }

  function evaluateStrength(pwd, opts) {
    let score = 0;

    const length = pwd.length;
    const variety =
      (opts.useLower ? 1 : 0) +
      (opts.useUpper ? 1 : 0) +
      (opts.useNumber ? 1 : 0) +
      (opts.useSymbol ? 1 : 0);

    if (length >= 8) score++;
    if (length >= 12) score++;
    if (variety >= 2) score++;
    if (variety >= 3) score++;

    if (score <= 1) {
      return { label: "Weak / ضعیف", level: "weak" };
    } else if (score === 2 || score === 3) {
      return { label: "Medium / متوسط", level: "medium" };
    } else {
      return { label: "Strong / قوی", level: "strong" };
    }
  }

  function showStrength(message, level) {
    if (!strengthEl) return;
    strengthEl.textContent = message;

    if (level === "error") {
      strengthEl.style.background = "#fee2e2";
      strengthEl.style.color = "#b91c1c";
      strengthEl.style.border = "1px solid #fecaca";
    } else if (level === "weak") {
      strengthEl.style.background = "#fef2f2";
      strengthEl.style.color = "#b91c1c";
      strengthEl.style.border = "1px solid #fecaca";
    } else if (level === "medium") {
      strengthEl.style.background = "#fffbeb";
      strengthEl.style.color = "#92400e";
      strengthEl.style.border = "1px solid #facc15";
    } else if (level === "strong") {
      strengthEl.style.background = "#ecfdf5";
      strengthEl.style.color = "#065f46";
      strengthEl.style.border = "1px solid #bbf7d0";
    } else {
      strengthEl.style.background = "";
      strengthEl.style.color = "";
      strengthEl.style.border = "none";
    }
  }
});
