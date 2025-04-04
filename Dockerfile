# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_UPLOAD_API_URL=https://asia-southeast2-positive-rhino-454912-k2.cloudfunctions.net/uploadImage
ENV NEXT_PUBLIC_FITANALYSIS_API_URL=https://asia-southeast2-positive-rhino-454912-k2.cloudfunctions.net/matchingAnalyzer
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=671019984810-u8r9lk9efcv16q2dje7vdgp70ul5aqgd.apps.googleusercontent.com
ENV NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=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
ENV NEXT_PUBLIC_TRYON_TRACK=https://asia-southeast2-positive-rhino-454912-k2.cloudfunctions.net/tryonTracking
ENV NEXT_PUBLIC_HISTORY_HANDLER=https://asia-southeast2-positive-rhino-454912-k2.cloudfunctions.net/historyhandler
ENV NEXT_PUBLIC_REMOVE_ITEM=https://asia-southeast2-positive-rhino-454912-k2.cloudfunctions.net/removeFromWardrobe
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=6Aw2LfF2C08fOiDm8cw5iI6jO9Ln1qfWEXHR4XLVNnc=
ENV BUCKET_NAME=fyuse-static-assets

# Build the application
RUN npm run build

# Expose the port and start the app
EXPOSE 3000
CMD ["npm", "start"]