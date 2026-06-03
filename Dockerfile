FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Prefer to run as a non-root user for security
USER deno

# Copy EVERYTHING from your GitHub repository into /app
COPY . .

# Cache the dependencies at build time using the true JSX path
RUN deno cache src/main.jsx

# Execute the application on startup using the true JSX path
CMD ["run", "--allow-net", "--allow-env", "src/main.jsx"]
