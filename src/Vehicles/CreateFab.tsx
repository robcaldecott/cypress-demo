import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Add from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles/createTheme";

function CreateFab() {
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const intl = useIntl();

  const label = intl.formatMessage({
    defaultMessage: "Create vehicle",
    description: "Click to create a new vehicle",
  });

  return (
    <Box
      position="fixed"
      bottom={{ xs: 16, sm: 32 }}
      right={{ xs: 16, sm: 32 }}
    >
      <Fab
        color="primary"
        variant={xs ? "circular" : "extended"}
        component={Link}
        to="/create"
        aria-label={label}
      >
        <Add sx={{ marginRight: { xs: 0, md: 1 } }} />
        {xs ? null : label}
      </Fab>
    </Box>
  );
}

export { CreateFab };
