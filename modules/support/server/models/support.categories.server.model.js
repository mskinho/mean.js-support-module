'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	helper = require('./helperFunctions/support.models.helperFunctions');

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	// this gives us an easy code to compare to and display in the url
	// server controller should also strip all whitespace
	catCode: {
		type: String,
		trim: true,
		unique: true,
		set: helper.cleanCode,
		required: 'Category Code cannot be blank'
	},
	category: {
		type: String,
		trim: true,
		required: 'Category cannot be blank'
	},
	isactive: {
		type: Boolean,
		default: true
	}
});

mongoose.model('Category', CategorySchema);