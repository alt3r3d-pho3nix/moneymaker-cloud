export default {
  async fetch(request, env) {
    // 1. SECURITY CHECK: Verify Wix Request
    const authHeader = request.headers.get("X-Empire-Auth");
    if (authHeader !== env.WIX_SECRET_KEY) {
      return new Response("Unauthorized: Invalid Key", { status: 403 });
    }

    // 2. CORE LOGIC: Handle incoming data from Wix
    if (request.method === "POST") {
      try {
        const body = await request.json();
        
        // --- ADD YOUR LOGIC HERE ---
        // Example: Process the body data and return a response
        return new Response(JSON.stringify({ 
          message: "Data received", 
          receivedData: body 
        }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response("Invalid JSON", { status: 400 });
      }
    }

    return new Response("Empire Active", { status: 200 });
  }
};
