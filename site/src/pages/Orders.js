import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { TableContainer } from '@mui/material';
// Generate Order Data
function createData(id, nome, evento, data, status) {
  return { id, nome, evento, data, status };
}

const rows = [
  createData(
    0,
    'Bar do João',
    'Música ao vivo do João',
    '01/05/2023',
    'Aceito',
  ),
  createData(
    1,
    'Clube da Esquina',
    'Noite da Musica Classica',
    '10/05/2023',
    'Esperando aprovação',
  ),
  createData(2, 'Centro de Eventos', 'Noites de Blues', '15/05/2023', 'Proposta enviada'),
  createData(
    3,
    'Teatro Municipal',
    'Serenata do Amor',
    '20/05/2023',
    'Negociando',
  ),
  createData(
    4,
    'Bar do Luiz',
    'Sunset Sessions',
    '25/05/2023',
    'Cancelado',
  ),
  createData(
    4,
    'Bar do Luiz',
    'Sunset Sessions',
    '25/05/2023',
    'Cancelado',
  ),
  createData(
    4,
    'Bar do Luiz',
    'Sunset Sessions',
    '25/05/2023',
    'Cancelado',
  ),
  createData(
    4,
    'Bar do Luiz',
    'Sunset Sessions',
    '25/05/2023',
    'Cancelado',
  ),
  createData(
    4,
    'Bar do Luiz',
    'Sunset Sessions',
    '25/05/2023',
    'Cancelado',
  ),
  createData(
    4,
    'Bar do Luiz',
    'Sunset Sessions',
    '25/05/2023',
    'Cancelado',
  ),
  createData(
    4,
    'Bar do Luiz',
    'Sunset Sessions',
    '25/05/2023',
    'Cancelado',
  ),
  createData(
    4,
    'Bar do Luiz',
    'Sunset Sessions',
    '25/05/2023',
    'Cancelado',
  ),
  
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
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
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ textAlign: 'left' }}>{row.nome}</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{row.evento}</TableCell>
                  <TableCell style={{ textAlign: 'left' }}>{row.data}</TableCell>
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
