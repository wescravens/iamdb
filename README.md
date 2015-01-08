iamdb
=====
A web game based on B.O.M.B.

###How To Play
Let's say there are three players.  We'll use the first members of this repo for the example -- Wes, Cliff, and Nathan.
The game starts with Wes providing a movie title or actor.  Let's say Wes said *Fight Club*.  Cliff has two options since this is the first interaction in the game.  He can give another actor in *Fight Club* or make Wes pick a new actor or movie.  We want the game to continue, so that's why he has that option at the start of the game.  Cliff says *Edward Norton*.  Nathan has two options, say another movie that *Edward Norton* appears in or challenge back to the Cliff.  Nathan says *The Illusionist*.  Now it's Wes's turn and he says *Paul Giamatti*.  Cliff is like "Paul Gia-who?" and challenges Wes.  If Wes can name another movie that *Paul Giamatti* appears in, Cliff gets the first letter B.  If Wes can't name another movie, then Wes gets the letter B.  Let's assume Wes gets the letter B.  Now the order of play reverses and whoever got the letter starts the next round.  As players get four letters spelling BOMB, they are eliminated from the game (this will probably change to just 3 or 4 strikes rather than spelling out a word in the finished game).

=====

###Setup and Build
Once you fork and clone, run
```
npm install
```
then
```
grunt serve
```

=====

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


