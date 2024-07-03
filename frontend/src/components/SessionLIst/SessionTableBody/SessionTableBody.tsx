import { TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { TQuestion } from "../../../types/InterviewSessionTypes"


const SessionTableBody = ({ questions }: { questions: TQuestion[] }) => {
    return (
        <TableBody>
            {
                questions.map((item: TQuestion) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography color={'#fff'}>{item.question}</Typography>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
}

export default SessionTableBody
