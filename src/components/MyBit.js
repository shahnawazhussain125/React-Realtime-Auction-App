import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyBit } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';
class MyBit extends Component
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
            const { GetMyBit, user } = this.props;
            GetMyBit(user.uid);
        }
    }

    componentWillReceiveProps(nextProps)
    {
        // console.log("Productd", nextProps.products)
        this.setState({products: nextProps.products});
    }

    render()
    {
        const { products } = this.state;
        // console.log("Products.......", products)
        return(
            <div className = "d-flex justify-content-center mt-5">
                <div className="col-12">
                    <div className="row">
                        <div style={{padding: "13px 0px 0px 20px"}} className="col-6"> 
                            <Link to ="/dashboard">Back to Dashboard</Link>
                        </div>
                        <div className="row">
                            <h2>My Bit</h2>
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
                                    <th>Product Price</th>
                                    <th>End Time</th>
                                    <th>My Bit</th>
                                    <th>Status</th>
                                </tr>
                                {   
                                    products.length? products.map((value, index)=>{
                                        return(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.data.name}</td>
                                            <td>
                                                <img src={value.data.imageURL} jsx-ally="Product Image" width="100px"/>
                                            </td>
                                            <td>{value.data.category}</td>
                                            <td>{ value.data.minimumBit }</td>
                                            <td>{new Date(value.data.endTime).toString().substring(0, 23)}</td>
                                            <td>{value.data.bitAmount}</td>
                                            <td>{value.data.status}</td>
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
        GetMyBit: (uid) => dispatch(GetMyBit(uid)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)( MyBit );