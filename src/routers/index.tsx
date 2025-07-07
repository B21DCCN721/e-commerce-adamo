import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import CatogoryPage from "../pages/CatogoryPage";
import ProfilePage from "../pages/ProfilePage";
import DetailProductPage from "../pages/DetailProductPage";

interface TypeRoute {
    path: string;
    component: React.ComponentType;
}

const publicRoutes: TypeRoute[] = [
    {path: "/", component: HomePage},
    {path: "/cart", component: CartPage},
    {path: "/catogory", component: CatogoryPage},
    {path: "/profile", component: ProfilePage},
    {path: "/product/detail/:id", component: DetailProductPage},
    
]
export { publicRoutes };
