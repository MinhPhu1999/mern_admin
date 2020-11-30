import React, { Component } from "react";
import { Link } from "react-router-dom";
class User extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      id: null,
      noti: null,
      email: "",
      password: "",
      phone: "",
      currType: "add",
      is_admin: false,
      pagination: [],
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
    if (nextProps.isadd === false) {
      this.setState({
        noti: "Email already exist "
      });
    } else if (nextProps.isadd === true) {
      this.reset();
    }
    if (nextProps.isupdate === false) {
      this.setState({
        noti: "Update fail"
      });
    } else if (nextProps.isupdate === true) {
      this.reset();
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom col-md-6 offset-md-3">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
  isvalidEmail = email => {
    if (
      email.length < 6 ||
      email.indexOf(".") === -1 ||
      email.indexOf("@") === -1
    )
      return false;
    return true;
  };
  isvalidPhone = phone => {
    if (phone.length < 10) return false;
    for (let i = 0; i < phone.length; i++) {
      if (phone.charAt(i) < "0" || phone.charAt(i) > "9") return false;
    }
    return true;
  };

  addUser = () => {
    const {
      email,
      password,
      name,
      is_admin
    } = this.state;
    if (!this.isvalidEmail(email)) {
      this.setState({
        noti: "Email invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (password.length < 6) {
      this.setState({
        noti: "Password invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (name.length < 3) {
      this.setState({
        noti: "First name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.addUser(
      email,
      password,
      name,
      is_admin
    );
  };
  updateUser = () => {
    const {
      email,
      password,
      name,
      is_admin
    } = this.state;
    if (!this.isvalidEmail(email)) {
      this.setState({
        noti: "Email invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (password.length < 6) {
      this.setState({
        noti: "Password invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (name.length < 3) {
      this.setState({
        noti: "First name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.updateUser(
      email,
      name,
      is_admin
    );
  };
  renderBtn = () => {
    // const {
    //   email,
    //   name,
    //   is_admin
    // } = this.state;
    if (this.state.currType === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button onClick={() => this.addUser()} className="btn-custom">
              Add
            </button>
            <button disabled className="btn-custom">
              Update
            </button>
            <button onClick={() => this.reset()} className="btn-custom">
              Reset
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              disabled
              onClick={() => this.addUser()}
              className="btn-custom"
            >
              Add
            </button>
            <button onClick={() => this.updateUser()} className="btn-custom">
              Update
            </button>
            <button onClick={() => this.reset()} className="btn-custom">
              Reset
            </button>
          </div>
        </div>
      );
    }
  };
  reset = () => {
    this.setState({
      //name: null,
      id: null,
      noti: null,
      email: "",
      password: "",
      name: "",
      currType: "add",
      is_admin: false
    });
  };
  renderPassword = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Password <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="password"
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Password <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              disabled
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="password"
              required
            />
          </div>
        </div>
      );
    }
  };
  renderEmail = () => {
    if (this.state.currType === "add") {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Email <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              value={this.state.email}
              onChange={e => {
                this.setState({
                  email: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="text"
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group ">
          <label for="cname" className="control-label col-lg-2">
            Email <span className="required">*</span>
          </label>
          <div className="col-lg-10">
            <input
              disabled
              value={this.state.email}
              onChange={e => {
                this.setState({
                  email: e.target.value
                });
              }}
              className="form-control"
              id="cname"
              name="fullname"
              minlength="5"
              type="text"
              required
            />
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="page-header">
              <i className="fa fa-table" /> Table
            </h3>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-home" />
                <Link to="/">Home</Link>
              </li>
              <li>
                <i className="fa fa-table" />Table
              </li>
              <li>
                <i className="fa fa-th-list" />User Manager
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Advanced Table</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" />Email
                    </th>
                    <th>
                      <i className="icon_profile" />Name
                    </th>
                    <th>
                      <i className="icon_cogs" />Action
                    </th>
                  </tr>
                  {this.props.user.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.email}</td>
                        <td>{element.name}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  email: element.email,
                                  name: element.name,
                                  password: element.phone_number,
                                  is_admin: element.is_admin,
                                  currType: "update"
                                })
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                            <a
                              onClick={() =>
                                this.props.deleteUser(element.email)
                              }
                              className="btn btn-danger"
                            >
                              <i className="icon_close_alt2" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {this.renderPagination()}
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Form validations</header>
              <div className="panel-body">
                <div className="form">
                  <div className="form-validate form-horizontal">
                    {this.renderEmail()}
                    {this.renderPassword()}
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Name <span className="required" />
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              name: e.target.value
                            });
                          }}
                          value={this.state.name}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <form>
                          <label class="radio-inline">
                            <input
                              checked={this.state.is_admin}
                              onClick={() => this.setState({ is_admin: true })}
                              type="radio"
                              name="optradio"
                            />Admin
                          </label>
                          <label class="radio-inline">
                            <input
                              checked={!this.state.is_admin}
                              onClick={() => this.setState({ is_admin: false })}
                              type="radio"
                              name="optradio"
                            />User
                          </label>
                        </form>
                      </div>
                    </div> */}
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <p>{this.state.noti}</p>
                      </div>
                    </div>
                    {this.renderBtn()}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}
export default User;
