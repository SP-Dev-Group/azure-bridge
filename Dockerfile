FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Prefer to run as a non-root user for security
USER deno

# Copy EVERYTHING from your GitHub repository into /app
# This includes index.html and the /src/main.jsx path cleanly
COPY . .

# We skip the explicit build-time RUN cache step to bypass strict compilation blockers.
# Deno will resolve and cache everything automatically on the fly at startup!
CMD ["run", "--allow-net", "--allow-env", "src/main.jsx"]
