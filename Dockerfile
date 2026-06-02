FROM denoland/deno:alpine-1.46.3

# Set the application workspace
WORKDIR /app

# Run the runtime container as a secure, non-root user
USER deno

# Cache dependencies early to optimize future build times
COPY deno.json* .

# Copy the rest of your local base44 source code
COPY . .

# Expose port 80 for the Azure Web App connection mapping
EXPOSE 80

# Run Deno with production network and environment flag permissions
CMD ["run", "--allow-net", "--allow-env", "main.ts"]
