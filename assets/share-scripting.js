
(function () {
  "use strict";

  const SHARE_URL = "https://knackforthis.com/trades/";
  const SHARE_TITLE = "KnackForThis, Trade Fit Diagnostics";
  const SHARE_TEXT = "Reality-based trade fit diagnostics to help you decide before committing.";

  const BUTTON_ID = "share-knackforthis";
  const btn = document.getElementById(BUTTON_ID);
  if (!btn) return;

  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }

  function toast(message) {
    const el = document.createElement("div");
    el.textContent = message;
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "20px";
    el.style.transform = "translateX(-50%)";
    el.style.padding = "10px 14px";
    el.style.borderRadius = "10px";
    el.style.background = "rgba(0,0,0,0.85)";
    el.style.color = "#fff";
    el.style.fontSize = "14px";
    el.style.zIndex = "99999";
    el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
    document.body.appendChild(el);

    setTimeout(() => {
      el.style.transition = "opacity 200ms ease";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 220);
    }, 1400);
  }

  async function handleShare() {
    // Prefer native share (mobile + some modern desktops)
    if (navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
        return;
      } catch {
        // User canceled or unsupported, fall back
      }
    }

    // Desktop fallback: copy link
    try {
      const ok = await copyToClipboard(SHARE_URL);
      toast(ok ? "Link copied to clipboard." : "Copy failed.");
    } catch {
      toast("Copy failed.");
    }
  }

  btn.addEventListener("click", handleShare, { passive: true });
})();