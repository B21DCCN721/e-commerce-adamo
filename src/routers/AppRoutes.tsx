import { useRoutes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes"
const AppRoutes = () => {
    const routes = useRoutes([...publicRoutes, ...privateRoutes ]);
    return routes;
}
export default AppRoutes;