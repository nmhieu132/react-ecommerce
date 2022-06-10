import { BrowserRouter, Route, Routes } from "react-router-dom"
import {router} from './router'
const AppRouter = ()=>{
    return(
    <BrowserRouter>
      <Routes>
        {router.map((route, idx) => {
          const { path, exact, name, element } = route;
          return (
            route.element && (
              <Route
                key={idx}
                path={path}
                exact={exact}
                name={name}
                element={element}
              />
            )
          );
        })}
      </Routes>
    </BrowserRouter>
    )
}
export default AppRouter