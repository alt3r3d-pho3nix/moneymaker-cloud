export default {
  async fetch(request, env) {
    const authHeader = request.headers.get("X-Empire-Auth");
    if (authHeader !== env.WIX_SECRET_KEY) {
      return new Response("Unauthorized", { status: 403 });
    }
    return new Response("Empire Active and Linked", { status: 200 });
  }
};
