import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from './ProductCard.js';
import MataData from "../layout/MataData";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProducts())
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {loading ? <Loader /> :

                <Fragment>

                    <MataData title="ECommerce" />
                    <div className="banner">
                        <p>Welcome to ECommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <ArrowDownwardIcon />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">

                        {
                            products && products.map((product, index) => (
                                <Product product={product} index={index} />
                            ))
                        }

                    </div>

                </Fragment >
            }
        </Fragment>
    )
}

export default Home
