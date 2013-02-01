SpaceChat
=========

Getting Started
---------------

For automating common tasks, we use [Fabric](http://fabfile.org). Install it first using `pip install fabric`.

Run `fab bootstrap` to set up your environment (currently, this just installs a bunch fo node modules for you). Run `fab node` to start a dev Node server.

Stack
-----
The stack currently consists of:

* MongoDB
* node.js
* {{ mustache }}
* Express
* jQuery
* Socket.IO
* LESS

Structure
---------
The `src/` directory is broken down by technology/language. `mustache` contains template files. `node` contains the server source code. `public` is static assets.
