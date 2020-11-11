import React, { Component } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import ContactList from "./ContactList";
import User from "./User";
import ChatBox from "./ChatBox";

export const dummy_contact_list = [
  "Ronnie",
  "Jennifer",
  "Joey",
  "Amanda",
  "Roy",
  "Richard",
  "Stella"
];

export const dummy_chat_bot = [
  {
    sender: true,
    id: "a",
    text: "Hello"
  },
  {
    sender: true,
    id: "aa",
    text: "Hello !"
  },
  {
    sender: false,
    id: "b",
    text: "How can i help you ?"
  }
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
      chats: []
    };
    this.handleSelectContact = this.handleSelectContact.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleChatStore = this.handleChatStore.bind(this);
  }

  handleSelectContact(sender, list) {
    this.setState(
      {
        sender,
        loggedIn: true,
        isOpenChatBox: false,
        isLoggedInSuccess: true,
        contactList: list
      },
      () => {
        setTimeout(() => {
          this.handleDissmissAlert();
        }, 3000);
      }
    );
  }

  handleMessage(receiver) {
    this.setState({
      receiver,
      isOpenChatBox: true,
      senderChatData: [],
      receiverChatData: [],
      chats:[]
    });
  }

  handleDissmissAlert() {
    const { isLoggedInSuccess } = this.state;
    isLoggedInSuccess &&
      this.setState({ isLoggedInSuccess: !isLoggedInSuccess });
  }

  handleChatStore(data) {
    const { chats, sender } = this.state;
    if (data.id !== sender) {
      Object.assign(data, {
        sender: false
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
      isLoggedInSuccess
    } = this.state;

    return (
      <Container>
        <Alert
          dismissible={true}
          onClose={() => this.handleDissmissAlert()}
          show={isLoggedInSuccess}
          variant="success"
        >
          {`Success, LoggedIn as ${sender}`}
        </Alert>
        <Card className='cardContainer'>
          <Card.Header>
            <i className="fa fa-address-book" />
            <span className="contactHeading">Contacts</span>
            <User
              currentUser={sender}
              dummyContentList={contactList}
              onContactSelect={this.handleSelectContact}
            />
          </Card.Header>
          <Row>
            <Col className='mb-2' xs={12} lg={4}>
              <Card>
                <ContactList
                  dummyContentList={contactList}
                  onContactSelect={this.handleSelectContact}
                  onMessageUser={this.handleMessage}
                />
              </Card>
            </Col>
            {loggedIn && isOpenChatBox && (
              <Col xs={12} lg={8}>
                <Card className="chatBox">
                  <Card.Header className='chatBoxHeader'>{sender}</Card.Header>
                  <ChatBox
                    chatStore={this.handleChatStore}
                    chatData={senderChatData}
                    currentUserId={sender}
                  />
                </Card>
                <Card className="chatBox">
                  <Card.Header className='chatBoxHeader'>{receiver}</Card.Header>
                  <ChatBox
                    chatStore={this.handleChatStore}
                    chatData={receiverChatData}
                    receiverUserId={receiver}
                  />
                </Card>
              </Col>
            )}
          </Row>
        </Card>
      </Container>
    );
  }
}

export default ChatContainer;
