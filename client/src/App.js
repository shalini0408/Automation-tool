import MainComponent from "./components/MainComponent";
import {
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material/styles";
import { createTheme } from "@mui/material";
import "./styles/index.css";
import { SnackbarProvider } from "notistack";

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: "#242830",
      },
      secondary: {
        main: "#f44336",
      },
    },
  })
);

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <MainComponent />
          </SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
