import React, { useState } from "react";

import TopBar from '../pages/PrivatePages/common/Topbar/Topbar';
import SideBar from '../pages/PrivatePages/common/Sidebar/Sidebar';
import SignalsPage from "../pages/PrivatePages/SignalsPage/SignalsPage";
import TrackingPage from "../pages/PrivatePages/VehicleSurveillance/TrackingPage";
import ManagePage from "../pages/PrivatePages/VehicleManage/ManagePage";

import {
    BrowserRouter,
    Route,
    Switch,
    //Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CrudService } from '../../services'
import { actions } from '../../modules'

import { Layout} from 'antd';
import 'antd/dist/antd.css';



const { Content} = Layout;

export const Routes = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    /*** To ensure authentication the token must be verified before access to the private routes */
    const { isAuthorized, user, authToken } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.authToken && auth.user && typeof auth.user === "object",
            authToken: auth.authToken,
            user: auth.user
        })
    );
    if (isAuthorized) {
        CrudService.setAuthHeader(isAuthorized)
    } else {
        /***** Check the current token if valid and get the athentified user ****/
        if (authToken && !user && loading) {
            setLoading(false)
            dispatch(actions.requestUser("Loading"))
        }
    }

    return (
        <Layout className="site-layout">
            <SideBar></SideBar>
            <Layout className="site-layout-background">
                <Content style={{backgroundColor:'white'}}>
                <TopBar></TopBar>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/signals"  component={ SignalsPage }  />
                                <Route exact path="/tracking_info/:vehicleId/:rentalId" component={TrackingPage} />
                                <Route path="/"  component={ ManagePage }  />            
                            </Switch>
                        </BrowserRouter>
                </Content>
            </Layout>
        </Layout>

    )
}
