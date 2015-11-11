'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
	location: {
		type: String,
		trim: true,
		required: 'Location cannot be blank'
	},
	isactive: {
		type: Boolean,
		default: true
	}
});

mongoose.model('Location', LocationSchema);