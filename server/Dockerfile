# Use a lighter version of Node as a parent image
FROM node:latest
# Set the working directory to /api
WORKDIR /server
# copy package.json into the container at /api
COPY package*.json /server/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY . /server/
# Make port 80 available to the world outside this container
EXPOSE 9292
# Run the app when the container launches
CMD ["npm", "start"]