logbot
======

A very simple IRC bot. Accepts messages to broadcast via UDP and logs messages to MySQL.


Requirements
------------

You'll need to grab:

* felixge's excellent <a href="http://github.com/felixge/node-mysql">node-mysql</a>
* martynsmith's <a href="http://github.com/martynsmith/node-irc">node-irc</a>

You can probably install these via <code>npm</code>, but I still don't understand how npm chooses forks.
Clone the above masters and <code>npm link</code> them if you're unsure.


Setup
-----

1. Copy <code>config.js.example</code> to <code>config.js</code> and modify the values.
1. Create a table in MySQL using <code>schema.sql</code>
1. Start it up - <code>node logbot.pl</code>
1. To send a simple test message, you can use the included perl utility - <code>perl inject.pl "Message!"</code>
