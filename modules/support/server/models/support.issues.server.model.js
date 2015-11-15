'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	helper = require('./helperFunctions/support.models.helperFunctions');

/**
 * Issue Schema
 */
var IssueSchema = new Schema({
	// this gives us an easy code to compare to and display in the url
	// server controller should also strip all whitespace
	issueCode: {
		type:String,
		trim: true,
		set : helper.cleanCode,
		required: 'Issue code cannot be blank'
	},
	issue: {
		type: String,
		trim: true,
		required: 'Issue cannot be blank'
	},
	isactive: {
		type: Boolean,
		default: true
	},
	// since we don't have foreign keys in mongo, the combination of catCode
	// and subCode will serve to allow for correct filtering
	catCode: {
		type: String,
		trim: true,
		required: 'Parent category can not be blank'
	},
	subCode: {
		type: String,
		trim: true,
		required: 'Parent Subcategory can not be blank'
	}
});

IssueSchema.index({issueCode: 1, catCode: 1, subCode: 1}, {unique: true});

mongoose.model('Issue', IssueSchema);