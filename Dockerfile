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

# 1. Cache the dependencies using the correct nested path
RUN deno cache src/utils/main.ts

# 2. Update the startup command to execute the nested file
CMD ["run", "--allow-net", "--allow-env", "src/utils/main.ts"]
