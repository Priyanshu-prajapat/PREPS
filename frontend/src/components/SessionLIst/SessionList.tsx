import {
    Table,
    TableContainer,
} from "@mui/material"
import SessionTableHeader from "./SessionTableHeader/SessionTableHeader"
import SessionTableBody from "./SessionTableBody/SessionTableBody"
import { TQuestion } from "../../types/InterviewSessionTypes"



type SessionListProps = {
    id: string,
    categoryName: string,
    questions: TQuestion[],
}

const SessionList = ({ session }: { session: SessionListProps }) => {
    return (
        <TableContainer sx={{ border: '1px solid #fff', borderRadius: 3 }}>
            <Table>
                <SessionTableHeader heading={session.categoryName} />
                <SessionTableBody questions={session.questions} />
            </Table>
        </TableContainer>
    )
}

export default SessionList 
