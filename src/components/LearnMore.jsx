import { Link } from "react-router-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import axios from "axios";
import "./LearnMore.css";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      lived: "",
      currlocation: "",
      age: ""
    };
    this.sendInfo = this.sendInfo.bind(this);
  }
  //create a post request using axios and elements from the state
  sendInfo() {
    const { name, gender, lived, currlocation, age } = this.state;
    axios
      .post("/learnMore", {
        name: `${name.value}`,
        gender: `${gender.value}`,
        lived: `${lived.value}`,
        currlocation: `${currlocation.value}`,
        age: `${age.value}`
      })
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, lived, currlocation, age } = steps;

    this.setState({ name, gender, lived, currlocation, age });
  }
  //invoke the function after the information has been rendered;
  componentWillUnmount() {
    this.sendInfo();
  }

  render() {
    const { name, gender, lived, currlocation, age } = this.state;
    return (
      <div
        style={{
          width: "100%"
        }}
      >
        <h3>Summary Of You</h3>
        <table>
          <tbody>
            <tr>
              <td>{`Name`}</td>
              <td>{`${name.value}`}</td>
            </tr>
            <tr>
              <td>{`Gender`}</td>
              <td>{`${gender.value}`}</td>
            </tr>
            <tr>
              <td>{`Lived`}</td>
              <td>{`${lived.value}`}</td>
            </tr>
            <tr>
              <td>{`Current Location`}</td>
              <td>{`${currlocation.value}`}</td>
            </tr>
            <tr>
              <td>{`Age`}</td>
              <td>{`${age.value}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object
};

Review.defaultProps = {
  steps: undefined
};

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        className="outer"
        steps={[
          {
            id: "1",
            message: "What is your name?",
            trigger: "name"
          },
          {
            id: "name",
            user: true,
            trigger: "3"
          },
          {
            id: "3",
            message: "Hi {previousValue}! What is your gender?",
            trigger: "gender"
          },
          {
            id: "gender",
            options: [
              {
                value: " male",
                label: " Male",
                trigger: "4"
              },
              {
                value: "female",
                label: "Female",
                trigger: "4"
              }
            ]
          },
          {
            id: "4",
            message: "Where did you live?",
            trigger: "lived"
          },
          {
            id: "lived",
            user: true,
            trigger: "10"
          },
          {
            id: "10",
            message: "Where do you live now?",
            trigger: "currlocation"
          },
          {
            id: "currlocation",
            user: true,
            trigger: "5"
          },
          {
            id: "5",
            message: "How old are you?",
            trigger: "age"
          },
          {
            id: "age",
            user: true,
            trigger: "7",
            validator: value => {
              if (isNaN(value)) {
                return "value must be a number";
              } else if (value < 0) {
                return "value must be positive";
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            }
          },
          {
            id: "7",
            message: "Great! Check out your summary",
            trigger: "review"
          },
          {
            id: "review",
            component: <Review />,
            asMessage: true,
            trigger: "update"
          },
          {
            id: "update",
            message: "Would you like to update some field?",
            trigger: "update-question"
          },
          {
            id: "update-question",
            options: [
              {
                value: "yes",
                label: "Yes",
                trigger: "update-yes"
              },
              {
                value: "no",
                label: "No",
                trigger: "end-message"
              }
            ]
          },
          {
            id: "update-yes",
            message: "What field would you like to update?",
            trigger: "update-fields"
          },
          {
            id: "update-fields",
            options: [
              {
                value: "name",
                label: "Name",
                trigger: "update-name"
              },
              {
                value: "gender",
                label: "Gender",
                trigger: "update-gender"
              },
              {
                value: "lived",
                label: "Lived",
                trigger: "update-lived"
              },
              {
                value: "currlocation",
                label: "Currlocation",
                trigger: "update-currlocation"
              },
              {
                value: "age",
                label: "Age",
                trigger: "update-age"
              }
            ]
          },
          {
            id: "update-name",
            update: "name",
            trigger: "7"
          },
          {
            id: "update-gender",
            update: "gender",
            trigger: "7"
          },
          {
            id: "update-lived",
            update: "lived",
            trigger: "7"
          },
          {
            id: "update-currlocation",
            update: "currlocation",
            trigger: "7"
          },
          {
            id: "update-age",
            update: "age",
            trigger: "7"
          },
          {
            id: "end-message",
            message: "Thanks! Your data was submitted successfully!",
            end: true
          }
        ]}
      />
    );
  }
}

export default SimpleForm;
