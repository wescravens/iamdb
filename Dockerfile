FROM ubuntu:14.04
MAINTAINER Wes Cravens <wesley.r.cravens@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

# purge nodejs
RUN apt-get --purge remove \
  nodejs \
  nodejs-legacy

# update apt-get & install curl
RUN apt-get update && \
  apt-get install -y curl

# download and run the nodesource setup
RUN curl -sL https://deb.nodesource.com/setup | bash -

# install system deps
RUN apt-get install -y \
  gcc \
  make \
  git \
  openssl \
  build-essential \
  nodejs=0.11.14 \
  node-gyp

# symlink nodejs with node to prevent race conditions with debian node
RUN ln -s /usr/bin/nodejs /usr/local/bin/node

# install global node deps
RUN npm i -g \
  grunt-cli \
  bower \


# clean and remove build deps
# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# RUN apt-get autoremove -y

# set working dir
WORKDIR /var/www/iamdb

# add all code within context
ADD . /var/www/iamdb

# install app deps
RUN npm i

EXPOSE 4632 35729 27017
