FROM node:16.13.0-buster-slim AS build-env

ENV LC_ALL=C.UTF-8

RUN apt-get update && \
  apt-get install -y \
  apt-utils \
  curl \
  jq \
  git \
  sudo

RUN npm install -g npm@8.11.0
RUN curl -sSL https://bina.egoist.sh/egoist/dum | sh

ENV UNAME=docker
ENV GID=1000
ENV UID=1001

RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -G sudo -o -s /bin/bash $UNAME
RUN echo "$UNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER $UNAME

# WORKDIR /app

# # COPY package.json package.json
# # COPY yarn.lock yarn.lock

# RUN npm i

COPY entrypoint-dev.sh entrypoint-dev.sh
RUN sudo chmod +x entrypoint-dev.sh
COPY  . .

ENTRYPOINT [ "/entrypoint-dev.sh" ]

# CMD [ "/bin/bash", "-c", "npm i && npm run build" ]
