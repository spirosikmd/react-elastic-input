import React from 'react';
import PropTypes from 'prop-types';

const TEXT_ATTRIBUTES = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'letterSpacing',
  'textTransform',
  'wordSpacing',
];

const BORDER_BOX_ATTRIBUTES = [
  'paddingLeft',
  'paddingRight',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRightStyle',
  'borderRightWidth',
];

const PADDING_BOX_ATTRIBUTES = ['paddingLeft', 'paddingRight'];

class ElasticInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.createWrapper();
    this.createMirror();

    this.updateInputWidth(
      this.inputRef.current,
      this.props.placeholder,
      this.mirror
    );
  }

  componentWillUnmount() {
    this.mirror.remove();
    this.wrapper.remove();
    cancelAnimationFrame(this.updateInputWidthFrame);
  }

  createWrapper() {
    this.wrapper = document.createElement('div');

    // Visually hide the wrapper element
    this.wrapper.style.position = 'fixed';
    this.wrapper.style.top = '-999px';
    this.wrapper.style.left = '0';

    document.body.appendChild(this.wrapper);
  }

  createMirror() {
    this.mirror = document.createElement('span');

    this.mirror.style.whiteSpace = 'pre';

    const inputComputedStyle = window.getComputedStyle(this.inputRef.current);
    this.setMirrorStyle(this.mirror, inputComputedStyle);

    this.wrapper.appendChild(this.mirror);
  }

  getWidthInPixels(value, mirror) {
    mirror.innerText = value;
    const delta = 1;
    return `${mirror.offsetWidth + delta}px`;
  }

  updateInputWidth(input, value, mirror) {
    this.updateInputWidthFrame = requestAnimationFrame(() => {
      input.style.width = this.getWidthInPixels(value, mirror);
    });
  }

  setMirrorStyle(mirror, inputComputedStyle) {
    TEXT_ATTRIBUTES.forEach((value) => {
      mirror.style[value] = inputComputedStyle[value];
    });

    mirror.style.paddingLeft = inputComputedStyle.textIndent;

    if (inputComputedStyle.boxSizing === 'border-box') {
      BORDER_BOX_ATTRIBUTES.forEach((value) => {
        mirror.style[value] = inputComputedStyle[value];
      });
    } else if (inputComputedStyle.boxSizing === 'padding-box') {
      PADDING_BOX_ATTRIBUTES.forEach((value) => {
        mirror.style[value] = inputComputedStyle[value];
      });
    }
  }

  handleInputChange = (event) => {
    const value = event.target.value || this.props.placeholder;
    this.updateInputWidth(this.inputRef.current, value, this.mirror);

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
  };

  render() {
    /* eslint-disable no-unused-vars */
    const { type, onChange, ...props } = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <input
        type={type}
        ref={this.inputRef}
        onChange={this.handleInputChange}
        {...props}
      />
    );
  }
}

ElasticInput.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'search', 'tel', 'url']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

ElasticInput.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
};

export default ElasticInput;
