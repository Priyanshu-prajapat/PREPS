import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'

const listItems = [
  { label: "Dashboard", link: '/dashboard' },
  { label: "Create Interview Session", link: '/create-interview-session' },
  { label: "Interview Sessions List", link: '/interview-sessions-list' },
]

interface NavLinkProps {
  isActive: Boolean,
  isPending?: Boolean,
}

const SideBar = () => {
  return (
    <Box sx={{
      width: '20%',
      textAlign: 'center',
      backgroundColor: 'primary.dark',
    }}>
      <List>
        {
          listItems.map((item, index) => (
            <ListItem key={index}>
              <NavLink
                to={item.link}
                style={({ isActive }: NavLinkProps) => {
                  return {
                    color: isActive ? "#000" : "#fff",
                    textDecoration: 'none',
                    backgroundColor: isActive == true ? "#fff" : "",
                    borderRadius: 5,
                    width: "100%"
                  }
                }}
              >
                <ListItemButton sx={{
                  ":hover": {
                    textDecoration: 'underline',
                    borderRadius: "5px",
                  }
                }}>
                  <ListItemText>
                    {item.label}
                  </ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))
        }
      </List >
    </Box>
  )
}

export default SideBar
