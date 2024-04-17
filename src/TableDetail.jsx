import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChangeDescriptionModal from './ChangeDescriptionModal';
import ReactFlow from './ReactFlow'

export function TableDetail() {
  const {name} = useParams();
  const [row, setRow] = useState({});
  const [open, setOpen] = useState(true);
  const [changeDescription, setChangeDescription] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (name) => {
    setChangeDescription(name)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    // Fetch list of tables from backend API
    axios.get('http://127.0.0.1:8000/tables')
      .then(response => {
        const chosenTable = response?.data?.find(table => table.name === name);
        setRow(chosenTable)
      })
      .catch(error => {
        console.error('Error fetching tables:', error);
      });
  }, []);

  return (
    <div style={{display: 'flex', gap: '25px'}}>
    <TableContainer sx={{ width: '50%', minWidth: '600px' }}>
            <Table sx={{ width: '95%'}}>
            <TableHead>
              <TableRow>
                  <TableCell
                    align={'left'}
                  >
                    Table Name
                  </TableCell>
                  <TableCell
                    align={'left'}
                  >
                    Column Name
                  </TableCell>
                  <TableCell
                    align={'left'}
                  >
                    Description
                  </TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                    <>
                    <TableRow hover tabIndex={-1} role="checkbox">
                      <TableCell scope="row" padding="none">
                          <p>{row?.name}</p>
                      </TableCell>
                      <TableCell>{""}</TableCell>
                      <TableCell>{""}</TableCell>
                    </TableRow>

                    {row?.columns?.map(e => (
                      <TableRow onClick={() => handleOpenModal(e?.name)} hover tabIndex={-1} role="checkbox">
                      <TableCell>{" "}</TableCell>
                      <TableCell >{e.name}</TableCell>
                      <TableCell >{e.description || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                   
                    </>



                          


                {!row && <TableNoData />}
              </TableBody>
            </Table>

            <ChangeDescriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        row={row}
        column={changeDescription}
      />
          </TableContainer>


          <div style={{ height: '500px', width: '50%', minWidth: '600px' }}>
            <ReactFlow name={name}/>
          </div>
          </div>
  );
}

export default TableDetail;
