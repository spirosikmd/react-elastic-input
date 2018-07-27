# react-elastic-input

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
