import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

// Azure injects the PORT variable automatically. Fallback to 8080 locally.
const PORT = Number(Deno.env.get("PORT")) || 8080;

console.log(`Deno server running on port ${PORT}...`);

Deno.serve({
  port: PORT,
  hostname: "0.0.0.0" // Required for Azure's proxy to reach the container
}, async (request) => {
  
  // Serves the static files from your build output directory (usually 'dist')
  const response = await serveDir(request, {
    fsRoot: "dist", 
    enableCors: true,
  });

  // Handle client-side routing (React Router) by falling back to index.html if a route isn't found
  if (response.status === 404) {
    return await serveDir(new Request(new URL("/index.html", request.url)), {
      fsRoot: "dist",
    });
  }

  return response;
});
