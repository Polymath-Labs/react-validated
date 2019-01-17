# react-validated

> react

[![NPM](https://img.shields.io/npm/v/react-validated.svg)](https://www.npmjs.com/package/react-validated) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-validated
```

## Usage

Before:

```jsx

  render () {
    return (
      <form onSubmit={this.onSave}>
        <input type="text" placeholder="Enter a Name"
          name="name" onChange={this.handleInputChange} value={this.state.name} />
        <button type="submit" className="btn btn-primary" data-background-color="orange">
          Save
        </button>
      </form>
    )
  }
}
```

After:

```jsx

  render () {
    return (
      <ValidatedForm onSubmit={this.onSave}>
        <ValidatedInput required min-length={{ params: 5 }}>
          <input type="text" className="form-control" id="name" placeholder="Enter a Name"
            name="name" onChange={this.handleInputChange} value={this.state.name} />
        </ValidatedInput>
        <button type="submit" className="btn btn-primary" data-background-color="orange">
          Save
        </button>
      </ValidatedForm>
    )
  }
}
```

Note that onSubmit will only be triggered if validation passes.

## License

LGPL-3.0 © [Polymath Labs](https://github.com/Polymath-Labs)