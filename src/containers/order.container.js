import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../actions/product.action";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import Order from "../components/order/order";
class OrderContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.productActions.getOrder("true");
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
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Order
          page={this.props.page}
          totalpage={this.props.totalpage}
          order={this.props.order}
          backPage={() => this.props.productActions.orderBackPage()}
          nextPage={() => this.props.productActions.orderNextPage()}
          setPage={page => this.props.productActions.orderSetPage(page)}
          getOrder={(status => this.props.productActions.getOrder(status))}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  islogin: state.userReducers.user.islogin,
  totalpage: state.productReducers.order.totalpage,
  page: state.productReducers.order.page,
  order: state.productReducers.order.data
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
)(OrderContainer);
