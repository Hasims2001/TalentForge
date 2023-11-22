import { Navbar } from "./Components/Navbar";
import { AllRouters } from "./Routers/AllRouters";
import {Box} from '@chakra-ui/react';
import {useLocation} from 'react-router-dom'
function App() {
  const location = useLocation()
  return (
    <Box px={12}  className="App">
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}
      <AllRouters />
    </Box>
  );
}

export default App;
