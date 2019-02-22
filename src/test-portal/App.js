import React, { Component } from 'react'

import { ValidatedInput, 
  ValidatedRadioGroup,
  ValidatedCheckboxGroup,
  ValidatedForm } from '../index.lib';
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.config = this.buildConfig();
    this.state = {
      text: '',
      message: '',
      size: '',
      ingredients: [],
      minLength: this.config.minLength,
      maxLength: this.config.maxLength
    }
  }

  buildConfig = () => {
    const config = {
      minLength: 3,
      maxLength: 10
    }
    const args = window.location.search.split('&') || [];
    for (let index = 0; index < args.length; index++) {
      let keyValue = args[index].split('=');
      switch (keyValue[0]) {
        case 'minLength':
        case '?minLength':
          config.minLength = parseInt(keyValue[1], 10);
          break;
        case 'maxLength':
        case '?maxLength':
          config.maxLength = parseInt(keyValue[1], 10);
          break; 
        default:
        // nothing to do
      }
    }
    return config;
  }

  onSave = () => {
    alert('Saved "' + this.state.name + '"')
  }

  onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }


  render() {

    return (
      <div className="row">
        <div className="col-8 offset-2 mt-3">
          <div className="card">
            <div className="card-header">
              <h4 className="">Input Validator</h4>
            </div>
            <div className="card-body">
              <ValidatedForm className="form-horizontal" onSubmit={this.onSave}>
                <div className="form-group row">
                  <label htmlFor="name" className="col-2 text-right col-form-label">Test text:</label>
                  <div className="col-10">
                    <ValidatedInput required min-length={{ params: this.config.minLength }} max-length={{ params: this.config.maxLength }}>
                      <input type="text" className="form-control" id="testText" placeholder="Enter some text"
                        name="text" onChange={this.onChange} value={this.state.name}
                      />
                    </ValidatedInput>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="message" className="col-2 text-right col-form-label">
                    Message text
                  </label>
                  <div className="col-10">
                    <ValidatedInput required min-length={{ params: this.config.minLength }} max-length={{ params: this.config.maxLength }}>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        placeholder="Enter a message"
                        rows={3}
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </ValidatedInput>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inlineRadioOptions" className="col-2 text-right col-form-label">Pizza size:</label>
                  <div className="col-10">
                    <ValidatedRadioGroup required>
                      <div className="form-check form-check-inline">
                        <input
                          name="size"
                          id="size1"
                          type="radio"
                          value="small"
                          className="form-check-input"
                          checked={this.state.size === 'small'}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label" htmlFor="size1">
                          Small
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          id="size2"
                          name="size"
                          type="radio"
                          value="medium"
                          className="form-check-input"
                          checked={this.state.size === 'medium'}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label" htmlFor="size2">
                          Medium
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          id="size3"
                          name="size"
                          type="radio"
                          value="large"
                          className="form-check-input"
                          checked={this.state.size === 'large'}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label" htmlFor="size3">
                          Large
                        </label>
                      </div>
                    </ValidatedRadioGroup>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inlineRadioOptions" className="col-2 text-right col-form-label">Ingredients:</label>
                  <div className="col-10">
                    <ValidatedCheckboxGroup>
                      <div className="form-check form-check-inline">
                        <input
                          id="ingredient1"
                          type="checkbox"
                          name="ingredients"
                          className="form-check-input"
                          defaultValue="peppers"
                        />
                        <label className="form-check-label" htmlFor="ingredient1">
                          Green Peppers
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          id="ingredient2"
                          type="checkbox"
                          name="ingredients"
                          className="form-check-input"
                          defaultValue="onions"
                        />
                        <label className="form-check-label" htmlFor="ingredient2">
                          Onions
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          id="ingredient3"
                          type="checkbox"
                          name="ingredients"
                          className="form-check-input"
                          defaultValue="mushrooms"
                        />
                        <label className="form-check-label" htmlFor="ingredient3">
                          Mushrooms
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          id="ingredient4"
                          type="checkbox"
                          name="ingredients"
                          className="form-check-input"
                          defaultValue="garlic"
                        />
                        <label className="form-check-label" htmlFor="ingredient4">
                          Garlic
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input 
                          type="checkbox"
                          id="ingredient5"
                          name="ingredients"
                          className="form-check-input"
                          defaultValue="olives"
                        />
                        <label className="form-check-label" htmlFor="ingredient5">
                          Olives
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input 
                          id="ingredient6"
                          type="checkbox"
                          name="ingredients"
                          className="form-check-input"
                          defaultValue="pineapples"
                        />
                        <label className="form-check-label" htmlFor="ingredient6">
                          Pineapples
                        </label>
                      </div>
                    </ValidatedCheckboxGroup>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-10 offset-2">
                    <button type="submit" className="btn btn-success">Save</button>
                  </div>
                </div>
              </ValidatedForm>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h4 className="">Validator Config</h4>
            </div>
            <div className="card-body">
              <form className="form-horizontal" action="/">
                <div className="form-group row">
                  <label htmlFor="minLength" className="col-2 text-right col-form-label">Min Length:</label>
                  <div className="col-10">
                    <input type="number" className="form-control" id="minLength" placeholder="Enter a min length"
                      name="minLength" onChange={this.onChange} value={this.state.minLength}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="maxLength" className="col-2 text-right col-form-label">Max Length:</label>
                  <div className="col-10">
                    <input type="number" className="form-control" id="maxLength" placeholder="Enter a max length"
                      name="maxLength" onChange={this.onChange} value={this.state.maxLength}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-10 offset-2">
                    <button type="submit" className="btn btn-primary">Update Validation Config</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
