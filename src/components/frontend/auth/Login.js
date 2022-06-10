import React from "react";
import Navbar from "../../../layout/frontend/Navbar";
function Login(){
    return(
        <div>
            <Navbar/>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="regis-card">
                            <div className="regis-card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="regis-card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label for="">Email</label>
                                        <input type="" name="name" className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label for="">Password</label>
                                        <input type="" name="password" className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Login