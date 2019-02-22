import React, { Component } from 'react'

import { ValidatedInput, ValidatedForm } from '../index.lib';
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.config = this.buildConfig();
    this.state = {
      text: '',
      minLength: this.config.minLength
    }
  }

  buildConfig = () => {
    const config = {
      minLength: 3
    }
    const args = window.location.search.split('&') || [];
    for (let index = 0; index < args.length; index++) {
      let keyValue = args[index].split('=');
      switch (keyValue[0]) {
        case 'minLength':
        case '?minLength':
          config.minLength = parseInt(keyValue[1], 10);
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

  componen

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
                  <label htmlFor="name" className="col-1 text-right col-form-label">Test text:</label>
                  <div className="col-10">
                    <ValidatedInput required min-length={{ params: this.config.minLength }}>
                      <input type="text" className="form-control" id="testText" placeholder="Enter some text"
                        name="text" onChange={this.onChange} value={this.state.name}
                      />
                    </ValidatedInput>
                  </div>
                  <div className="col-1">
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
