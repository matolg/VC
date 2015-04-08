$(function() {
    $('#performValidation').on('click', function() {
        var $elem = $('#validationTarget');
        var result = vc($elem.val())
                        .addValidator(validators.requiredValidator)
                        .addValidator(validators.requiredValidator)
                        .addValidator(validators.withoutSpacesValidator)
                        .validate();
        console.log(result);
    });
});