import React, { Component } from 'react'
import Switch from 'react-switch'
import { Container, Row, Col, Card } from 'react-bootstrap';


class SwitchToggler extends Component {
    constructor(){
        super();
       this.state=
        {
            checked :  localStorage.getItem('source')===null?true:(localStorage.getItem('source')==='true'?true:false)
        }
    }


    handleChange(checked) 
    {
       
        this.setState({ checked });
        localStorage.setItem('source', checked)
        this.props.changeSource(checked);
    }
    

    render() {
        
        return (
            <div>
                <Container className="news_switch">
                <label className="switch_label">
                    <Row lg={3} md={1} sm={1} xs={1}>
                        <Col>
                        <span className="label_text Nytimes_label"> NYTimes</span>
                        </Col>
                        <Col>
                        <Switch onChange={this.handleChange.bind(this)} checked={this.state.checked} onColor="#259DE1"
                        onHandleColor="#ffffff" offHandleColor="#ffffff" uncheckedIcon={false}
                        checkedIcon={false} className="react-switch"/>
                        </Col>
                        <Col>
                        <span className="label_text guardian_label" >Guardian</span>
                        </Col>
                        
                    </Row>
                    </label>
                </Container>
            </div>
        )
    }
}
export default SwitchToggler;
