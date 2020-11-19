import { React, Component } from "react";
import { Button, Form, Badge, FormControl, InputGroup } from "react-bootstrap";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      currentUser: "",
      dummy_chat_data: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { currentUserId, receiverUserId } = this.props;
    this.setState({ currentUser: currentUserId || receiverUserId });
  }

  componentWillReceiveProps(nextProps) {
    const { currentUserId, receiverUserId, chatData } = nextProps;
    if (currentUserId && currentUserId !== this.props.currentUserId) {
      this.setState({ currentUser: currentUserId });
    }
    if (receiverUserId && receiverUserId !== this.props.receiverUserId) {
      this.setState({ currentUser: receiverUserId });
    }
    if (chatData && chatData !== this.props.chatData) {
      this.setState({ dummy_chat_data: chatData });
    }
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      message: value
    });
  }

  handleSendMessage(currentUser) {
    const { message } = this.state;
    const postData = Object.assign(
      {},
      {
        id: currentUser,
        text: message,
        sender: true
      }
    );
    this.setState({ message: "" }, () => {
      this.props.chatStore(postData);
    });
  }

  render() {
    const { currentUser, message, dummy_chat_data } = this.state;
    return (
      <div className="messageList">
        {dummy_chat_data.map((data, i) => {
          return (
            <div
              key={i}
              className={currentUser === data.id ? "receiverTextStyle" : ""}
            >
              <div className="sender-name">
                <Badge
                  pill
                  variant={currentUser === data.id ? "warning" : "primary"}
                >
                  {data.id}
                </Badge>
              </div>
              <div className="senderText">{data.text}</div>
            </div>
          );
        })}
        <Form>
          <InputGroup className="mb-3 mt-3">
            <FormControl
              placeholder="Type a message"
              type="text"
              value={message}
              autoFocus
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button
                type="submit"
                disabled={!message}
                onClick={() => this.handleSendMessage(currentUser)}
              >
                <i className="fa fa-paper-plane" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    );
  }
}
export default ChatBox;
