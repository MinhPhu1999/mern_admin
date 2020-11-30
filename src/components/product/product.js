import React, { Component } from "react";
import { Link } from "react-router-dom";
class Product extends Component {
  constructor() {
    super();
    this.state = {
      pagination: [],
      product: null,
      file: null,
      imagePreviewUrl: null,
      curr: "add",
      category: "category",
      brand: "brand",
      name: "",
      price: "",
      img: "",
      description: "",
      id_brand: "",
      id_category: "",
      noti: "",
      id: null
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
    if (nextProps.product !== null) {
      this.setState({
        imagePreviewUrl: nextProps.product.img
      });
    }
    if (nextProps.isadd === true) {
      this.reset()
    } 
    if(nextProps.isupdate === true) {
      this.reset()
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
  handleChangeImg = img => {
    if(img === undefined)
      return
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: img,
        img: reader.result
      });
    };
    reader.readAsDataURL(img);
  };
  invalidPrice = t => {
    var str = t.toString();
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === "+" || str.charAt(i) === "-") count++;
      else break;
    }
    str = str.substring(count, str.length);
    count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === ".") {
        count++;
      }
      if (str.charAt(i) < "0" || str.charAt(i) > "9") return false;
    }
    if (count > 1) return false;
    return !isNaN(Number.parseFloat(str));
  };
  submitAddProduct = () => {
    const {
      id_category,
      name,
      price,
      description,
      id_brand,
      file
    } = this.state;
    if (name.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.invalidPrice(price)) {
      this.setState({
        noti: "Price invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (id_category === "") {
      this.setState({
        noti: "Category invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (id_brand === "") {
      this.setState({
        noti: "Brand invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (file === null) {
      this.setState({
        noti: "File invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.addProduct(
      id_category,
      name,
      price,
      description,
      id_brand,
      file
    );
  };
  submitUpdateProduct = () => {
    const {
      id_category,
      name,
      price,
      description,
      id_brand,
      file,
      id, 
      img,
      status
    } = this.state;
    if (name.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.invalidPrice(price)) {
      this.setState({
        noti: "Price invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (id_category === "") {
      this.setState({
        noti: "Category invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (id_brand === "") {
      this.setState({
        noti: "Brand invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (file === null && img === '' ) {
      this.setState({
        noti: "File invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.updateProduct(
      id,
      name,
      id_category,
      price,
      description,
      id_brand,
      file,
      status
    );
  };
  renderBtnSubmit = () => {
    if (this.state.curr === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              onClick={() => this.submitAddProduct()}
              className="btn-custom"
              type="submit"
            >
              Add
            </button>
            <button className="btn-custom" disabled type="button">
              Update
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button className="btn-custom" disabled type="submit">
              Add
            </button>
            <button
              className="btn-custom"
              onClick={() => this.submitUpdateProduct()}
              type="button"
            >
              Update
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
      );
    }
  };
  reset = () => {
    this.setState({
        noti: "",
        //name: "",
        file: null,
        imagePreviewUrl: null,
        curr: "add",
        category: "category",
        brand: "brand",
        name: "",
        price: "",
        img: "",
        description: "",
        id_brand: "",
        id_category: "",
        //noti: "",
        id: null
    })
  }
  renderMenuCategory = () => {
    if (this.props.category) {
      return this.props.category.map((element, index) => {
        return (
          <li
            onClick={() =>
              this.setState({
                category: element.name,
                id_category: element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };
  renderMenuBrand = () => {
    if (this.props.brand) {
      return this.props.brand.map((element, index) => {
        return (
          <li
            onClick={() =>
              this.setState({ brand: element.name, id_brand: element._id })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };
  getNameCategoryByID = id => {
    for (let i = 0; i < this.props.category.length; i++) {
      if (id === this.props.category[i]._id) return this.props.category[i].name;
    }
  };
  getNameBrandByID = id => {
    for (let i = 0; i < this.props.brand.length; i++) {
      if (id === this.props.brand[i]._id) return this.props.brand[i].name;
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
                <i className="fa fa-th-list" />Product Manager
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
                      <i className="icon_profile" /> Name
                    </th>
                    <th>
                      <i className="icon_currency" /> Price
                    </th>
                    <th>
                      <i className="icon_pin_alt" /> Description
                    </th>
                    <th>
                      <i className="icon_check_alt2" /> Status
                    </th>
                    <th>
                      <i className="icon_cogs" /> Action
                    </th>
                  </tr>
                  {this.props.product.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name}</td>
                        <td>{element.price}</td>
                        <td style={{ width: "40%" }}>{element.description}</td>
                        <td>{element.status.toString()}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() =>
                                this.setState({
                                  curr: "update",
                                  name: element.name,
                                  price: element.price,
                                  description: element.description,
                                  category: this.getNameCategoryByID(
                                    element.id_category
                                  ),
                                  id_category: element.id_category,
                                  id_brand: element.id_brand,
                                  brand: this.getNameBrandByID(
                                    element.id_brand
                                  ),
                                  img: element.img,
                                  id: element._id,
                                  status: element.status
                                })
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                            <a
                              onClick={() => this.props.deleteProduct(element._id)}
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
                <div className="form" id="from-book">
                  <div
                    className="form-validate form-horizontal"
                    id="feedback_form"
                    method="get"
                    action=""
                  >
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Name <span className="required">*</span>
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
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Price
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.price}
                          onChange={e =>
                            this.setState({
                              price: e.target.value
                            })
                          }
                          className="form-control "
                          id="curl"
                          type="text"
                          name="url"
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Description <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.description}
                          onChange={e =>
                            this.setState({
                              description: e.target.value
                            })
                          }
                          className="form-control"
                          id="subject"
                          name="subject"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment " className="control-label col-lg-2">
                        Category
                      </label>
                      <div className="btn-group col-lg-10">
                        <button
                          style={{ width: "200px" }}
                          type="button"
                          className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {this.state.category} <span className="caret" />
                        </button>
                        <ul className="dropdown-menu" role="menu">
                          {this.renderMenuCategory()}
                        </ul>
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Brand
                      </label>
                      <div className="btn-group col-lg-10">
                        <button
                          style={{ width: "200px" }}
                          type="button"
                          className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {this.state.brand} <span className="caret" />
                        </button>
                        <ul className="dropdown-menu" role="menu">
                          {this.renderMenuBrand()}
                        </ul>
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Image upload{" "}
                      </label>
                      <div className="col-lg-10">
                        <input
                          className="form-control "
                          type="file"
                          id="ccomment"
                          name="comment"
                          required
                          onChange={e =>
                            this.handleChangeImg(e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Image
                      </label>
                      <div className="col-lg-10">
                        <img
                          src={this.state.img}
                          style={{ maxWidth: "100px" }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                    <label for="comment" className="control-label col-lg-2">
                        Status
                      </label>
                      <div className="col-lg-10" >
                        <form>
                          <label class="radio-inline">
                            <input
                              checked={this.state.status}
                              onClick={() => this.setState({ status: true })}
                              type="radio"
                              name="optradio"
                            />True
                          </label>
                          <label class="radio-inline">
                            <input
                              checked={!this.state.status}
                              onClick={() => this.setState({ status: false })}
                              type="radio"
                              name="optradio"
                            />False
                          </label>
                        </form>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <p>{this.state.noti}</p>
                      </div>
                    </div>
                    {this.renderBtnSubmit()}
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
export default Product;
