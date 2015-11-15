'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	helper = require('./helperFunctions/support.models.helperFunctions');

/**
 * SubCategory Schema
 */
var SubcategorySchema = new Schema({
	// this gives us an easy code to compare to and display in the url
	subCode: {
		type: String,
		trim: true,
		set: helper.cleanCode,
		required: 'Subcategory code cannot be blank'
	},
	subcategory: {
		type: String,
		trim: true,
		required: 'Subcategory cannot be blank'
	},
	isactive: {
		type: Boolean,
		default: true
	},
	catCode: {
		type: String,
		trim: true,
		required: 'Parent Category can not be blank'
	}
});

// Want unique subcategories under each category
SubcategorySchema.index({subCode: 1, catCode: 1}, {unique: true});

mongoose.model('Subcategory', SubcategorySchema);