# Step 1: Build React App
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from frontend
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY frontend/ .

# Build production files
RUN npm run build


# Step 2: Serve App Using Node or Static Server
FROM node:18-alpine

WORKDIR /app

# Copy build output from the "build" stage
COPY --from=build /app/build ./build

# Install serve (to serve static react app)
RUN npm install -g serve

EXPOSE 3000

# Run the application
CMD ["serve", "-s", "build", "-l", "3000"]
