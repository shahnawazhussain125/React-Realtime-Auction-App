import firebase from '../../config/firebase';

export const AddProduct = (product_detail) =>{
    return(dispatch) =>{
        let imgRef = firebase.storage().ref().child(`images/${Math.random().toString().substring(3, 10)}`);
        
        imgRef.put(product_detail.image)
        .then(()=>{
            imgRef.getDownloadURL()
           .then(url=>{
               firebase.firestore().collection('products').add({
                   name: product_detail.name,
                   category: product_detail.category,
                   minimumBit: product_detail.minimumBit,
                   endTime: product_detail.endTime,
                   description: product_detail.description,
                   ownerId: product_detail.uid,
                   imageURL: url,
                   status: 'Not Sale'
               })
               .then(()=>{
                dispatch({type: "ADDPRODUCT_SUCCESS", error: null, message: `${product_detail.name} is successfully added`})
               })
           })
        })
        .catch(error =>{
            dispatch({type: "ADDPRODUCT_ERROR", error})
        })
    }
}


export const GetProductByCategory = (category) =>{
    return(dispatch) =>{
        let products = [];
        firebase.firestore().collection('products').where('category', '==', category)
        .onSnapshot((shapShot) =>{
            products = [];
            shapShot.forEach((doc) =>{
                let time = new Date().getTime();
                if(doc.data().endTime > time)
                {
                    products.push({id: doc.id, data: doc.data()})
                }
            })
            dispatch({type: "GETPRODUCTBYCATEGORY_SUCCESS", products});
        }, (error) =>{
            dispatch({type: "GETPRODUCTBYCATEGORY_ERROR", error });
        })
    }
}


export const GetMyProduct = (ownerId) =>{
    return(dispatch) =>{
        let products = [];
        firebase.firestore().collection('products').where('ownerId', '==', ownerId)
        .onSnapshot((shapShot) =>{
            products = [];
            shapShot.forEach((doc) =>{
                products.push({id: doc.id, data: doc.data()})
            })
            dispatch({type: "GETMYPRODUCT_SUCCESS", products});
        },(error) =>{
            dispatch({type: "GETMYPRODUCT_ERROR", error });
        })
    }
}


export const SubmitBit = (bit_data) =>{
    return(dispatch) =>{
        firebase.firestore().collection('allBits')
        .add({
            auctionId: bit_data.auctionId,
            bidderId: bit_data.bidderId, 
            productId: bit_data.productId,
            time: bit_data.time,
            bitAmount: bit_data.bitAmount
        })
        .then(()=>{
            alert("Successfully Submitted");
            dispatch({type: "SUBMITBIT_SUCCESS"})
        })
        .catch((error)=>{
            alert(error);
            dispatch({type: "SUBMITBIT_ERROR", error})
        })
    }
}

export const GetBit = (productId) =>{
    return(dispatch) =>{
        let allBits = []
        firebase.firestore().collection('allBits').where("productId", "==", productId).orderBy("bitAmount", 'desc')
        .onSnapshot((snapShot) =>{
            allBits = []
             snapShot.forEach(vlaue => {
                allBits.push(vlaue.data());
             });
             dispatch({type: "GETBIT_SUCCESS", allBits});
        }, (error) =>{
            dispatch({type: "GETBIT_ERROR", error})
        })
    }
}

export const DeleteProduct = ( productId, imageURL ) =>{
    return(dispatch) =>{

        let collectionRef = firebase.firestore().collection('allBits');
        collectionRef.where("productId", "==", productId).get()
        .then(response => {
            firebase.firestore().collection('products').doc( productId ).delete()
            .then(()=>{

                firebase.storage().ref().child(`images/${imageURL}`).delete()
                .then(() => {
                    response.forEach((doc) => {
                        doc.ref.delete()
                        .then(() => {
                            console.log("Document successfully deleted!");
                        })
                        .catch((error)=>{
                            dispatch({type: "DELETEPRODUCT_ERROR", error})
                        });
                    })
                    alert("Product delete successfull")
                    dispatch({type: "DELETEPRODUCT_SUCCESS"})
                })
                .catch((error)=>{
                    alert(error)
                    dispatch({type: "DELETEPRODUCT_ERROR", error})
                });                
            })
        })
        .catch((error) =>{
            alert(error);
            dispatch({type: "DELETEPRODUCT_ERROR", error})
        });
    }
}

