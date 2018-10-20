rimport React, { Component } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";
import "./About.css";
import AboutList from "./AboutList.jsx";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    axios
      .get("/about")
      .then(res => this.setState({ list: res.data }))
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <Grid>
        <style>{"body { background-color: lightblue; }"}</style>
        <Row className="show-grid text-center">
          <h3>
            These Dreamers Were Deported to Mexico. Now, They're Helping Others
            Start Again!
          </h3>
          <Col sm={12} md={6} className="person-wrapper">
            <AboutList teamMembers={this.state.list} />
          </Col>
        </Row>
      </Grid>
    );
  }
}