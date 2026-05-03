import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const drawerWidth = 100;

export default function Layout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        <IconButton onClick={() => setOpen(false)}>
          {/* <ChevronLeftIcon /> */}"-"
        </IconButton>

        <List>
          <ListItemButton
            selected={location.pathname === "/command-center"}
            onClick={() => navigate("/command-center")}
          >
            <ListItemText primary="Command Center" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname === "/simulator"}
            onClick={() => navigate("/simulator")}
          >
            <ListItemText primary="Simulator" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {!open && (
          <IconButton onClick={() => setOpen(true)}>
            {/* <MenuIcon /> */} 
          </IconButton>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}