export const GetMyCart = (ownerId) =>{
    return(dispatch) =>{
        let products = [];
        firebase.firestore().collection('carts').where('bidderId', '==', ownerId)
        .onSnapshot((shapShot) =>{
            products = [];
            shapShot.forEach((doc) =>{
                products.push({id: doc.id, data: doc.data()})
            })
            dispatch({type: "GETMYCART_SUCCESS", products});
        },(error) =>{
            dispatch({type: "GETMYCART_ERROR", error });
        })
    }
}

export const GetMyBit = (bidderId) =>{
    return(dispatch) =>{
        let products = [];
        firebase.firestore().collection('allBits').where('bidderId', '==', bidderId)
        .onSnapshot((shapShot) =>{
            products = [];
            shapShot.forEach((doc) =>{
                firebase.firestore().collection('products').doc(doc.data().productId).get()
                .then((resp) =>{
                    products.push({id: resp.id, data: {...resp.data(), bitAmount: doc.data().bitAmount}});
                    dispatch({type: "GETMYBIT_SUCCESS", products});
                })
                .catch((error) =>{
                    dispatch({type: "GETMYBIT_ERROR", error });
                })
            })
            console.log("hhhhhhh", products)
        },(error) =>{
            dispatch({type: "GETMYBIT_ERROR", error });
        })
    }
}


export const SaleProduct = (saleData) =>{
    const { productId, data } = saleData;
    return(dispatch) =>{
        let allBits = []
        firebase.firestore().collection('allBits').where("productId", "==", productId).orderBy("bitAmount", 'desc')
        .get()
        .then((snapShot) =>{
            allBits = []
             snapShot.forEach(vlaue => {
                allBits.push(vlaue.data());
             });

            if(allBits.length)
            {                
                firebase.firestore().collection('carts')
                .add({
                    ...data,
                    bidderId: allBits[0].bidderId,
                    saleAmount: allBits[0].bitAmount,
                    status: "Sold"                       
                })
                .then(() =>{
                    firebase.firestore().collection('products').doc(productId).update({
                        status: "Sold",
                        saleAmount: allBits[0].bitAmount,
                    })
                    .then(()=>{
                        dispatch({type: "SOLDPRODUCT_SUCCESS"});
                    })
                })
                .catch((error)=>{
                    dispatch({type: "SOLDPRODUCT_ERROR", error})
                })
            }
        })
        .catch((error) =>{
            dispatch({type: "SOLDPRODUCT_ERROR", error})
        })
    }
} 

export const GetAllProduct = () =>{
    return(dispatch)=>{
        let allProducts = [];
        firebase.firestore().collection('products').get()
        .then((response) =>{
            allProducts = []
            response.forEach((doc) =>{
                allProducts.push({id: doc.id, data: doc.data()});
            })
            dispatch({type: "GETALLPRODUCT_SUCCESS", allProducts});
        })
        .catch((error) =>{
            dispatch({type: "GETALLPRODUCT_ERROR", error});
        })
    }
}

export const ProductUpdate = (product_detail) =>{
    return(dispatch) =>{
        firebase.firestore().collection('products').doc(product_detail.id).update({
            name: product_detail.name,
            category: product_detail.category,
            minimumBit: product_detail.minimumBit,
            endTime: product_detail.endTime,
            description: product_detail.description,
            ownerId: product_detail.uid,
            status: 'Not Sale'
        })
        .then(()=>{
            alert(`${product_detail.name} is successfully Updated`);
            dispatch({type: "UPDATEPRODUCT_SUCCESS", error: null, message: `${product_detail.name} is successfully Updated`})
        })
        .catch((error) =>{
            dispatch({type: "UPDATEPRODUCT_ERROR", error})
        })
    }
}