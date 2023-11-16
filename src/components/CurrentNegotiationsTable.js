import React, { useState, useEffect } from 'react';
import { format, isAfter } from 'date-fns';
import { 
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

import api from '../services/api';
import showStatusHelper from '../helpers/showStatusHelper';

import Title from './Title';

export default function CurrentNegotiationsTable({ mode, ...rest }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await api.get('/shows/negotiations', config);
       

        var TableData = response.data
          .filter(obj => isAfter(new Date(obj.schedule.startDateTime), new Date()))
          .map(row => {
            let showDate = format(new Date(row.schedule.startDateTime), "dd/MM/yyyy - HH:mm");
            return {
              id: row.id,
              artist: row.artist.name,
              establishment: row.event.establishment.establishmentName,
              event: row.event.name,
              dateShow: showDate,
              status: showStatusHelper.getDisplayName(row.status)
            }
          })
        setTableData(TableData);
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
                <TableCell style={{ textAlign: 'left' }}>Nome do { mode === 'Artist' ? "Estabelecimento" : "Artista" }</TableCell>
                <TableCell style={{ textAlign: 'left' }}>Evento</TableCell>
                <TableCell style={{ textAlign: 'left' }}>Data do Show</TableCell>
                <TableCell style={{ textAlign: 'left' }}>Status de negociação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ textAlign: 'left' }}>{ mode === 'Artist' ? row.establishment : row.artist }</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{row.event}</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{row.dateShow}</TableCell>
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