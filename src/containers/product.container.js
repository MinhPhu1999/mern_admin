import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../actions/product.action";
import Product from "../components/product/product";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class ProductContainer extends Component {
  async componentWillMount() {
    this.props.productActions.getCategory();
    this.props.productActions.getProduct();
    this.props.productActions.getBrand();
    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.productActions.getProduct();
    }
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Product
          product={this.props.product}
          totalpage={this.props.totalpage}
          page={this.props.page}
          category={this.props.category}
          brand={this.props.brand}
          deleteProduct={id => this.props.productActions.deleteProduct(id)}
          backPage={() => this.props.productActions.backPage()}
          nextPage={() => this.props.productActions.nextPage()}
          setPage={page => this.props.productActions.setPage(page)}
          isadd={this.props.isadd}
          isupdate={this.props.isupdate}
          addProduct={(
            id_category,
            name,
            price,
            release_date,
            describe,
            id_nsx,
            id_brand,
            file
          ) =>
            this.props.productActions.addProduct(
              id_category,
              name,
              price,
              release_date,
              describe,
              id_nsx,
              id_brand,
              file
            )
          }
          updateProduct={(
            id,
            name,
            id_category,
            price,
            release_date,
            describe,
            id_nsx,
            id_brand,
            file
          ) =>
            this.props.productActions.updateProduct(
              id,
              name,
              id_category,
              price,
              release_date,
              describe,
              id_nsx,
              id_brand,
              file
            )
          }
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  product: state.productReducers.product.data,
  totalpage: state.productReducers.product.totalpage,
  page: state.productReducers.product.page,
  category: state.productReducers.category.data,
  brand: state.productReducers.brand.data,
  isadd: state.productReducers.product.isadd,
  isupdate: state.productReducers.product.isupdate,
  islogin: state.userReducers.user.islogin
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
)(ProductContainer);
