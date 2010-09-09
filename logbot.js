var sys = require('sys');
var irc = require('irc');
var mysql = require('mysql');
var config = require('./config').config;


var db = new mysql.Client({
	host: config.db_host,
	user: config.db_user,
	password: config.db_pass,
	database: config.db_name,
});


function logbot(){

	var self = this;

	this.client = new irc.Client(config.irc_server, config.irc_nick, {
		password: config.irc_password,
		channels: config.irc_channels,
	});

	this.client.on('raw', function(msg){
		var raw = msg.rawCommand + ' ' + msg.args.join(' ');
		//console.log("    >>>> "+raw);
	});

	this.client.on('join', function(chan, nick){
		if (nick == config.irc_nick){
			console.log('Now logging in '+chan);
			self.client.say(chan, 'Now logging in '+chan);
		}else{
			self.log_item(chan, nick, 'join');
		}
	});

	this.client.on('part', function(chan, nick, reason){
		if (nick != config.irc_nick){
			self.log_item(chan, nick, 'part', reason);
		}
	});

	this.client.on('message', function(nick, to, text){
		self.log_item(to, nick, 'text', text);
	});

	this.client.on('topic',  function(chan, topic, nick){
		self.log_item(chan, nick, 'topic', topic);
	});

	// notice
	// nick
	// quit
	// mode
	// kick
	// ctcp

	this.log_item = function(chan, nick, event, text){

		console.log("event on "+chan+" : "+nick+" / "+event+" / "+text);

		var hash = {
			when  : Math.round(new Date().getTime() / 1000),
			chan  : db.escape(chan),
			user  : db.escape(nick),
			event : db.escape(event),
			text  : db.escape(text),
		};

		self.db_insert(config.db_table, hash);
	}

	this.db_insert = function(table, hash){

		var fields = [];
		var values = [];

		for (var i in hash){
			fields.push(i);
			values.push(hash[i]);
		}

		fields = '`' + fields.join('`, `') + '`';
		values = values.join(", ");

		self.db_query("INSERT INTO "+table+" ("+fields+") VALUES ("+values+")");
	}

	this.db_query = function(sql){
		//console.log('query: '+sql);

		db.on('error', function(){
			console.log('ERROR: '+sys.inspect(arguments));
		});

		db.connect();
		db.query(sql, function(){
			//console.log('query ok');
			db.end();
		}, function(error){
			console.log('MySQL Error: '+sys.inpect(error));
		});
	}
}

new logbot();

