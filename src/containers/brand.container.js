import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../actions/product.action";
import Brand from "../components/brand/brand";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class BrandContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.productActions.getBrand();
    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
    if (nextProps.page !== this.props.page) {
      this.props.productActions.getBrand();
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Brand
          brand={this.props.brand}
          isadd={this.props.isadd}
          addBrand={name => this.props.productActions.addBrand(name)}
          updateBrand={(id, name) =>
            this.props.productActions.updateBrand(id, name)
          }
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.productActions.brandBackPage()}
          nextPage={() => this.props.productActions.brandNextPage()}
          setPage={page => this.props.productActions.brandSetPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  brand: state.productReducers.brand.data,
  isadd: state.productReducers.brand.isadd,
  isupdate: state.productReducers.brand.isupdate,
  islogin: state.userReducers.user.islogin,
  totalpage: state.productReducers.brand.totalpage,
  page: state.productReducers.brand.page
});

const mapDispatchToProps = dispatch => {
  return {
    productActions: bindActionCreators(productActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandContainer);
