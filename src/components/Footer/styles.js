import { makeStyles } from "@material-ui/styles";
import { red, blue} from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";

export default makeStyles(theme => ({

  container: {
    paddingTop: 20
  },
  version: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
