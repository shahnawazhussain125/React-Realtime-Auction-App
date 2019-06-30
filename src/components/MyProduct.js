import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { GetMyProduct, DeleteProduct } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';
class MyProduct extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            products: []
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
            const { GetMyProduct, user } = this.props;
            GetMyProduct(user.uid);
        }
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({products: nextProps.products});
    }

    deleteProduct = (productId, imageURL) =>{
        let start = imageURL.indexOf("2F");
        imageURL = imageURL.substring(start + 2, start + 9);
        // console.log({imageURL, productId})
        this.props.DeleteProduct(productId, imageURL);
    }

    handleClick = (index) =>{
        this.props.history.push('/showproduct/'+ index)
    } 

    handleUpdate = (index) =>{
        this.props.history.push('/updateproduct/'+ index)
    }

    render()
    {
        const { products } = this.state;
        // console.log("My product", this.props);
        return(
            <div className = "d-flex justify-content-center mt-5">
                <div className="col-12">
                    <div className="row">
                        <div style={{padding: "13px 0px 0px 20px"}} className="col-6"> 
                            <Link to ="/dashboard">Back to Dashboard</Link>
                        </div>
                        <div className="row">
                            <h2>My Product</h2>
                        </div>
                    </div>
                    <div className="col-12">
                        <table className="table  table-bordered">
                            <tbody>

                                <tr>
                                    <th>S/No</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Actual Price</th>
                                    <th>Sold Price</th>
                                    <th>End Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                {   
                                    products.length? products.map((value, index)=>{
                                        return(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.data.name}</td>
                                            <td>
                                                <img src={value.data.imageURL} width="100px"/>
                                            </td>
                                            <td>{value.data.category}</td>
                                            <td>{ value.data.minimumBit }</td>
                                            <td>{ value.data.saleAmount? value.data.saleAmount : "Panding"}</td>
                                            <td>{new Date(value.data.endTime).toString().substring(0, 23)}</td>
                                            <td>{value.data.status}</td>
                                            <td>
                                                <Button className="btn btn-primary"  onClick={() => this.handleClick(index)}>Detail</Button>
                                                {
                                                    value.data.status !== "Sold" && <Button className="btn btn-info" onClick={() => this.handleUpdate(index)}>Update</Button>
                                                }
                                                <Button className="btn btn-danger" onClick = {() => this.deleteProduct(value.id, value.data.imageURL)}>Delete</Button>
                                            </td>
                                        </tr>
                                        )
                                    }) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return({
        products: state.userReducer.products,
        user: state.authReducer.user,
        deleteProductError: state.userReducer.deleteProductError,
    })
}

const mapDispatchToProps = (dispatch)=>{
    return({
        GetMyProduct: (uid) => dispatch(GetMyProduct(uid)),
        DeleteProduct: (productId, imageURL) => dispatch(DeleteProduct(productId, imageURL)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)( MyProduct );