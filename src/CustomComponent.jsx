import React from 'react';

const CustomComponent = ({ contentState, entityKey, offsetKey, decoratedText }) => {
  const { color, componentName } = contentState.getEntity(entityKey).getData();
  return (
    <span
      data-offset-key={offsetKey}
      style={{ position: 'relative', borderBottom: `1px solid ${color}`, display: 'inline' }}
      >
      <span style={{
        position: 'absolute',
        top: '-24px',
        left: '10px',
        color
      }} contentEditable={false}>
        {componentName}
      </span>
      <span data-text>{decoratedText}</span>
    </span>
  );
};

export default CustomComponent;