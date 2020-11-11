import { React, Component } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { dummy_contact_list } from "./ChatContainer";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: props.dummyContentList,
      isLoggedIn: false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(item) {
    const filteredContactList = Object.assign([], dummy_contact_list);
    const result = filteredContactList.filter(key => key !== item);
    this.setState({ contactList: result, isLoggedIn: true }, () => {
      this.props.onContactSelect(item, result);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dummyContentList } = nextProps;
    if (dummyContentList !== this.props.dummyContentList) {
      this.setState({ contactList: dummyContentList });
    }
  }

  render() {
    const { contactList, isLoggedIn } = this.state;
    const { isDropDownList } = this.props;
    const renderTooltip = item => (
      <Tooltip id="button-tooltip">Login as {item}</Tooltip>
    );

    return (
      <div className="contactList">
        {!isDropDownList && <div className="chatsHeading">Chats</div>}
        {contactList.map((item, key) => {
          return (
            <div key={key} className="mb-2">
              <div>
                <Card body>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(item)}
                  >
                    <i
                      className="fa fa-power-off"
                      onClick={() => this.handleSignIn(item)}
                    />
                  </OverlayTrigger>
                  {item}
                  {isLoggedIn && !isDropDownList && (
                    <i
                      className="fa fa-comments"
                      onClick={() => this.props.onMessageUser(item)}
                    />
                  )}
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ContactList;
