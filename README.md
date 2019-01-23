# TextNet
The new and improved 490 Capstone Project

## Usage 
### Docker
`docker build -t textnet .`
> This builds your docker image named `textnet` of the application (via the Dockerfile) to be run on a process on your computer

`docker run -d  textnet`
> This boots up your `textnet` image in a container in the background

`docker ps`
> Ensure the container is running

**To stop the container:**

`docker stop {container ID}`

**To restart the container after changes are made:**

`docker build -t textnet .`

`docker run -d textnet`


