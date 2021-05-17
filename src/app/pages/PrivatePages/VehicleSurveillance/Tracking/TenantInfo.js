import React, {Component } from 'react'
import { withRouter } from "react-router"

import 'antd/dist/antd.css';
import { Avatar, Row, Col, Tooltip } from 'antd';

import { AntDesignOutlined } from '@ant-design/icons';

import {ReactComponent as MapIcon} from './svg/tabler-icon-map-2.svg';
import {ReactComponent as CalendarIcon} from './svg/tabler-icon-calendar-event.svg';
import {ReactComponent as ContactIcon} from './svg/tabler-icon-user.svg';
import { fetchRentalInfo } from '../../../../../modules/Tracking/tracking.crud';

var rental={};

class TenantInfo extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        fetchRentalInfo({
            idVehicle: this.props.match.params.vehicleId
        })
        .then(res => {
            if (res ) {
                rental= res.data;
                console.log(rental); 
                console.log("rental info");  
                var str = rental.rentaldate;
                var a = str.substr(0, 10);

                this.setState({
                    firstName : rental.firstName,
                    lastName: rental.lastName,
                    rentalborne : rental.city,
                    rentaldate: a ,
                    rentaltime : rental.rentaltime
                })
            }
        })
        .catch(err=> {
            console.log("No state");
        });
        console.log(rental);
    }
    render() { 
        return (  
            <Row>
                <Col push={5} span={22} >
                        <br></br>                        
                        <Row>
                            <Col push={5}>
                            <Avatar
                                size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80,xxl: 100,}}
                                icon={<AntDesignOutlined />}
                            />
                            </Col>
                        </Row>
                        <br></br>
                        <Tooltip title="Tenant Name">
                        <Row>  
                            <Col span={4} >
                                <ContactIcon></ContactIcon>
                            </Col>
                            <Col >
                                <h3 className="tenant-name-text"
                                    style={{
                                        marginTop: 5,                     
                                    }}>
                                    {this.state.firstName+" "+this.state.lastName}
                                </h3>
                            </Col>
                        </Row>
                        </Tooltip>
                        <Tooltip title="Rental Date">
                        <Row>
                            <Col span={4}>
                                <CalendarIcon ></CalendarIcon>
                            </Col>
                            <Col >
                                <h3
                                    style={{
                                        marginTop: 5,                     
                                    }}>
                                    {this.state.rentaldate+" "+this.state.rentaltime}
                                </h3>
                            </Col>
                        </Row>
                        </Tooltip>
                        <Tooltip title="Rental Place">
                        <Row>
                        <Col span={4}>
                                <MapIcon></MapIcon>
                            </Col>
                            <Col>
                                <h3
                                    style={{
                                        marginTop: 5,                     
                                }}>
                                {this.state.rentalborne}
                            </h3>
                            </Col>
                        </Row>
                        </Tooltip>
                       
                       
                        
                        
                      
                </Col>

            </Row>
               
           
        );
    }
}
 




/*function rentalInfo(id){
    const {rentalInfo, idVehicle, errors}=rental;
    return {rentalInfo, idVehicle, errors}
}*/
//const connectedClass =connect(rentalInfo,{fetchRentalInfo})(TenantInfo)

export default withRouter(TenantInfo);