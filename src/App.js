import './App.css';
import './global/global.css';
import { useState } from 'react';

import Header from './components/header/header';
import NodeChain from './components/nodes/node-chain';

function App() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
    <Header />
    <div className="container">
      <NodeChain createOpen={createOpen} setCreateOpen={setCreateOpen} />
    </div>
    </>
  );
}

export default App;
