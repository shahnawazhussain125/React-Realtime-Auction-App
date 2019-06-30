import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchProduct from '../components/SearchProduct';
import { GetAllProduct, SaleProduct } from '../redux/actions/userActions';
import { connect } from 'react-redux';

class DashBoard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }

    componentDidMount()
    {
        if(!this.props.user)
        {
            this.props.history.push("/signin")
        }
        else
        {
            this.props.GetAllProduct();
        }
    }

    componentWillReceiveProps(nextProps)
    {
        let time = new Date().getTime();
        let productToSale = nextProps.allProducts.filter((value, index ) =>{
            return time > value.data.endTime && value.data.status === "Not Sale";
        })
        
        productToSale.map((value) =>{
            this.props.SaleProduct({ productId: value.id, data: value.data });
        })
    }

    handleChange = name => event =>{
        this.setState({[name]: event.target.value});
    }

    handleRoute = (path) =>{
        this.props.history.push(`/${path}`);
    }

    render(){
        return(
            <div className ="container-fluid mt-2">
                <div style={{ border: "1px solid silver", borderRadius: "10px"}} className="row justify-content-center">
                    <div className="m-2">
                        <button className="btn btn-primary m-2" onClick={() => this.handleRoute('addproduct')}>Add Product</button>
                        <button className="btn btn-success m-2" onClick={() => this.handleRoute('myproduct')}>My Product</button>
                        <button className="btn btn-warning m-2" onClick={() => this.handleRoute('mybit')}>My Bit</button>
                        <button className="btn btn-warning m-2" onClick={() => this.handleRoute('mycart')}>My Cart</button>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <SearchProduct history = { this.props.history } />
                </div>   
            </div>
        )
    }
} 

const mapStateToProps = (state) =>{
    return({
        allProducts: state.userReducer.allProducts,
        user: state.authReducer.user
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        GetAllProduct: () => dispatch(GetAllProduct()),
        SaleProduct: (data) => dispatch(SaleProduct(data))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);