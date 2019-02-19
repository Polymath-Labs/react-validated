class RequiredCheckboxValidator {
    priority = 0;
    name = 'required';
    message = 'At least one value must be checked from "{field}" field';
    validate(values) {
        const valid = !!values && values.includes(true);

        return {
            success: valid,
            message: this.message.replace(/{field}/g, this.field)
        }
    }
}

export default new RequiredCheckboxValidator();