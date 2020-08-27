import React from 'react';
import { EditorState, Modifier, CompositeDecorator } from 'draft-js';
import * as HTMLConverter from 'draft-convert';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import './App.css';
import CustomComponent from './CustomComponent.jsx';

const componentType = 'componentType';
const novaticsColor = '#513BFF';

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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      htmlText: '',
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  addCustomComponent = () => {}

  convertToHtml = () => { }

  render() {
    return (
      <div className="appWrapper">
        <div className="wrapper">
          {/* <button onClick={this.addCustomComponent}>Adicionar Componente React</button> */}
          {/* <button onClick={() => this.convertToHtml(this.state.editorState)}>Formato HTML</button> */}
          {/* <EmojiSelect /> */}
        </div>
        <div className="editorContainer">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Editor"
          />
          {/* <InlineToolbar /> */}
        </div>
        <div className="wrapper">
          {this.state.htmlText}
        </div>
      </div>
    );
  }
}

export default App;
