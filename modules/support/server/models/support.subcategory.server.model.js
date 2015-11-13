'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * SubCategory Schema
 */
var SubcategorySchema = new Schema({
	subcategory: {
		type: String,
		trim: true,
		required: 'Name cannot be blank'
	},
	isactive: {
		type: Boolean,
		default: true
	},
	parentCategory: {
		type: String,
		trim: true,
		required: 'Parent Category can not be blank'
	}
});

mongoose.model('Subcategory', SubcategorySchema);