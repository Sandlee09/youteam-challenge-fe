import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './App.css';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const OverviewFlow = ({name}) => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const edgesWithUpdatedTypes = edges.map((edge) => {
    return edge;
  });


  const toCapitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // Fetch list of dependencies
    axios.get(`http://127.0.0.1:8000/tables/relationships/${name}`)
    .then(response => {
      console.log(response)


      const initialNodes = [
        {
          id: '1',
          type: 'input',
          data: {
            label: toCapitalize(name),
          },
          position: { x: 100, y: 0 },
        }
      ]

      const initialEdges = []

      
      response?.data?.forEach((e, index) => {

        const childIndex = String(initialNodes?.length + 1)
        initialNodes.push({
          id: childIndex,
          data: {
            label: toCapitalize(e?.target?.split('.')[0]),
          },
          position: { x: 200 * index, y: 100  },
        })

        initialEdges.push({ 
        id: `e1-${index}`, 
        source: '1', 
        target: childIndex
      })

        e?.source_columns?.forEach((column, innerIndex) => {
          const columnIndex = String(initialNodes?.length + 1)
          initialNodes.push({
            id: columnIndex,
            type: 'output',
            data: {
              label: toCapitalize(column),
            },
            position: { x: 200 * index, y: 200 + (100*innerIndex)  },
          })


          initialEdges.push({ 
            id: `e1-${index}-${innerIndex}`, 
            source: childIndex, 
            target: columnIndex,
            animated: true 
          })

        })
      })

      setEdges(initialEdges)
      setNodes(initialNodes)

    })
    .catch(error => {
      console.error('Error fetching tables:', error);
    });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;