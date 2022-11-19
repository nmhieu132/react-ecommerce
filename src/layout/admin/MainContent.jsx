import React from "react";
import { Switch,Route,Redirect  } from "react-router-dom";
import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts.js";
import router from "../../routes/router";


import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";



function MainContent() {
  return (
    <div id="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <Switch>
              {router.map((route,idx) =>{
                return(
                  route.component &&(
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) =>(
                        <route.component {...props}/>
                      )}
                    />
                  )
                )
              })}
              <Redirect from="admin" to ="/admin/dashboard"/>
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
