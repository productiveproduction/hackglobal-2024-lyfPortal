import { Route, Routes } from 'react-router-dom';
import routes from './index';
// import { getPageHeight } from './utils';

function Pages() {
  return (
    // <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {routes.map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    // </Box>
  );
}

export default Pages;