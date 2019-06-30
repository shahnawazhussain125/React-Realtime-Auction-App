import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetProductByCategory, SaleProduct } from '../redux/actions/userActions';

class SearchProduct extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            products: [],
            category: "cloth"
        }
    }

    componentDidMount()
    {
        const { products, user} = this.props;

        if(user)
        {
            // let time = new Date().getTime();
            // let activeProducts = products.filter((value ) =>{
            //     return value.data.endTime > time
            // })

            // this.setState({products: activeProducts});
        
        }
        else
        {
            this.props.history.push("/signin")
        }
        
    }

    componentWillReceiveProps(nextProps)
    {
        let { products, user } = nextProps;
        
        if(user)
        {
            if(products.length === 0)
            {
                alert("No items found");
                this.setState({products})
            }
            else
            {
                let time = new Date().getTime();
                let activeProducts = products.filter((value ) =>{
                    return value.data.endTime > time
                })
                // console.log({activeProducts})
                activeProducts.length ? this.setState({products: activeProducts}) :  alert("No items found"); this.setState({products: activeProducts}) ;
            }
        }
    }

    handleChange = name => event =>{
        this.setState({[name]: event.target.value});
    }

    handleSubmit = event =>{
        const { category } = this.state;
        // console.log("category", category);
        this.props.GetProductByCategory(category);
    }

    handleClick = (index) =>{
        // console.log("index......", this.props);
        this.props.history.push('/showproduct/'+ index)
    }

    render()
    {
        const { products } = this.state;

        return(
            <div style={{ border: "1px solid silver", borderRadius: "10px"}} className = "justify-content-center mt-5">
                <div style={{ justifyContent: "center", padding: "10px 0px" }} className="row">
                    <h2 style={{fontWeight: "bold"}}>Search Product</h2>
                </div>
                <div style={{ justifyContent: "center", padding: "10px 0px"}} className="form-inline">
                    <div className="form-group mx-sm-3 mb-2 w-10">
                        <label className="sr-only">Category</label>
                        <select className = "form-control" onChange={this.handleChange('category')}>
                            <option value = "cloth">Cloth</option>
                            <option value = "electronics">Electronics</option>
                            <option value = "furniture">Furniture</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit}>Search</button>
                </div>
                <div className="col-12">
                    <div className="row">
                        <table className="table">
                            <tbody>

                                <tr>
                                    <th>S/No</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Minimun Bit</th>
                                    <th>End Time</th>
                                    <th>Status</th>
                                </tr>
                                {
                                    products.length? products.map((value, index)=>{
                                        return(
                                        <tr key={index} onClick={()=> this.handleClick(index)}>
                                            <td>{index + 1}</td>
                                            <td>{value.data.name}</td>
                                            <td>
                                                <img src={value.data.imageURL} alt="product image" width="100px"/>
                                            </td>
                                            <td>{value.data.category}</td>
                                            <td>{ value.data.minimumBit }</td>
                                            <td>{new Date(value.data.endTime).toString().substring(0, 23)}</td>
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
        user: state.authReducer.user
    })
}

const mapDispatchToProps = (dispatch)=>{
    return({
        GetProductByCategory: (uid) => dispatch(GetProductByCategory(uid)),
        SaleProduct: (id) => dispatch(SaleProduct(id))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)( SearchProduct );