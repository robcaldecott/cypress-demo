import { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface AppHeaderProps {
  title: ReactNode;
}

function AppHeader({ title }: AppHeaderProps) {
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" flexGrow={1} noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export { AppHeader };
