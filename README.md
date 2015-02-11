iamdb
=====
A web game based on B.O.M.B.

###How To Play
Let's say there are three players.  We'll use the first members of this repo for the example -- Wes, Cliff, and Nathan.
The game starts with Wes providing a movie title or actor.  Let's say Wes said *Fight Club*.  Cliff has two options since this is the first interaction in the game.  He can give another actor in *Fight Club* or make Wes pick a new actor or movie.  We want the game to continue, so that's why he has that option at the start of the game.  Cliff says *Edward Norton*.  Nathan has two options, say another movie that *Edward Norton* appears in or challenge back to the Cliff.  Nathan says *The Illusionist*.  Now it's Wes's turn and he says *Paul Giamatti*.  Cliff is like "Paul Gia-who?" and challenges Wes.  If Wes can name another movie that *Paul Giamatti* appears in, Cliff gets the first letter B.  If Wes can't name another movie, then Wes gets the letter B.  Let's assume Wes gets the letter B.  Now the order of play reverses and whoever got the letter starts the next round.  As players get four letters spelling BOMB, they are eliminated from the game (this will probably change to just 3 or 4 strikes rather than spelling out a word in the finished game).

=====

###Setup and Build
##### Option 1 (simple)

Once you fork and clone, [install MongoDB](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) if you haven't already, then run
```
npm install && bower install
```
then, startup a mongo daemon on another process
```
mongod
```
then run
```
grunt serve
```
_Notes:_
_I've run into build problems when using node node <0.11.x.  I recommend installing [n](https://github.com/tj/n) and downloading node 0.11.14.  If you run into build or dependency problems I recommend build the docker images as documented below._

_Please contact me or open issues for any problems you run into._

=====

#####Option 2 (kinda complex)

Clone the repo.

Download [VirtualBox](https://www.virtualbox.org/wiki/Downloads) if you don't have it installed.

Download [Docker](https://docs.docker.com/installation/mac/)

Download [Fig](http://www.fig.sh/install.html)
```
curl -L https://github.com/docker/fig/releases/download/1.0.1/fig-`uname -s`-`uname -m` > /usr/local/bin/fig; chmod +x /usr/local/bin/fig
```

Download the latest [docker-machine](https://github.com/docker/machine/releases) (currently in alpha) darwin-amd64 release (OS X) or applicable release for your OS.
Once you download the docker-machine binary, copy it to your `/usr/local/bin/` and run
```sudo chmod -R 777 /usr/local/bin/docker-machine```

Start up a boot2docker vm with docker-machine
```
docker-machine create -d virtualbox iamdb-dev
```

Running `docker-machine env` will spit out the necessary environment variables for running containers.

In VirtualBox settings for the iamdb-dev box, forward the ports `4632`, `27017`, and `35729`.

Docker images are managed with Fig. From the project root run `fig up`. This will build the `iamdb_web` and `iamdb_db` containers and start them.  If you want them to run in the background as a daemon run `fig up -d` instead. You can view logs by running `fig logs`.  To stop the containers run `fig stop`.

To stop the machine, run `docker-machine stop iamdb-dev` and `docker-machine start iamdb-dev` to start back up. 

_Note: I've run into problems resarting stopped machines. If this happens, remove the machine and recreate it._

```
docker-machine rm iamdb-dev && docker-machine create -d virtualbox iamdb-dev
```

###The Stack
**Client**
- Angular 1.3.7
    - Bootstrap
    - Cookies
    - Mocks (dev)
    - Resource
    - Sanitize
    - Scenario (dev)
    - Socket IO
    - UI Router
- Bootstrap 3.1.1
- Font Awesome 4.2.0
- jQuery 1.11.2
- Jade 1.2.0
- Lodash 2.4.1
- Stylus 0.49.0

**Server**
- Node >=0.10.0
- Connect
    - Mongo
- Express
    - JWT
    - Session
- Jade
- Karma (dev)
    - PhantomJS
- Lodash
- Mongoose
- Passport
    - Facebook
    - Google OAuth
    - Local
    - Twitter
- Should
- Socket IO

=====
_Notes:_
_You will need a [TMDB](https://www.themoviedb.org/documentation/api) api key for the search forwarding and game validation to work.  [Contact me](https://github.com/wescravens) directly for the key or request your own key and put it in your `server/config/local.env.js`_

_docker-machine is not necessary to build docker containers, but it addresses a big issue with boot2docker by automatically creating shared folders and mounting them as volumes in the docker containers. This allows dev tasks using fswatch to work properly._
