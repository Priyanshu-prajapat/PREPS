import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

function HomePage() {
    return (
        <div>
            <Typography>Home Page.</Typography>
            <Link to={"/dashboard"}>Dashboard</Link>
        </div>
    )
}

export default HomePage
