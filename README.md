# react-validated

> react

[![NPM](https://img.shields.io/npm/v/react-validated.svg)](https://www.npmjs.com/package/react-validated) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-validated
```

## Usage

```jsx
import React, { Component } from 'react'

import { ValidatedInput, ValidatedForm } from 'react-validated';

//...

class Example extends Component {

  // ...

  handleInputChange = () => {
    // ...
  }

  onSave = () => {
    // ...
  }

  render () {
    return (
        <ValidatedForm onSubmit={this.onSave}>
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
    )
  }
}
```

## License

LGPL-3.0 © [Polymath Labs](https://github.com/Polymath-Labs)
