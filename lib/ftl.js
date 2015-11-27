'use strict';

const cwd = process.cwd();
const path = require('path');
const Freemarker = require('freemarker.js');

module.exports = function *(){
  var fm = new Freemarker({
		viewRoot: path.join(cwd),
		options: {
			/** for fmpp */
		}
	});

	var ftlName = this.path.replace('/', '');
	//Sync render

	var result = fm.renderSync(ftlName, {});

	return this.body = result;

};
