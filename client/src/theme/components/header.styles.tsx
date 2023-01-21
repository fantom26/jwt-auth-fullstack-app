import { Theme, makeStyles } from "@mui/material/styles";

export const HeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(1),
    flexGrow: 1
  }
}));
