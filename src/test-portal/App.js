import React, { Component } from 'react'

import { ValidatedInput, ValidatedForm } from '../index.lib';
import 'bootstrap/dist/css/bootstrap.css'
import '../css/test-portal.css';

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
      maxLength: this.config.maxLength,
      minChecked: this.config.minChecked,
      maxChecked: this.config.maxChecked
    }
  }

  buildConfig = () => {
    const config = {
      minLength: 3,
      maxLength: 10,
      minChecked: 1,
      maxChecked: 3
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
        case 'minChecked':
        case '?minChecked':
          config.minChecked = parseInt(keyValue[1], 10);
          break;
        case 'maxChecked':
        case '?maxChecked':
          config.maxChecked = parseInt(keyValue[1], 10);
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

  handleCheckboxChange = (event) => {
    if (this.state.ingredients.indexOf(event.target.value) !== -1) {
      this.setState({
        ingredients: this.state.ingredients.filter((ingredient) => {
          return ingredient !== event.target.value;
        })
      });
    } else {
      this.setState({
        ingredients: [...this.state.ingredients, event.target.value]
      })
    }
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
                  <label htmlFor="message" className="col-2 text-right col-form-label">
                    Radio
                  </label>
                  <div className="col-10 radio-group">
                    <div className="form-check form-check-inline position-static">
                      <ValidatedInput required>
                        <input type="radio" className="form-check-input" id="radio-1"
                          name="radio" onChange={this.onChange} value='value1'
                        />
                      </ValidatedInput>
                      <label className="form-check-label" htmlFor="radio-1">First</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <ValidatedInput required>
                        <input type="radio" className="form-check-input" id="radio-2"
                          name="radio" onChange={this.onChange} value='value2'
                        />
                      </ValidatedInput>
                      <label className="form-check-label" htmlFor="radio-2">Second</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <ValidatedInput required>
                        <input type="radio" className="form-check-input" id="radio-3"
                          name="radio" onChange={this.onChange} value='value3'
                        />
                      </ValidatedInput>
                      <label className="form-check-label" htmlFor="radio-3">Third</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="message" className="col-2 text-right col-form-label">
                    Checkbox
                  </label>
                  <div className="col-10 checkbox-group">
                    <div className="form-check form-check-inline position-static">
                      <ValidatedInput required min-length={{ params: 1 }} max-length={{ params: 2 }}>
                        <input type="checkbox" className="form-check-input" id="checkbox-1"
                          name="checkbox" onChange={this.onChange} value='value1'
                        />
                      </ValidatedInput>
                      <label className="form-check-label" htmlFor="checkbox-1">First</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <ValidatedInput required min-length={{ params: 1 }} max-length={{ params: 2 }}>
                        <input type="checkbox" className="form-check-input" id="checkbox-2"
                          name="checkbox" onChange={this.onChange} value='value2'
                        />
                      </ValidatedInput>
                      <label className="form-check-label" htmlFor="checkbox-2">Second</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <ValidatedInput required min-length={{ params: 1 }} max-length={{ params: 2 }}>
                        <input type="checkbox" className="form-check-input" id="checkbox-3"
                          name="checkbox" onChange={this.onChange} value='value3'
                        />
                      </ValidatedInput>
                      <label className="form-check-label" htmlFor="checkbox-3">Third</label>
                    </div>
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