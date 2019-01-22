FROM node:alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install --production
# Copy app source code
COPY . .
# Expose port application uses
EXPOSE 3000
# Install bash to run commands
#RUN apk add --no-cache bash
# Start application
CMD [ "npm", "start" ]