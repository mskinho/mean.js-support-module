'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	helper = require('./helperFunctions/support.models.helperFunctions');

/**
 * Location Schema
 */
var LocationSchema = new Schema({
	// this gives us an easy code to compare to and display in the url
	// server controller should also strip all whitespace
	locationCode: {
		type: String,
		trim: true,
		set: helper.cleanCode,
		required: 'Location code is required',
		unique: true
	},
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