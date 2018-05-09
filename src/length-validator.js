class _MinLengthValidator {
    priority = 1;
    name = 'min-length';
    message = '"{field}" must be at least {params} in length';
    params = 1;
    validate(value) {
        const valid = !!value && value.length >= this.params;
        return {
            success: valid,
            message: this.message.replace(/{field}/g, this.field).replace(/{params}/g, this.params)
        }
    }
}

export const MinLengthValidator = new _MinLengthValidator();