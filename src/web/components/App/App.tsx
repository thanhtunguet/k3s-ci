import {Col, Row} from 'antd';
import {EditorConfiguration} from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/theme/monokai.css';
import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import './App.scss';

function getCodeMirrorOptions(mode: string): EditorConfiguration {
  return {
    mode,
    theme: 'monokai',
    lineNumbers: true,
    viewportMargin: Infinity,
    inputStyle: 'contenteditable',
  };
}

const yamlOptions: EditorConfiguration = getCodeMirrorOptions('yaml');

/**
 * File: App.tsx
 * @created 2020-11-12 13:52:02
 * @author thanhtunguet <ht@thanhtunguet.info>
 * @type {FC<PropsWithChildren<AppProps>>}
 */
const App: FC<PropsWithChildren<AppProps>> = (): ReactElement => {
  return (
    <Row className="w-100">
      <Col span={12} className="p-2">
        <CodeMirror options={yamlOptions} />
      </Col>
      <Col span={12} className="p-2">
        <CodeMirror options={yamlOptions} />
      </Col>
    </Row>
  );
};

export interface AppProps {
  //
}

App.defaultProps = {
  //
};

App.propTypes = {
  //
};

export default React.memo(App);
