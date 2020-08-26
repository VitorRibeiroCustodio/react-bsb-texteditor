import React from 'react';
import { EditorState, Modifier, CompositeDecorator } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import * as HTMLConverter from 'draft-convert';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css'
import './App.css';
import CustomComponent from './CustomComponent.jsx';

const componentType = 'CustomComponent';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const emojiPlugin = createEmojiPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const { EmojiSelect } = emojiPlugin;
const plugins = [inlineToolbarPlugin, emojiPlugin];

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
    strategy: getEntityStrategy(componentType),
    component: CustomComponent,
  },
]);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(COMPOSITE_DECORATOR),
      htmlText: '',
    };
  }
  
  updateEditorState = (editorState) => {
    this.setState({ editorState: EditorState.set(editorState, {
      decorator: COMPOSITE_DECORATOR,
    })});
  }

  addCustomComponent = () => {
    const { editorState } = this.state;    
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    
    let newContentState = contentState.createEntity(componentType, 'MUTABLE', {
      color: '#513BFF',
      componentName: 'Novatics',
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    newContentState = Modifier.applyEntity(newContentState, selectionState, entityKey);
    const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
    this.setState({ editorState: EditorState.moveFocusToEnd(newEditorState) });
  }

  convertToHtml = (editorState) => {
    const text = HTMLConverter.convertToHTML({
      // blockToHTML: (block) => {
      //   if (block.type === 'unstyled') {
      //     return {
      //       start: '',
      //       end: '',
      //     };
      //   }
      //   return undefined;
      // },
      entityToHTML: (entity, originalText) => {
        if (entity.type === componentType) {
          return `<${entity.data.componentName}>${originalText}</${entity.data.componentName}>`
        }
      },
    })(editorState.getCurrentContent());

    this.setState({ htmlText: text });
  }

  render() {
    return (
      <div className="appWrapper">
        <div className="wrapper">
          <button onClick={this.addCustomComponent}>Adicionar Componente React</button>
          <button onClick={() => this.convertToHtml(this.state.editorState)}>Formato HTML</button>
          <EmojiSelect />
        </div>
        <div className="editorContainer">
          <Editor
            editorState={this.state.editorState}
            onChange={this.updateEditorState}
            placeholder="Editor"
            plugins={plugins}
          />
          <InlineToolbar />
        </div>
        <div className="wrapper">
          {this.state.htmlText}
        </div>
      </div>
    );
  }
}

export default App;
