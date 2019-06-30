import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { SubmitBit, GetBit} from '../redux/actions/userActions';
class ShowProduct extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            products: props.products,
            bitAmount: 0,
            id: Number(props.match.params.id),
            showBit: true,
            allBits: []
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
            const { products, id } = this.state;
            if(products.length !== 0)
            {
                this.props.GetBit( products[id].id );
            }
            else
            {
                this.handleBack();
            }
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.products.length !== 0)
        {
            const { id } = this.state;
            let showBit = nextProps.products[id].data.ownerId === nextProps.user.uid;
            if(!showBit)
            {
                showBit = nextProps.allBits.filter((value) =>{
                    return value.auctionId === nextProps.user.uid
                })
                showBit = showBit.length? true : false ;
            }
    
            this.setState({
                products: nextProps.products,
                allBits: nextProps.allBits,
                showBit: !showBit,
            });
        }
        else
        {
            this.handleBack();
        }
    }

    handleBack = () =>{
        this.props.history.goBack();
    }

    handleChange = name => event =>{
        this.setState({ [name]: Number(event.target.value)});
    }

    handleClick = () =>{
        const { bitAmount, products, id } = this.state;
        const { user, allBits } = this.props;
        let time = new Date().getTime();
        let amount = allBits.length? Number(allBits[0].bitAmount) : Number(products[0].data.minimumBit);
        if(Number(bitAmount) > amount )
        {
            this.props.SubmitBit({ 
                time, bitAmount,
                bidderId: user.uid, 
                productId: products[id].id, 
                auctionId: products[id].data.ownerId, 
            })            
        }
        else
        {
            alert("Your amount must be grater than " + amount );
        }
    }
    render()
    {
        const { products, id, showBit, allBits } = this.state;
        return(
            <div style={{ }} className="d-flex justify-content-center mt-4 mb-5">
                <Col style={{}} className="col-md-6 col-lg-6 col-sm-10">
                    <Row className="row">
                        <button className="btn btn-success" onClick={this.handleBack}>Back</button>
                    </Row>
                    <Row className="row mt-2">
                        <img className="" width ="100%" height="400px" src={products[id].data.imageURL} alt="logo"/>
                    </Row>
                    <Row style={{border: "1px solid silver", marginTop: "20px", borderRadius: "5px"}} className="row">
                        <table className="table" >
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{products[id].data.name}</td>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <td>{products[id].data.category}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{products[id].data.description}</td>
                                </tr>
                                <tr>
                                    <th>Original Price</th>
                                    <td>{products[id].data.minimumBit}</td>
                                </tr>
                                <tr>
                                    <th>End Time</th>
                                    <td>{new Date(products[id].data.endTime).toString().substring(3, 24)}</td>
                                </tr>
                                {
                                showBit && <tr>
                                        <th>Submit your Bits</th>
                                        <td>
                                            <input type="number" onChange={this.handleChange("bitAmount")}/>
                                        </td>
                                    </tr>
                                }
                                {
                                showBit && <tr>
                                        <td></td>
                                        <td>
                                            <button className="btn btn-success" onClick = { this.handleClick }>Submit</button>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </Row>
                    {
                        allBits.length? 
                        <Row style={{marginTop: "20px", justifyContent: "center"}} className="row">
                            <h4>All Bits</h4>
                        </Row> : ""
                    }
                    {
                        allBits.length ?
                        <Row style={{border: "1px solid silver", borderRadius: "5px"}} className="row">
                            <table className="table" >
                                <thead>
                                    <tr>
                                        <th>S/No</th>
                                        <th>Bit Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    allBits.map((value, index) =>{
                                        return(
                                            <tr key={index} className={value.bidderId === this.props.user.uid ? "bg-success" : ""} >
                                                <td>{index + 1}</td>
                                                <td>{value.bitAmount}</td>
                                                <td>{new Date(value.time).toString().substring(3, 24)}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </Row>: ""
                    }
                </Col>
            </div>    
        )
    }
}

const mapStateToProps = (state) =>{
    return({
        products: state.userReducer.products,
        user: state.authReducer.user,
        allBits: state.userReducer.allBits,
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        SubmitBit: (submit_data) => dispatch(SubmitBit(submit_data)),
        GetBit: (adsId) => dispatch(GetBit(adsId)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProduct);