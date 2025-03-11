import { Container, Stack, Typography } from '@mui/material';
import './App.css';
import { JavaScriptLogo } from './components/JsLogo';

const App = () => {
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
      </Container>
    </main>
  );
};

export default App;
