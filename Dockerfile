FROM ubuntu:14.04
MAINTAINER Wes Cravens <wesley.r.cravens@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

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
  nodejs \
  node-gyp

# symlink nodejs with node to prevent race conditions with debian node
RUN ln -s /usr/bin/nodejs /usr/local/bin/node

# install global node deps and set node version
RUN npm i -g \
  n \
  grunt-cli \
  bower && \
  n 0.11.14

# set working dir
WORKDIR /var/www/iamdb

# add all code within context
ADD . /var/www/iamdb

# install app/client deps
RUN npm i && \
  bower install
