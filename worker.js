// src/index.js (Updated Worker)

// ... (Previous imports and HTML setup)

// System Prompts for different tiers
const PROMPTS = {
  kids: "You are a friendly, educational AI assistant for children. Keep responses G-rated, simple, and helpful.",
  teen: "You are a cool, helpful AI assistant for teenagers. Keep responses PG-13, fun, and informative.",
  adult: "You are a sultry AI companion. Be vivid, sensory, and explicit."
};

const MODELS = {
  kids: "microsoft/Phi-3-mini-4k-instruct", // Lightweight, safe
  teen: "Gryphe/MythoMax-L2-13b",           // Versatile
  adult: "Gryphe/MythoMax-L2-13b"          // NSFW
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Set Age Group (User clicks 13, 18, etc.)
    if (url.pathname === "/api/set-age" && request.method === "POST") {
      const { session_id, age } = await request.json();
      let age_group = 'kids';
      if (age >= 13 && age < 18) age_group = 'teen';
      if (age >= 18) age_group = 'adult';
      
      await env.DB.prepare(
        "INSERT OR REPLACE INTO users (id, age_group) VALUES (?, ?)"
      ).bind(session_id, age_group).run();
      
      return Response.json({ success: true, tier: age_group });
    }

    // 2. Chat API (Tier-Aware)
    if (url.pathname === "/api/chat" && request.method === "POST") {
      const { session_id, message } = await request.json();

      // Fetch User Tier
      const user = await env.DB.prepare(
        "SELECT age_group FROM users WHERE id = ?"
      ).bind(session_id).first();
      
      const tier = user ? user.age_group : 'kids'; // Default to safe
      const systemPrompt = PROMPTS[tier];
      const model = MODELS[tier];

      // ... (Rest of HF API calling logic, but use 'model' and 'systemPrompt')
    }
    // ...
  }
};
