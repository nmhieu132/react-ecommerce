
import Profile from "../components/admin/Profile";
import Categor from "../components/admin/Categor/Categor";
import Viewcategor from "../components/admin/Categor/Viewcategor";
import Editcategor from "../components/admin/Categor/Editcategor";
import Addproduct from "../components/admin/Product/Addproduct"
import Viewproduct from "../components/admin/Product/Viewproduct"
import Editproduct from "../components/admin/Product/Editproduct"
import Order from "../components/admin/order/Order";

const router = [
    { path: "/admin", exact: true, name: 'Admin' },

    { path: "/admin/profile", exact: true, name: 'Profile', component: Profile },
    { path: "/admin/add-categor", exact: true, name: 'Categor', component: Categor },
    { path: "/admin/view-categor", exact: true, name: 'ViewCategor', component: Viewcategor },
    { path: "/admin/edit-category/:id", exact: true, name: 'EditCategor', component: Editcategor },
    { path: "/admin/add-product", exact: true, name: 'AddProduct', component: Addproduct },
    { path: "/admin/view-product", exact: true, name: 'Viewproduct', component: Viewproduct },
    { path: "/admin/edit-product/:id", exact: true, name: 'Editproduct', component: Editproduct },
    { path: "/admin/orders", exact: true, name: 'Order', component: Order },
]


export default router