# Step 1: Use Node.js base image
FROM node:14-alpine

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the frontend application files (including public/index.html)
COPY . .

# Step 6: Build the application for production
RUN npm run build

# Step 7: Install 'serve' to serve the built frontend files
RUN npm install -g serve

# Step 8: Expose the frontend port
EXPOSE 80

# Step 9: Serve the built files using serve
CMD ["serve", "-s", "build", "-l", "80"]
