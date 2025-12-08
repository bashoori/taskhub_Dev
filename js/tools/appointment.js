/* ==========================================================
   APPOINTMENT GENERATOR — ICS + Google Calendar Link
   Clean • Mobile Friendly • AdSense Safe
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("#appt-title");
  const date = document.querySelector("#appt-date");
  const time = document.querySelector("#appt-time");
  const btn = document.querySelector("#appt-generate");
  const output = document.querySelector("#output-box");
  const downloadBtn = document.querySelector("#download-ics");

  if (!title || !date || !time || !btn) {
    console.warn("Appointment tool: missing elements");
    return;
  }

  btn.addEventListener("click", () => {
    const t = title.value.trim();
    const d = date.value;
    const tm = time.value;

    if (!t || !d || !tm) {
      showOutput("لطفاً همه فیلدها را کامل کنید.", "error");
      return;
    }

    const start = buildDateTime(d, tm);
    const end = buildDateTime(d, addMinutes(tm, 30));

    const googleLink = buildGoogleCalendarLink(t, start, end);
    const icsContent = buildICS(t, start, end);

    // نمایش لینک
    showOutput(
      `قرار شما آماده شد:<br><a href="${googleLink}" target="_blank">افزودن به Google Calendar</a>`,
      "success"
    );

    // فعال کردن دانلود
    downloadBtn.style.display = "inline-flex";
    downloadBtn.onclick = () => downloadICS(icsContent, "appointment.ics");
  });

  function buildDateTime(dateStr, timeStr) {
    // تبدیل به فرمت: YYYYMMDDTHHMMSSZ
    const [hour, minute] = timeStr.split(":");
    let obj = new Date(dateStr);
    obj.setHours(hour);
    obj.setMinutes(minute);

    return obj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  function addMinutes(timeStr, mins) {
    const [h, m] = timeStr.split(":").map(Number);
    const total = h * 60 + m + mins;
    const hh = String(Math.floor(total / 60)).padStart(2, "0");
    const mm = String(total % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  function buildGoogleCalendarLink(title, start, end) {
    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
      title
    )}&dates=${start}/${end}`;
  }

  function buildICS(title, start, end) {
    return (
      "BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "BEGIN:VEVENT\n" +
      `SUMMARY:${title}\n` +
      `DTSTART:${start}\n` +
      `DTEND:${end}\n` +
      "END:VEVENT\n" +
      "END:VCALENDAR"
    );
  }

  function downloadICS(content, filename) {
    const file = new Blob([content], { type: "text/calendar" });
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function showOutput(msg, type) {
    output.innerHTML = msg;
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
