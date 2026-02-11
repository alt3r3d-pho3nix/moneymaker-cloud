export default {
  async fetch(request, env) {
    // 1. AUTHENTICATION
    const authHeader = request.headers.get("X-Empire-Auth");
    if (authHeader !== env.WIX_SECRET_KEY) {
      return new Response("Unauthorized", { status: 403 });
    }

    // 2. PROCESS DATA
    if (request.method === "POST") {
      const data = await request.json();
      
      // 3. STORE DATA (Example: Saving to Cloudflare KV)
      // This requires setting up a KV namespace later.
      // await env.MY_KV_NAMESPACE.put("latest_data", JSON.stringify(data));
      
      return new Response("Data processed", { status: 200 });
    }

    return new Response("Empire System Active", { status: 200 });
  }
};
