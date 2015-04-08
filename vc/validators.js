(function (name, context, definition) {

	if (typeof module != 'undefined' && module.exports) 
		module.exports = definition();
	else if (typeof define == 'function' && define.amd) 
		define(definition);
	else 
		context[name] = definition();

})('validators', this, function() {

	"use strict";

	var validators = {};

	validators.requiredValidator = function(value) {
		return {
			success: !!value,
			message: 'Val is required'
		}
	}

	validators.withoutSpacesValidator = function(value) {
		return {
			success: !value || value[0] !== ' ' && value[value.length-1] !== ' ',
			message: 'Val should have no trailing spaces'
		}
	}

	return validators;
});