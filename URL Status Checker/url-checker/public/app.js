// Frontend logic for the URL Status Checker.
// Sends the URL to the backend and displays the result.

const form = document.getElementById("checkForm");
const urlInput = document.getElementById("urlInput");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");

// Toggle the button between "idle" and "loading" states
function setLoading(isLoading) {
  checkBtn.disabled = isLoading;
  checkBtn.textContent = isLoading ? "Checking..." : "Check Status";
}

// Render the result card based on the backend response
function showResult(data) {
  const isOnline = Boolean(data.online);
  const statusText = isOnline ? "✅ Online" : "❌ Offline";
  const statusClass = isOnline ? "online" : "offline";

  result.innerHTML = `
    <div class="status ${statusClass}">${statusText}</div>
    <div class="detail"><span>HTTP Status Code</span><span>${data.statusCode ?? 0}</span></div>
    <div class="detail"><span>Response Time</span><span>${data.responseTime ?? 0} ms</span></div>
  `;
  result.classList.remove("hidden");
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = urlInput.value.trim();
  if (!url) return;

  setLoading(true);
  result.classList.add("hidden");

  try {
    const res = await fetch("/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    // Backend returned a validation error (e.g. invalid URL)
    if (!res.ok) {
      showResult({
        online: false,
        statusCode: 0,
        responseTime: 0
      });
      return;
    }

    showResult(data);
  } catch (err) {
    // Network error while talking to our own backend
    showResult({ online: false, statusCode: 0, responseTime: 0 });
  } finally {
    setLoading(false);
  }
});
