import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { TableContainer } from '@mui/material';
import api from '../services/api';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await api.get('/shows/negotiations', config);
        setTableData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados da tabela:', error);
      }
    };

    fetchTableData();
  }, []);

  return (
    <React.Fragment>
      <Title>Propostas em andamento</Title>
      <div style={{ height: '300px', overflow: 'auto' }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'left' }}>Nome do Artista</TableCell>
                <TableCell style={{ textAlign: 'left' }}>Evento</TableCell>
                <TableCell style={{ textAlign: 'left' }}>Data do Show</TableCell>
                <TableCell style={{ textAlign: 'left' }}>Status de negociação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ textAlign: 'left' }}>{row.fk_artista}</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{row.fk_evento}</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{row.fk_agenda}</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}