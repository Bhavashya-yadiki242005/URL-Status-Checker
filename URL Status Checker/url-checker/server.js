// URL Status Checker - Express server
// A small backend that checks if a given website URL is reachable.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies and serve the static frontend from /public
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check endpoint - useful for Docker / uptime monitors
app.get("/health", (req, res) => {
  res.json({
    status: "Healthy",
    version: "1.0.0"
  });
});

// Normalize a user-provided URL:
// - trims whitespace
// - adds "https://" if no protocol is present
// - throws if the URL is not valid
function normalizeUrl(rawUrl) {
  const trimmed = String(rawUrl || "").trim();
  if (!trimmed) {
    throw new Error("URL is required");
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : "https://" + trimmed;

  // Throws if the URL is malformed
  const parsed = new URL(withProtocol);
  return parsed.toString();
}

// Check the status of a given URL
app.post("/check", async (req, res) => {
  let targetUrl;
  try {
    targetUrl = normalizeUrl(req.body && req.body.url);
  } catch (err) {
    return res.status(400).json({ error: err.message || "Invalid URL" });
  }

  const start = Date.now();

  try {
    // Abort the request if it takes longer than 10 seconds
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(targetUrl, {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeout);

    res.json({
      online: response.ok,
      statusCode: response.status,
      responseTime: Date.now() - start
    });
  } catch (err) {
    // Network error, DNS failure, timeout, etc. -> site is not reachable
    const isTimeout = err.name === "AbortError";
    res.json({
      online: false,
      statusCode: 0,
      responseTime: Date.now() - start,
      error: isTimeout ? "Request timed out" : "Website is unreachable"
    });
  }
});

app.listen(PORT, () => {
  console.log(`URL Status Checker running on port ${PORT}`);
});
