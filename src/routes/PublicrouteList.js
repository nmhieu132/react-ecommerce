
import Contact from "../components/frontend/Contact";
import Home from "../components/frontend/Home";
import ViewCategor from "../components/frontend/collections/ViewCategor"
import ViewProduct from "../components/frontend/collections/ViewProduct";
import Productinfo from "../components/frontend/collections/Productinfo";
import Cart from "../components/frontend/Cart";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Checkout from "../components/frontend/Checkout";

const Publicroutelist = [
    { path: "/", exact: true, name: 'Home', component: Home },
    { path: "/login", exact: true, name: 'Login', component: Login },
    { path: "/register", exact: true, name: 'Register', component: Register },
    { path: "/contact", exact: true, name: 'Contact', component: Contact },
    { path: "/collections", exact: true, name: 'ViewCategor', component: ViewCategor },
    { path: "/collections/:slug", exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: "/collections/:category/:product", exact: true, name: 'Productinfo', component: Productinfo },
    { path: "/cart", exact: true, name: 'Cart', component: Cart },
    { path: "/checkout", exact: true, name: 'Checkout', component: Checkout },
];
export default Publicroutelist