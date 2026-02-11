export default {
  async fetch(request, env) {
    // 1. AUTHENTICATION
    const authHeader = request.headers.get("X-Empire-Auth");
    if (authHeader !== env.WIX_SECRET_KEY) {
      return new Response("Unauthorized", { status: 403 });
    }

    // 2. PROCESS DATA
    if (request.method === "POST") {
      try {
        const data = await request.json();
        
        // 3. STORE DATA (Database)
        // NOTE: You must create a KV Namespace named 'DATA_STORE' 
        // in your Cloudflare dashboard and bind it to this worker!
        await env.DATA_STORE.put("latest_session", JSON.stringify(data));
        
        return new Response("Data stored", { status: 200 });
      } catch (e) {
        return new Response("Error processing data", { status: 500 });
      }
    }

    return new Response("Empire System Active", { status: 200 });
  }
};
