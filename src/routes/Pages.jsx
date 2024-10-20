import { Route, Routes } from 'react-router-dom';
import { tablistRoutes, pagesRoutes } from './index';
// import { getPageHeight } from './utils';

function Pages() {
  return (
    // <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {
          [ ...tablistRoutes, 
            ...pagesRoutes
          ].map(({ path, component: Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })
        }
      </Routes>
    // </Box>
  );
}

export default Pages;