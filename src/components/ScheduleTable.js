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
import scheduleConfirmationHelper from '../helpers/schedulesConfirmationHelper';

import Title from './Title';

export default function ScheduleTable({eventId, ...rest }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await api.get(`/schedules/event/${eventId}`, config);
       

        var TableData = response.data
          .filter(obj => isAfter(new Date(obj.startDateTime), new Date()))
          .map(row => {
            let showIniDate = format(new Date(row.startDateTime), "dd/MM/yyyy - HH:mm");
            let showEndDate = format(new Date(row.endDateTime), "dd/MM/yyyy - HH:mm");
            let conf = scheduleConfirmationHelper.getConfirmationName(row.confirmed);
            return {
              id: row.id,
              startDateTime: showIniDate,
              endDateTime: showEndDate,
              status: conf
            }
          })
        setTableData(TableData);
        console.log(TableData);
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
                <TableCell style={{ textAlign: 'left' }}>Data de inicio</TableCell>
                <TableCell style={{ textAlign: 'left' }}>Data de fim</TableCell>
                <TableCell style={{ textAlign: 'left' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ textAlign: 'left' }}>{row.startDateTime}</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{row.endDateTime}</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}