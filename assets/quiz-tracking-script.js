  const ENDPOINT = "https://script.google.com/macros/s/AKfycbyVQ1-ZFZfZIcnUbMEIsW_WF8OmFjzTl9FMkb3xOsItX0dNwasW7mFznx0U7lNxIhVbYg/exec";

  function getUserID() {
    let id = localStorage.getItem("user_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("user_id", id);
    }
    return id;
  }

window.sendQuizData = async function(url, text) {
  const payload = new URLSearchParams({
    url,
    userScore: text,
    userID: getUserID()
  });

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      // do NOT set Content-Type manually; the browser will set the correct
      // safelisted header for URLSearchParams (avoids preflight)
      body: payload
    });
    if (!res.ok) throw new Error(res.status);
    console.log("✅ Data sent:", await res.text());
  } catch (err) {
    console.error("❌ Error sending quiz data:", err);
  }
};
