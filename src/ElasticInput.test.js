import React from 'react';
import { mount } from 'enzyme';
import ElasticInput from './ElasticInput';

global.window.getComputedStyle = jest.fn().mockReturnValue({});

const div = global.document.createElement('div');
global.document.body.appendChild(div);

const renderComponent = (props) => {
  return mount(<ElasticInput {...props} />, { attachTo: div });
};

const testStyleProperties = (mirrorStyle, styleProperties) => {
  Object.keys(styleProperties).forEach((property) => {
    expect(mirrorStyle[property]).toBe(styleProperties[property]);
  });
};

describe('ElasticInput', () => {
  beforeEach(() => {
    jest
      .spyOn(global.window, 'requestAnimationFrame')
      .mockImplementation((cb) => cb());
  });

  afterEach(() => {
    global.window.requestAnimationFrame.mockRestore();
  });

  it('renders', () => {
    const component = renderComponent({ placeholder: 'placeholder' });
    expect(component).toMatchSnapshot();

    component.detach();
  });

  it('creates a wrapper element and attaches it to body', () => {
    const component = renderComponent();
    const instance = component.instance();

    expect(instance.wrapper).toBeDefined();
    expect(instance.wrapper.style.position).toBe('fixed');
    expect(instance.wrapper.style.top).toBe('-999px');
    expect(instance.wrapper.style.left).toBe('0px');

    // First child is the div with the input and second is the wrapper
    expect(document.body.childNodes.length).toBe(2);

    component.detach();
  });

  it('creates a mirror element and attaches it to wrapper', () => {
    global.window.getComputedStyle = jest.fn().mockReturnValue({
      textIndent: '50px',
    });
    const component = renderComponent();
    const instance = component.instance();

    expect(instance.mirror).toBeDefined();
    expect(instance.mirror.style.whiteSpace).toBe('pre');

    expect(instance.wrapper.childNodes.length).toBe(1);

    component.detach();
  });

  it('creates a mirror element and copies text styles from input', () => {
    const styleProperties = {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '15px',
      fontWeight: 'bold',
      fontStyle: 'italic',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      wordSpacing: '30px',
    };

    global.window.getComputedStyle = jest.fn().mockReturnValue(styleProperties);
    const component = renderComponent();
    const instance = component.instance();

    testStyleProperties(instance.mirror.style, styleProperties);

    component.detach();
  });

  it('creates a mirror element and copies styles from input with border-box', () => {
    const styleProperties = {
      paddingLeft: '10px',
      paddingRight: '10px',
      borderLeftStyle: 'dotted',
      borderLeftWidth: 'thin',
      borderRightStyle: 'dotted',
      borderRightWidth: 'thin',
    };

    global.window.getComputedStyle = jest.fn().mockReturnValue({
      textIndent: '50px',
      boxSizing: 'border-box',
      ...styleProperties,
    });
    const component = renderComponent();
    const instance = component.instance();

    testStyleProperties(instance.mirror.style, styleProperties);

    component.detach();
  });

  it('creates a mirror element and copies styles from input with padding-box', () => {
    const styleProperties = {
      paddingLeft: '10px',
      paddingRight: '10px',
    };

    global.window.getComputedStyle = jest.fn().mockReturnValue({
      textIndent: '50px',
      boxSizing: 'padding-box',
      ...styleProperties,
    });
    const component = renderComponent();
    const instance = component.instance();

    testStyleProperties(instance.mirror.style, styleProperties);

    component.detach();
  });

  it('removes wrapper and mirror when it unmounts', () => {
    const component = renderComponent();
    const instance = component.instance();

    instance.componentWillUnmount();

    expect(document.body.childNodes.length).toBe(1);

    component.detach();
  });

  it('updates input width on change', () => {
    const onChangeSpy = jest.fn();
    const component = renderComponent({
      onChange: onChangeSpy,
    });

    const mockEvent = {
      target: {
        value: 'value',
      },
    };

    const input = component.find('input');
    input.simulate('change', mockEvent);
    expect(onChangeSpy).toHaveBeenCalled();

    expect(input.instance().style.width).toBe('1px');

    component.detach();
  });
});
