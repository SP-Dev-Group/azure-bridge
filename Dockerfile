FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Prefer to run as a non-root user for security
USER deno

# Copy EVERYTHING from your GitHub repository into /app
COPY . .

# ... (Keep your existing setup up to the COPY step)

# Build your React app assets (assuming you use vite build)
# If your build runs on GitHub Actions instead, you can omit this run step
RUN deno task build || true

# Run the backend server instead of the front-end entry point
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-sys", "server.js"]
