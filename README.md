iamdb
=====
A web game based on B.O.M.B.

###How To Play
Let's say there are three players.  We'll use the first members of this repo for the example -- Wes, Cliff, and Nathan.
The game starts with Wes providing a movie title or actor.  Let's say Wes said *Fight Club*.  Cliff has two options since this is the first interaction in the game.  He can give another actor in *Fight Club* or make Wes pick a new actor or movie.  We want the game to continue, so that's why he has that option at the start of the game.  Cliff says *Edward Norton*.  Nathan has two options, say another movie that *Edward Norton* appears in or challenge back to the Cliff.  Nathan says *The Illusionist*.  Now it's Wes's turn and he says *Paul Giamatti*.  Cliff is like "Paul Gia-who?" and challenges Wes.  If Wes can name another movie that *Paul Giamatti* appears in, Cliff gets the first letter B.  If Wes can't name another movie, then Wes gets the letter B.  Let's assume Wes gets the letter B.  Now the order of play reverses and whoever got the letter starts the next round.  As players get four letters spelling BOMB, they are eliminated from the game (this will probably change to just 3 or 4 strikes rather than spelling out a word in the finished game).

=====

###Setup and Build
##### Option 1

Once you fork and clone, [install MongoDB](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) and [redis](http://redis.io/topics/quickstart).

Install server/client deps
```
npm install && bower install
```
start mongo
```
mongod
```
start redis
```
redis-server
```
start the app server
```
grunt serve
```
_Notes:_
_I've run into build problems when using node node <0.11.x.  I recommend installing [n](https://github.com/tj/n) and downloading node 0.11.14.  If you run into build or dependency problems I recommend building the docker images as documented below._

_Please contact me or open issues for any problems you run into._

=====

#####Option 2 (Dockerized)

Fork and clone.

Download [VirtualBox](https://www.virtualbox.org/wiki/Downloads) if you don't have it installed.

Install [Docker](https://docs.docker.com/installation/mac/)

Install [Fig](http://www.fig.sh/install.html)
```
curl -L https://github.com/docker/fig/releases/download/1.0.1/fig-`uname -s`-`uname -m` > /usr/local/bin/fig; chmod +x /usr/local/bin/fig
```

Download the latest [docker-machine](https://github.com/docker/machine/releases) darwin-amd64 release (OS X) or applicable release for your OS.
Once you download the docker-machine binary, copy it to your `/usr/local/bin/` and run
```chmod +x /usr/local/bin/docker-machine```

Create and start a boot2docker vm with docker-machine
```
docker-machine create -d virtualbox iamdb-dev
```

Running `docker-machine env` will spit out the necessary environment variables for running the boot2docker vm.

In VirtualBox settings for the iamdb-dev box, forward the ports `4632`, `6379`, `27017`, and `35729`.

Docker images are managed with Fig. From the project root run `fig up`. This will build the `iamdb_web` and `iamdb_db` containers and start them.  If you want them to run in the background run `fig up -d` instead. You can view logs by running `fig logs`.  To stop/start the containers run `fig stop`/`fig start`.

To stop the boot2docker vm, run `docker-machine stop iamdb-dev` and `docker-machine start iamdb-dev` to start back up.

=====

###Project Notes
Lodash is included in the `util` Angular service as well as other utility functions.

=====

###The Stack
**Client**
- angular 1.3.7
    - bootstrap
    - cookies
    - mocks (dev)
    - resource
    - sanitize
    - scenario (dev)
    - socket.io
    - ui.router
- bootstrap 3.1.1
- font-awesome 4.2.0
- jquery 1.11.2
- jade 1.2.0
- stylus 0.49.0
- lodash 2.4.1

**Server**
- node 0.11.14
- express
    - jwt
- connect
- karma (dev)
    - phantomJS
- lodash
- comb
- mongoose
- passport
    - Facebook
    - Google
    - Local
    - Twitter
- socket.io
  - client
  - jwt
  - redis

**DB**
- mongo

=====
_Notes:_
_You will need a [TMDB](https://www.themoviedb.org/documentation/api) api key for the search forwarding and game validation to work.  [Contact me](https://github.com/wescravens) directly for the key or request your own key and put it in your `server/config/local.env.js`_

_docker-machine is not necessary to build docker containers, but it addresses a big issue with boot2docker by automatically creating shared folders and mounting them as volumes in the docker containers. This allows dev tasks using fswatch to work properly._
