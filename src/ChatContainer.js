import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ContactList from "./ContactList";
import User from "./User";
import ChatBox from "./ChatBox";

export const dummy_contact_list = [
  {
    name: "Ronnie ward",
    companyName: "xxx",
    email: "ronnieMockEmail@email.com",
  },
  {
    name: "Jennifer",
    companyName: "yyy",
    email: "jenniferMockEmail@email.com",
  },
  { name: "Joey", companyName: "zzz", email: "joeyMockEmail@email.com" },
  { name: "Amanda", companyName: "xxx", email: "amandaMockEmail@email.com" },
  { name: "Roy", companyName: "zzz", email: "royMockEmail@email.com" },
  { name: "Richard", companyName: "yyy", email: "richardMockEmail@email.com" },
  { name: "Stella", companyName: "yyy", email: "stellaMockEmail@email.com" },
];

class ChatContainer extends Component {
  constructor() {
    super();
    this.state = {
      sender: "",
      loggedIn: false,
      receiver: "",
      isLoggedInSuccess: false,
      contactList: dummy_contact_list,
      senderChatData: [],
      receiverChatData: [],
      chats: [],
    };
    this.handleSelectContact = this.handleSelectContact.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleChatStore = this.handleChatStore.bind(this);
  }

  handleSelectContact(sender, list) {
    this.setState({
      sender,
      loggedIn: true,
      isOpenChatBox: false,
      isLoggedInSuccess: true,
      contactList: list,
    });
  }

  handleMessage(item) {
    this.setState({
      receiver: item.name,
      isOpenChatBox: true,
      senderChatData: [],
      receiverChatData: [],
      chats: [],
    });
  }

  handleChatStore(data) {
    const { chats, sender } = this.state;
    if (data.id !== sender) {
      Object.assign(data, {
        sender: false,
      });
    }
    chats.push(data);
    this.setState({ senderChatData: chats, receiverChatData: chats });
  }

  render() {
    const {
      sender,
      contactList,
      loggedIn,
      isOpenChatBox,
      senderChatData,
      receiverChatData,
      receiver,
    } = this.state;

    return (
      <Container fluid className="pr-0">
        <Card>
          <Row className="userHeader">
            <Col xs={3} sm={3}>
              <i
                id="searchIcon"
                className="fa fa-search"
                aria-hidden="true"
              ></i>
            </Col>
            <Col xs={9} sm={9}>
              <User
                currentUser={sender}
                dummyContentList={contactList}
                onContactSelect={this.handleSelectContact}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} lg={6} md={6}>
              <Card>
                <ContactList
                  dummyContentList={contactList}
                  onContactSelect={this.handleSelectContact}
                  onMessageUser={this.handleMessage}
                />
              </Card>
            </Col>
            <Col xs={12} lg={5}>
              <Card className="contactDetailsCard">
                {loggedIn && isOpenChatBox ? (
                  <Row>
                    <Col xs={12} lg={6}>
                      <Card className="chatBox">
                        <Card.Header className="chatBoxHeader">
                          {sender}
                        </Card.Header>
                        <ChatBox
                          chatStore={this.handleChatStore}
                          chatData={senderChatData}
                          currentUserId={sender}
                        />
                      </Card>
                    </Col>
                    <Col xs={12} lg={6}>
                      <Card className="chatBox">
                        <Card.Header className="chatBoxHeader">
                          {receiver}
                        </Card.Header>
                        <ChatBox
                          chatStore={this.handleChatStore}
                          chatData={receiverChatData}
                          receiverUserId={receiver}
                        />
                      </Card>
                    </Col>
                  </Row>
                ) : (
                  <div className="chatBoxContainer">Chat Box</div>
                )}
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default ChatContainer;
