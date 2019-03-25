[![codecov](https://codecov.io/gh/chrismaltais/TextNet/branch/master/graph/badge.svg)](https://codecov.io/gh/chrismaltais/TextNet)
[![CircleCI](https://circleci.com/gh/chrismaltais/TextNet.svg?style=svg)](https://circleci.com/gh/chrismaltais/TextNet)
# TextNet
Primitive Internet via SMS.

## Usage 
### Docker
`docker build -t textnet .`
> This builds your docker image named `textnet` of the application (via the Dockerfile) to be run on a process on your computer

`docker run -p 3000:3000 -d textnet`
> This boots up your `textnet` image in a container in the background, and binds the container port to port 3000 on your host machine

`docker ps`
> Ensure the container is running

**To stop the container:**

`docker stop {container ID}`

**To restart the container after changes are made:**

`docker build -t textnet .`

`docker run -d textnet`

# Contributing
1. Submit an issue (feature request or bug)
2. Create a branch: `git checkout -b feature/feature-implementing`
3. Commit changes to the branch: `git add . && git commit -m "Present tense commit message"`
4. Push the changes: `git push -u origin feature/feature-implementing`
5. Submit a pull request


