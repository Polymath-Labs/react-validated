class RequiredValidator {
    priority = 0;
    name = 'required';
    message = 'A value must be specified for the "{field}" field';
    validate(value) {
        const valid = !!value && value !== '';
        return {
            success: valid,
            message: this.message.replace(/{field}/g, this.field)
        }
    }
}

export default new RequiredValidator();