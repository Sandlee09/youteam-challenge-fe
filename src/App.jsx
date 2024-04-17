import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import TableList from './TableList';
import TableDetail from './TableDetail';
// import ModifyColumnDescription from './ModifyColumnDescription';
// import LineageVisualization from './LineageVisualization';

function App() {
  const [tables, setTables] = useState([]);

  return (
    <Router>
      <div>
        <h1>Data Catalog</h1>
        <nav>
          <ul>
            <li><Link to="/tables">Tables</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/tables" element={<TableList />}/>
          <Route path="/tables/:name" element={<TableDetail />} />
          {/* <Route path="/table/:name">
            <TableDetail />
          </Route>
          <Route path="/modify-description/:table/:column">
            <ModifyColumnDescription />
          </Route>
          <Route path="/lineage">
            <LineageVisualization />
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
