import React from "react";
import { Switch, Route } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import Publicroutelist from "../../routes/PublicrouteList";
function FrontendLayout() {
    return (
        <div>
            <NavbarHome />
            <div>
                <Switch>
                    {Publicroutelist.map((routeData, idx) => {
                        return (
                            routeData.component && (
                                <Route
                                    key={idx}
                                    path={routeData.path}
                                    exact={routeData.exact}
                                    name={routeData.name}
                                    render={(props) => (
                                        <routeData.component {...props} />
                                    )}
                                />
                            )
                        )
                    })}
                </Switch>
            </div>
        </div>
    );
}

export default FrontendLayout;
