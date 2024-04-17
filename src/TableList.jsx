import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export function TableList() {
  const navigate = useNavigate()
  const [tables, setTables] = useState([]);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // Fetch list of tables from backend API
    axios.get('http://127.0.0.1:8000/tables')
      .then(response => {
        console.log(response)
        setTables(response.data);
      })
      .catch(error => {
        console.error('Error fetching tables:', error);
      });
  }, []);


  return (
    <>
    <TableContainer sx={{ overflow: 'unset', margin: 'auto' }}>
            <Table sx={{ minWidth: 800, width: 'fit-content', margin: 'auto' }}>
            <TableHead>
              <TableRow>
                  <TableCell
                    align={'left'}
                  >
                    Table Name
                  </TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {tables
                  .map((row) => (
                    <>
                    <TableRow onClick={() => navigate(`/tables/${row?.name}`)} hover tabIndex={-1} role="checkbox">
                      
                      <TableCell scope="row" padding="none">
                          <p>{row?.name}</p>
                      </TableCell>
                      <TableCell>{""}</TableCell>
                      <TableCell>{""}</TableCell>
                    </TableRow>

                    {/* {open === row?.name && row?.columns?.map(e => (
                      <TableRow hover tabIndex={-1} role="checkbox">
                      <TableCell component="th" scope="row">{""}</TableCell>
                      <TableCell>{" "}</TableCell>
                      <TableCell >{e.name}</TableCell>
                      <TableCell >{e.description || ' '}</TableCell>
                      </TableRow>
                    ))} */}
                   
                    </>
                  ))}



                          


                {!tables && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
    
    </>
    
  );
}

export default TableList;
