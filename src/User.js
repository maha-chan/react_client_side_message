import { React, Component } from "react";
import "./index.scss";
import {
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import ContactList from "./ContactList";

class User extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleListUsers() {
    this.setState({ isShowPopover: false });
  }

  render() {
    const { currentUser } = this.props;
    const { isShowPopover } = this.state;
    const popover = (
      <Popover onClick={() => this.handleListUsers()} id="popover-basic">
        <Popover.Title as="h3">Contacts</Popover.Title>
        <Popover.Content className="popoverList">
          <ContactList
            dummyContentList={this.props.dummyContentList}
            isDropDownList={true}
            onContactSelect={this.props.onContactSelect}
          />
        </Popover.Content>
      </Popover>
    );
    return (
      <div className="loggedUser">
        <i className="fa fa-user" />
        {currentUser ? (
          <OverlayTrigger
            show={isShowPopover}
            trigger="click"
            placement="bottom-end"
            overlay={popover}
          >
            <span
              className="userNameHeading"
              onClick={() => {
                this.setState({ isShowPopover: !isShowPopover });
              }}
            >
              {currentUser}
            </span>
          </OverlayTrigger>
        ) : (
          <span className="contactHeading">Login</span>
        )}
      </div>
    );
  }
}
export default User;
