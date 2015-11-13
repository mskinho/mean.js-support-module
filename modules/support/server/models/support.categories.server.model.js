'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	category: {
		type: String,
		trim: true,
		required: 'Name cannot be blank'
	},
	isactive: {
		type: Boolean,
		default: true
	}
});

mongoose.model('Category', CategorySchema);