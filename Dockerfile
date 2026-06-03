FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Prefer to run as a non-root user for security
USER deno

# Copy EVERYTHING from your GitHub repository into /app
# This means your folder structure inside the container becomes /app/src/utils/main.ts
COPY . .

# 1. Cache the dependencies using the correct nested path
RUN deno cache src/utils/main.ts

# 2. Update the startup command to execute the nested file
CMD ["run", "--allow-net", "--allow-env", "src/utils/main.ts"]
