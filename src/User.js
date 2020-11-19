import { React, Component } from "react";
import "./index.scss";
import { ListGroup, OverlayTrigger, Popover } from "react-bootstrap";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { contactList: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dummyContentList !== this.props.dummyContentList) {
      this.setState({ contactList: nextProps.dummyContentList });
    }
  }

  handleListUsers() {
    this.setState({ isShowPopover: false });
  }

  render() {
    const { currentUser } = this.props;
    const { isShowPopover, contactList } = this.state;
    const popover = (
      <Popover onClick={() => this.handleListUsers()} id="popover-basic">
        <Popover.Title className="popoverHeader" as="h3">
          Contacts
        </Popover.Title>
        <Popover.Content className="popoverList">
          <ListGroup>
            {contactList &&
              contactList.map((item, key) => {
                return (
                  <ListGroup.Item className="listItem" key={key}>
                    {item.name}
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Popover.Content>
      </Popover>
    );
    return (
      <div className="loggedUser">
        <span className="appHeader">+ Add</span>
        <span className="appHeader">
          <i className="fa fa-envelope-o" aria-hidden="true"></i>
        </span>
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
              {currentUser} <i className="fa fa-sort-desc" aria-hidden="true" />
              <i className="ml-3 fa fa-bell-o" aria-hidden="true" />
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
