import { useRoutes } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes } from "./routes"
const AppRoutes = () => {
    const routes = useRoutes([...publicRoutes, ...privateRoutes, ...adminRoutes ]);
    return routes;
}
export default AppRoutes;