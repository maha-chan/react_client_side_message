import { React, Component } from "react";
import {
  Col,
  OverlayTrigger,
  Tooltip,
  Row,
  FormControl,
  Button,
  InputGroup,
  Table,
} from "react-bootstrap";
import { dummy_contact_list } from "./ChatContainer";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: props.dummyContentList,
      isLoggedIn: false,
      sort: "desc",
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
  }

  handleSignIn(currentUserName) {
    const filteredContactList = Object.assign([], dummy_contact_list);
    const resultArray = [];
    filteredContactList.forEach((item) => {
      item.name !== currentUserName && resultArray.push(item);
    });
    this.setState({ contactList: resultArray, isLoggedIn: true }, () => {
      this.props.onContactSelect(currentUserName, resultArray);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dummyContentList } = nextProps;
    if (dummyContentList !== this.props.dummyContentList) {
      this.setState({ contactList: dummyContentList, searchQuery: "" });
    }
  }

  handleSearchQuery(e) {
    const value = e.target.value;
    const filteredData = dummy_contact_list.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({
      contactList: filteredData,
      searchQuery: e.target.value,
    });
  }

  handleSort() {
    const { contactList, sort } = this.state;
    if (sort === "desc") {
      contactList.sort((a, b) => {
        let na = a.name.toLowerCase();
        let nb = b.name.toLowerCase();

        if (na < nb) {
          return -1;
        }
        if (na > nb) {
          return 1;
        }
        return 0;
      });
    } else {
      contactList.sort((a, b) => {
        let na = a.name.toLowerCase();
        let nb = b.name.toLowerCase();

        if (na < nb) {
          return 1;
        }
        if (na > nb) {
          return -1;
        }
        return 0;
      });
    }

    this.setState({ sort: sort === "asc" ? "desc" : "asc" });
  }

  renderNameIcon(name) {
    const splitName = name.split(" ");
    const nameIcon = [];
    for (const item of splitName) {
      nameIcon.push(item.substring(0, 1));
    }
    return nameIcon.join("");
  }

  renderColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.toString()}`;
  }

  render() {
    const { contactList, isLoggedIn, searchQuery, sort } = this.state;
    const { isDropDownList } = this.props;
    const renderTooltip = (item) => (
      <Tooltip id="button-tooltip">Login as {item}</Tooltip>
    );

    return (
      <div className="contactList">
        <Row>
          <Col sm={5} md={6}>
            <i
              id="addressBookFont"
              className="fa fa-address-book"
              aria-hidden="true"
            ></i>{" "}
            <span className="contactsHeading">Contacts</span>{" "}
          </Col>
          <Col className="sortHeading">
            Sort by:{" "}
            <span
              className="mr-2 sortHeadingName"
              onClick={() => this.handleSort()}
            >
              Names
            </span>
            {sort === "asc" ? (
              <i className="fa fa-sort-desc" aria-hidden="true" />
            ) : (
              <i className="fa fa-sort-asc" aria-hidden="true" />
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={5} md={6} lg={7}>
            <InputGroup size="sm" className="mb-3 mt-3 searchBoxContainer">
              <FormControl
                className="searchBox"
                placeholder="Search contacts"
                type="text"
                value={searchQuery}
                onChange={this.handleSearchQuery}
              />
              <InputGroup.Append>
                <Button className="searchBoxBtn" type="submit">
                  <i className="fa fa-search" aria-hidden="true" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col sm={5} md={6} lg={5} className="mb-3 mt-3 addContactsBtn">
            <Button size="sm">+ Add Contacts</Button>
          </Col>
        </Row>
        <Table className="tableStyle" borderless={true} responsive>
          <thead className="tableHeader">
            <tr>
              <th>
                <i className="fa fa-power-off" />
              </th>
              <th>Basic info</th>
              <th>Company</th>
              {isLoggedIn && !isDropDownList && <th></th>}
            </tr>
          </thead>
          <tbody>
            {contactList.map((item, key) => {
              return (
                <tr className="tableRow" key={key}>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(item.name)}
                    >
                      <i
                        className="fa fa-power-off"
                        onClick={() => this.handleSignIn(item.name)}
                      />
                    </OverlayTrigger>
                  </td>
                  <td>
                    <span
                      className="dot"
                      style={{ backgroundColor: this.renderColor() }}
                    >
                      <div>{this.renderNameIcon(item.name)}</div>
                    </span>
                    <div>
                      <div className="nameText">{item.name}</div>
                      <div className="emailText">{item.email}</div>
                    </div>
                  </td>
                  <td>{item.companyName}</td>
                  {isLoggedIn && !isDropDownList && (
                    <td>
                      <i
                        className="fa fa-comments"
                        onClick={() => this.props.onMessageUser(item)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ContactList;
