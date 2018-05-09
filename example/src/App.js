import React, { Component } from 'react'

import { ValidatedInput, ValidatedForm } from 'react-validated';
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component {

  state = {
    name: ''
  }

  onSave = () => {
    alert('Saved "' + this.state.name + '"')
  }

  render() {
    return (
      <div>
        <ValidatedForm className="form-horizontal" onSubmit={this.onSave}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-1 col-form-label">Name</label>
            <div className="col-sm-4">
              <ValidatedInput required min-length={{ params: 5 }}>
                <input type="text" className="form-control" id="name" placeholder="Enter a Name"
                  name="name" onChange={this.handleInputChange} value={this.state.name}
                />
              </ValidatedInput>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-10 text-right">
              <button type="submit" className="btn btn-primary" data-background-color="orange">
                Save
              </button>
            </div>
          </div>
        </ValidatedForm>
      </div>
    )
  }
}
