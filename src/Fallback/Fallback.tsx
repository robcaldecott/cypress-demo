import { FormattedMessage } from "react-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Fallback() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography>
        <FormattedMessage
          defaultMessage="Loading..."
          description="Message displayed when loading a new page"
        />
      </Typography>
    </Box>
  );
}

export { Fallback };
