import React from 'react';

import './styles.css';
import RequiredValidator from './validators/required-validator';
import { MinLengthValidator, MaxLengthValidator } from './validators/length-validator';

const VALIDATION_RULES = {};
VALIDATION_RULES[RequiredValidator.name] = RequiredValidator;
VALIDATION_RULES[MinLengthValidator.name] = MinLengthValidator;
VALIDATION_RULES[MaxLengthValidator.name] = MaxLengthValidator;

export class ValidatedInput extends React.Component {

    constructor(props) {
        super(props);

        let inputs = 0;
        let fieldName;
        React.Children.forEach(this.props.children, (child) => {
            if (child.type === 'input' || child.type === 'textarea') {
                inputs++;
                fieldName = this.props.fieldLabel || _extractFieldLabelFromName(child.props.name);
            }
        });
        if (inputs > 1) {
            throw new Error('Validated component can only host one input component at a time');
        }

        const validation = { rules: [] };
        for (var property in props) {
            if (VALIDATION_RULES.hasOwnProperty(property)) {
                let message = (typeof props[property] === 'string' && props[property]) ||
                    (typeof props[property] === 'object' && props[property].message) ||
                    VALIDATION_RULES[property].message;
                let params = typeof props[property] === 'object' && props[property].params;
                let configuredRule = {
                    name: VALIDATION_RULES[property].name,
                    message: message,
                    params: params,
                    field: fieldName
                };
                configuredRule.validate = VALIDATION_RULES[property].validate.bind(configuredRule);
                //console.log('configured rule', configuredRule);
                validation.rules.push(configuredRule)
            }
        }
        this.state = {
            validation
        }
    }

    render = () => {
        const $this = this;
        return (
            <div className="validated">
                {React.Children.map(this.props.children, (child) => {
                    if (child.type === 'input' || child.type === 'textarea') {
                        return React.cloneElement(child, {
                            onChange: (...args) => {
                                if (child.props.onChange) {
                                    child.props.onChange.apply(child, args);
                                }
                                $this._onChangeOrBlur(...args);
                            },
                            onBlur: $this._onChangeOrBlur.bind($this),
                            ref: '_input'
                        })
                    }

                    return child;
                })}
                <div className="validation-message">{this.state.validation.message}</div>
            </div>
        )
    }

    validate = () => {
        // console.log('this.refs', this.refs);
        return this._validate(this.refs._input, this.refs._input.value);
    }

    _onChangeOrBlur = (event) => {
        //console.log('_onChange', event);
        const target = event.target;
        const value = target.value;
        this._validate(target, value);
    }

    _validate = (target, value) => {
        if (!this.state.validation || !this.state.validation.rules || !this.state.validation.rules.length) {
            return true;
        }
        for (var index = 0; index < this.state.validation.rules.length; index++) {
            let rule = this.state.validation.rules[index];
            let result = rule.validate(value);
            if (!result.success) {
                this.setState({
                    validation: Object.assign({}, this.state.validation, {
                        message: result.message
                    })
                });
                return false;
            }
        }
        // If we got this far, no rules were violated
        this.setState({
            validation: Object.assign({}, this.state.validation, {
                message: null
            })
        });
        return true;
    }
}

export class ValidatedForm extends React.Component {

    // constructor(props) {
    //     super(props);

    //     //this._identifyValidatedChildren(props.children);
    //     //console.log('validatedChildren', this.validatedChildren);
    // }

    render = () => {
        this.validatedChildren = [];
        return (
            <form onSubmit={this._onSubmit} className={this.props.className}>
                {this._identifyValidatedChildren(this.props.children)}
            </form>
        )
    }

    _identifyValidatedChildren = (children) => {
        const $this = this;
        return React.Children.map(children, (child) => {
            if (!child) return child;
            //console.log('child', [child.props && child.props.id, child]);
            //debugger;
            if (child.type === ValidatedInput) {
                return React.cloneElement(child, {
                    ref: validated => $this.validatedChildren.push(validated)
                })
            }
            if (child.props && child.props.children) {
                return React.cloneElement(child, {
                    children: $this._identifyValidatedChildren(child.props.children)
                })
            }
            return child; //React.cloneElement(child);
        });
    }

    _onSubmit = (event) => {
        event.preventDefault();
        let allValid = true;

        for (var index = 0; index < this.validatedChildren.length; index++) {
            let validatedChild = this.validatedChildren[index];
            if (!validatedChild) continue;
            allValid &= validatedChild.validate();
        }

        if (allValid && this.props.onSubmit) this.props.onSubmit(event);
    }
}

const _extractFieldLabelFromName = (name) => {
    const letters = name.split('');
    const processedLetters = [];
    letters.forEach((letter, index) => {
        if (index === 0) {
            processedLetters.push(letter.toUpperCase());
            return;
        }
        if (letter === letter.toUpperCase()) {
            if (letters[index - 1] !== letters[index - 1].toUpperCase()) {
                processedLetters.push(' ');
            }
            processedLetters.push(letter);
            return;
        }
        processedLetters.push(letter);
    });
    return processedLetters.join('');
};