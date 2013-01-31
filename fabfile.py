from __future__ import with_statement
import os
from fabric.api import run, local, settings, abort, env, cd, lcd

def node():
  'Run a Node server for development'
  with lcd('src/node'):
    local('node app.js')

def bootstrap():
  'Bootstrap your development environment'
  with lcd('src/node'):
    local('sudo npm install')

