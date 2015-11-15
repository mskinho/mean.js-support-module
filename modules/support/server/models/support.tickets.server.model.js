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
		type: String,
		trim: true
	},
	category: {
		type: String
	}, 
	subcategory: {
		type: String
	},
	issue: {
		type: String
	},
	description: {
		type: String,
		trim: true,
		required: "Description can not be empty"
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
		type: String
	},
	updated: {
		type: Date,
		default: Date.now
	},
	updatedBy: {
		type: String
	},
	iscomplete: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Ticket', TicketSchema);