class _MinCheckedValidator {
    priority = 1;
    name = 'min-checked';
    message = '"{field}" there must be at least {params} checked';
    params = 1;
    validate(values) {
        const valid = !!values && values.filter(v => v).length >= this.params;
        return {
            success: valid,
            message: this.message.replace(/{field}/g, this.field).replace(/{params}/g, this.params)
        }
    }
}

class _MaxCheckedValidator {
    priority = 1;
    name = 'max-checked';
    message = '"{field}" must have at most {params} checked';
    params = 1;
    validate(values) {
        const valid = !!values && values.filter(v => v).length <= this.params;
        return {
            success: valid,
            message: this.message.replace(/{field}/g, this.field).replace(/{params}/g, this.params)
        }
    }
}

export const MinCheckedValidator = new _MinCheckedValidator();
export const MaxCheckedValidator = new _MaxCheckedValidator();