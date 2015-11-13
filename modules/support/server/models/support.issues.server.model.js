'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Issue Schema
 */
var IssueSchema = new Schema({
	issue: {
		type: String,
		trim: true,
		required: 'Name cannot be blank'
	},
	isactive: {
		type: Boolean,
		default: true
	},
	parentSubcategory: {
		type: String,
		trim: true,
		required: 'Parent SubCategory can not be blank'
	}
});

mongoose.model('Issue', IssueSchema);