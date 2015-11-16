'use strict';

/** 
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var TicketSchema = new Schema({
	location: {
		type: Schema.ObjectId,
		ref: 'Location'
	},
	category: {
		type: Schema.ObjectId,
		ref: 'Category'
	},
	subcategory: {
		type: Schema.ObjectId,
		ref: 'Subcategory'
	},
	issue: {
		type: Schema.ObjectId,
		ref: 'Issue'
	},
	description: {
		type: String,
		trim: true,
		required: 'Description can not be empty'
	},
	notes: {
		type: Array,
		default: []
	},
	created: {
		type: Date,
		default: Date.now
	},
	createdBy: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	updated: {
		type: Date,
		default: Date.now
	},
	updatedBy: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	iscomplete: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Ticket', TicketSchema);