logbot
======

A very simple IRC bot. Accepts messages to broadcast via UDP and logs messages to MySQL.


Setup
-----

1. Copy <code>config.js.exmaple</code> to <code>config.js</code> and modify the values.
1. Create a table in MySQL using <code>schema.sql</code>
1. Start it up - <code>node logbot.pl</code>
1. To send a simple test message, you can use the included perl utility - <code>perl inject.pl "Message!"</code>
