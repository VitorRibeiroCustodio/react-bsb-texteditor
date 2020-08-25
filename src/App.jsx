import React from 'react';
import { Editor, EditorState, Modifier, CompositeDecorator } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './App.css';
import CustomComponent from './CustomComponent.jsx';

const getEntityStrategy = (entityType) => (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === entityType;
  }, callback);
};
const COMPOSITE_DECORATOR = new CompositeDecorator([
  {
    strategy: getEntityStrategy('CustomComponent'),
    component: CustomComponent,
  },
]);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(COMPOSITE_DECORATOR)};
    this.onChange = editorState => this.setState({editorState});
  }
  
  updateEditorState = (editorState) => {
    this.setState({ editorState: EditorState.set(editorState, {
      decorator: COMPOSITE_DECORATOR,
    })});
  }

  addCustomComponent = (e) => {
    const { editorState } = this.state;
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const contentWithEntity = contentState.createEntity('CustomComponent', 'MUTABLE', {
      color: '#513BFF',
      componentName: 'Novatics',
    });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    let newContentState = Modifier.applyEntity(contentWithEntity, selectionState, entityKey);

    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
    this.setState({ editorState: EditorState.moveFocusToEnd(newEditorState) });
  }

  render() {
    return (
      <div className="appWrapper">
        <div className="toolbarContainer">
          <button onClick={this.addCustomComponent}>Add Custom Component</button>
        </div>
        <div className="editorContainer">
          <Editor editorState={this.state.editorState} onChange={this.onChange} placeholder="Editor" />
        </div>
      </div>
    );
  }
}

export default App;
