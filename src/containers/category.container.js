import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../actions/product.action'
import Category from '../components/category/category'
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class CategoryContainer extends Component {
    constructor() {
        super()
    }
    async componentWillMount() {
        this.props.productActions.getCategory()
        let res = await this.props.userActions.auth()
        if (res === false)
            this.props.history.push('/login')
    }
    componentWillReceiveProps(nextProps) {
        if (
          nextProps.islogin !== this.props.islogin &&
          nextProps.islogin === false
        ) {
          this.props.history.push("/login");
        }
        if (nextProps.page !== this.props.page) {
            this.props.productActions.getCategory();
          }
      }
    render() {
        return (
            <section id="container" className="">
            <NavbarContainer/>
            <Slider/>
            <Category
                category={this.props.category}
                addCategory={(name, path) => this.props.productActions.addCategory(name,path)}
                isadd={this.props.isadd}
                updateCategory={(id, name, path) => this.props.productActions.updateCategory(id, name, path)}
                isupdate={this.props.isupdate}
                page={this.props.page}
                totalpage={this.props.totalpage}
                backPage={() => this.props.productActions.categoryBackPage()}
                nextPage={() => this.props.productActions.categoryNextPage()}
                setPage={page => this.props.productActions.categorySetPage(page)}
            />
            </section>
            
        )
    }
}
const mapStateToProps = state => ({
    category: state.productReducers.category.data,
    isadd: state.productReducers.category.isadd,
    isupdate: state.productReducers.category.isupdate,
    islogin: state.userReducers.user.islogin,
    totalpage: state.productReducers.category.totalpage,
    page: state.productReducers.category.page
})

const mapDispatchToProps = dispatch => {
    return ({
        productActions: bindActionCreators(productActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryContainer)