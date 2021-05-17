import React, { Component } from 'react'

import { Row, Progress, Col, Divider, Tooltip, Statistic} from 'antd';
import 'antd/dist/antd.css';
import ReactSpeedometer from "react-d3-speedometer"
import { withRouter } from "react-router";
import { fetchVehicleState } from "../../../../../modules/Tracking/tracking.actions"


var vehicule ={};


class VehicleState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kilos: 0,
            speed : 0,
            engineTemp: 0,
            fuelLevel: 0,
            oilPressure: 0, 
            batteryCharge: 0, 
            brakeFluid: 0, 
            generalHealthIndicator:30,

         }

        
    }
    
    componentDidMount(){
        setInterval(() => {
            fetchVehicleState({
                idVehicle: this.props.match.params.vehicleId
            })
            .then(res => {
                if (res ) {
                    vehicule = res.data;
                    console.log(res.data);
                    this.setState({
                        kilos: vehicule.kilos,
                        speed : vehicule.speed,
                        engineTemp: vehicule.engineTemp,
                        fuelLevel: vehicule.fuelLevel,
                        oilPressure: vehicule.oilPressure, 
                        batteryCharge: vehicule.batteryCharge, 
                        brakeFluid: vehicule.brakeFluid  
                    });
                    
                }
            })
            .catch(err=> {
                console.log("No state");
            });
        }, 5000);
        
        
    }

    render() { 
        return (  
            <Row>
                <Col >
                    <ReactSpeedometer
                        width={200} 
                        height={150}
                        maxValue={300}
                        segments={3}
                        segmentColors= {["#87d068", "#F9C31B", "#F9431B"]}
                        value={this.state.speed}
                        currentValueText="Speed: ${value} Km/h"
                    />
                    <Tooltip title="Kilometres Traveled">
                        <Statistic 
                            title="Mileage (Km)" 
                            value={this.state.kilos} 
                            
                        />
                    </Tooltip>

                </Col>
                <Col push={3}>
                    <h1 className="vehicle-status-title">Vehicle Status</h1>
                <Tooltip title="Engine Temperture">
                    <Progress
                    strokeColor={{
                        '0%':'#F9C31B',
                        '20%': '#F9C31B',
                        '100%':  '#FD645D',
                    }}
                    percent={engineTemp(this.state.engineTemp)}
                    status="active"
                    showInfo={true}
                    />
                </Tooltip>
                <Tooltip title="Oil Pressure">
                    <Progress
                    strokeColor={{
                        '0%': '#FD645D',
                        '20%': '#F9C31B',
                        '100%': '#87d068',
                    }}
                    percent={oilPressure(this.state.oilPressure)}
                    status="active"
                    />
                </Tooltip>
                <Tooltip title="Fuel Level">
                    <Progress
                    strokeColor={{
                        '0%': '#FD645D',
                        '20%': '#F9C31B',
                        '100%': '#87d068',
                    }}
                    percent={55}
                    status="active"
                    percent={fuelLevel(this.state.fuelLevel)}
                    />
                </Tooltip>
                
                    <Divider 
                        type="horizontal"
                        style={{
                            backgroundColor: 'white',
    
                        }}
                    ></Divider>
                <Tooltip title="General Health Bar">
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={90}
                    />
                </Tooltip>
                
                    <Divider type="vertical"></Divider>
                <Tooltip title="Battery Charge">
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#FD645D',
                            '20%': '#F9C31B',
                            '100%': '#87d068',
                            
                        }}
                        percent={batteryCharge(this.state.batteryCharge) }
                        
                    />
                 </Tooltip>   
                </Col>

 
            

          </Row>
        );
    }
     

}
//calculates the engine temperture percemtage value according to the maximum bar for a normal car  
//max temperture = 110
function engineTemp(temp) {
    var num = temp*100/110;
    return num.toFixed(2);
    
}
//calculates the oil pressure percentage value accoring to the maximum bar for a normal car 
//max oil pressure 80 
function oilPressure(pressure) {
    var num = pressure *100/80;
    return num.toFixed(2);
}

//calculates the battery charge value according to the minimal value needed to run a car 
//max battery charge = 15.5
//min battery charge = 12.6
function batteryCharge(charge) {
    var num = charge * 34.14 - 429.14;
    var result = 0.0;
    if (charge>12.6) {
        result = num.toFixed(2);
    }
    return result;
}


//calculates the fuel level value according to the minimal value needed to run a car 
//min value = 
function fuelLevel(level) {
    var num = level* 56 /100;
    var result = 0;
    if (num<  14) {
        result = 5;
    }
    else{
        result = num;
    }
    return result.toFixed(2);
}


function brakeFluid(fluid) {
    var num = fluid *100/2;
    return num.toFixed(2);
}




export default withRouter(VehicleState);