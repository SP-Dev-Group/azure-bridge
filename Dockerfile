FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Prefer to run as a non-root user for security
USER deno

# Copy EVERYTHING from your GitHub repository into /app
COPY . .

# Execute the application with net, env, and system monitoring permissions
CMD ["run", "--allow-net", "--allow-env", "--allow-sys", "src/main.jsx"]
