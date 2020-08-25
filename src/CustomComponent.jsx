import React from 'react';

const CustomComponent = ({ contentState, entityKey, offsetKey, decoratedText }) => {
  const { color, componentName } = contentState.getEntity(entityKey).getData();
  return (
    <span
      data-offset-key={offsetKey}
      style={{ position: 'relative', backgroundColor: color }}
      >
      <span style={{
        position: 'absolute',
        top: '-24px',
        left: '10px',
      }} contentEditable={false}>
        {componentName}
      </span>
      <span data-text>{decoratedText}</span>
    </span>
  );
};

export default CustomComponent;