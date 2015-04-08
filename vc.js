(function (name, context, definition) {

	if (typeof module != 'undefined' && module.exports) 
		module.exports = definition();
	else if (typeof define == 'function' && define.amd) 
		define(definition);
	else 
		context[name] = definition();

})('vc', this, function() {

	"use strict";

	var query = [];

	function carry(func) {
		var args = Array.prototype.slice.call(arguments, 1);
		return function() {
			return func.apply(this, Array.prototype.slice.call(arguments).concat(args));
		}
	}

	function performValidation(value) {
		var validationResult = { 
			success: true, 
			messages: [] 
		}

		_foreach(query, function(validator) {
			var validatorResult = validator(value);

			validationResult.success &= validatorResult.success;

			if (!validatorResult.success)
				validationResult.messages.push(validatorResult.message);
		});

		return validationResult;
	}

	function _foreach(collection, handler) {
		for(var i=0; i<query.length; i++) {
			handler(collection[i]);
		}
	}

	function vq(value) {
		this.value = value;
	}

	vq.prototype.addValidator = function(validator) {
		
		if (query.indexOf(validator) === -1) {
			var args = Array.prototype.slice.call(arguments, 1);
			query.push(carry.apply(this, [validator].concat(args)));
		}
		
		return this;
	}

	vq.prototype.validate = function() {
		return performValidation(this.value);
	}

	return function (value) { return new vq(value); };
});