class _MinLengthValidator {
    priority = 1;
    name = 'min-length';
    message = '"{field}" must be at least {params} in length';
    params = 1;
    validate(value) {
        const valid = !value || value.length >= this.params;
        return {
            success: valid,
            message: this.message.replace(/{field}/g, this.field).replace(/{params}/g, this.params)
        }
    }
}

class _MaxLengthValidator {
    priority = 1;
    name = 'max-length';
    message = '"{field}" must be less than {params} in length';
    params = 1;
    validate(value) {
        const valid = !value || value.length <= this.params;
        return {
            success: valid,
            message: this.message.replace(/{field}/g, this.field).replace(/{params}/g, this.params)
        }
    }
}

export const MinLengthValidator = new _MinLengthValidator();
export const MaxLengthValidator = new _MaxLengthValidator();