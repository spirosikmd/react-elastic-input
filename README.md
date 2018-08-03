# react-elastic-input

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![PRs Welcome][prs-badge]](http://makeapullrequest.com)

A React component to render input elements that grow as their content grows

## Usage

Install `react-elastic-input` from npm:

```
npm install react-elastic-input --save
```

and then use it in your app:

```jsx
import ElasticInput from 'react-elastic-input';

function MyComponent() {
  return <ElasticInput placeholder="type..." />;
}
```

## Props

You can specify all props that an `input` element accepts. These will be passed as props to the `input` element. `react-elastic-input` supports the following types:

- `type` - The input type, one of `['text', 'email', 'password', 'search', 'tel', 'url']`.

[version-badge]: https://img.shields.io/npm/v/react-elastic-input.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-elastic-input
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[build-badge]: https://circleci.com/gh/spirosikmd/react-elastic-input.svg?style=svg
[build]: https://circleci.com/gh/spirosikmd/react-elastic-input
