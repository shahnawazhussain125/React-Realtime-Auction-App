import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductUpdate } from '../redux/actions/userActions';

class UpdateProduct extends Component
{
    constructor()
    {
        super();
        this.state = {
            name: "",
            image: "",
            minimumBit: "",
            category: "cloth",
            time: "",
            date: "",
            description: "",
            id: '',
        }
    }

    componentDidMount()
    {
        const { products, match, user} = this.props;
        let id = match.params.id; 
        let selectProduct = products[id];
       
        let date = new Date(selectProduct.data.endTime)
        let month = (date.getMonth() + 1) < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1);
        let todate = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        let hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
        let minute = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
        date = date.getFullYear() + "-" + month  + "-" + todate;
        let time = hour+":"+minute;
        if(user)
        {
            this.setState({
                name: selectProduct.data.name,
                category: selectProduct.data.category,
                image: "",
                minimumBit: selectProduct.data.minimumBit,
                time,
                date: date,
                description: selectProduct.data.description,
                id: selectProduct.id
            })
        }
        else
        {
            this.props.history.push("/signin")
        }
    }

    componentWillReceiveProps (nextprops)
    {
        if(nextprops.addDataError)
        {
            alert(nextprops.addDataError.message);
        }
    }
    handleChange = name => event =>{
        this.setState({ [name]: event.target.value });
    }

    handleDateChange = name => (event) =>{
       
        if(this.validateDate(event.target.value))
        {
            this.setState({[name]: event.target.value});
        }
        else
        {
            alert('Date Must be greater than current date')
        }
    }

    validateDate = (select_date) =>{
         select_date = new Date(select_date).getTime();
        let current_date = new Date();
            current_date.setHours(5);
            current_date.setMinutes(0);
            current_date.setSeconds(0);
            current_date.setMilliseconds(0);
            current_date = current_date.getTime();
            return select_date >= current_date? true : false;
    }
    
    handleClick = event =>{
        const { name, category, description, minimumBit, date, time, id } = this.state;

        if(name !== "" && name !== " " && category !== "" 
            && minimumBit !== "" && date !== "" && date !== " " && time !== "" 
            && time !== " " && description !== "" && description !== " ")
        {
            if(this.validateDate(date))
            {
                let endTime = new Date(date + " " + time).getTime();

                let currentTime = new Date().getTime();
    
                if(endTime > currentTime)
                {
                    this.props.ProductUpdate({ name ,description, minimumBit, category, endTime, uid: this.props.user.uid, id })
                }
                else
                {
                    alert("EndTime must be grate than current time");
                }
            }
            else
            {
                alert('Date Must be greater than current date')
            }           
        }
        else
        {
            alert("Please Complete From");
        }       
        
    }

    handleRoute = () =>{
        this.props.history.push("/myproduct");
    }
    render()
    {
        const {name, minimumBit, time, date, description,category } = this.state;
        return(
            <div style={{ margin: '10px'}} className="d-flex justify-content-center">
                <div style={{border: '1px solid gray', borderRadius: "5px", padding: "20px"}} className="col-lg-6 col-md-6 col-sm-10 ">
                    <div className="row text-align-center">
                        <div className="col-4">
                            <button className="btn btn-success" onClick={this.handleRoute}>Back</button>
                        </div>
                        <div className="col-8">
                            <h2>Update Product</h2>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input 
                            type = "text" 
                            value = { name }
                            placeholder = "Product Name" 
                            className = "form-control" 
                            onChange = {this.handleChange('name')}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select 
                            className = "form-control" 
                            onChange={this.handleChange('category')}
                        >
                            <option value = "cloth" selected={category === "cloth"? true : false}>Cloth</option>
                            <option value = "electronics" selected={category === "electronics"? true : false}>Electronics</option>
                            <option value = "furniture" selected={category === "furniture"? true : false}>Furniture</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            rows="4" 
                            cols="50"
                            className="form-control"
                            value={description}
                            onChange={this.handleChange('description')}
                        >

                        </textarea>
                    </div>
                    <div className="form-group">
                        <label>Minimum Bit (Rs)</label>
                        <input 
                            type="number" 
                            placeholder="Product Price" 
                            className="form-control" 
                            value={minimumBit}
                            onChange={this.handleChange('minimumBit')}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={date}
                            onChange={this.handleDateChange('date')}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Time</label>
                        <input 
                            type="time" 
                            value={time}
                            className="form-control" 
                            onChange = { this.handleChange('time') }
                        />
                    </div>
                    <button className="btn btn-success w-100" onClick={this.handleClick}>Update</button>
                </div>
            </div>
        )
    }
}

const mapSateToProps = (state) =>{
    return({
        user: state.authReducer.user,
        message: state.userReducer.message,
        products: state.userReducer.products,
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        ProductUpdate: (data) => dispatch(ProductUpdate(data)),
    })
}
export default connect(mapSateToProps, mapDispatchToProps)(UpdateProduct);