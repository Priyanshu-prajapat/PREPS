import { TableCell, TableHead, TableRow, Typography } from '@mui/material'

const SessionTableHeader = ({ heading }: { heading: string }) => {
    return (
        <TableHead sx={{ backgroundColor: '#fff', color: '#000' }}>
            <TableRow>
                <TableCell>
                    <Typography variant='h6'>{heading}</Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default SessionTableHeader
