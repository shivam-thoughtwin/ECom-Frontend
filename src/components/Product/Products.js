import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Tooltip from '@mui/material/Tooltip';
import { useAlert } from 'react-alert';
import MataData from '../../components/layout/MataData'


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Top",
    "Camera",
    "SmartPhones",
]

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const alert = useAlert()
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    const {
        products,
        loading,
        error,
        productCount,
        resultPerPage,
    } = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

    return (
        <Fragment>
            {
                loading ? (<Loader />) :
                    (
                        <Fragment>
                            <MataData title="PRODUCTS -- E-COMMERCE" />
                            <h2 className='productsHeading'>Products</h2>
                            <div className='products'>
                                {products &&
                                    products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                                }
                            </div>

                            <div className="filterBox">
                                <Typography>Price</Typography>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby='range-slider'
                                    min={0}
                                    max={25000}
                                />
                                <div className='filterTop'>
                                    <Typography>Categories</Typography>
                                    <Typography style={{ cursor: 'pointer' }} onClick={(e) => setCategory("")}>
                                        <Tooltip title="Clear" placement="left">
                                            <ClearAllIcon />
                                        </Tooltip>
                                    </Typography>
                                </div>
                                <ul className="categoryBox">
                                    {categories.map((category) => (
                                        <li
                                            className='category-link'
                                            key={category}
                                            onClick={() => setCategory(category)}
                                        >
                                            <ArrowForwardIosIcon /> {category}
                                        </li>
                                    ))}
                                </ul>
                                <fieldset>
                                    <Typography component="legend">Rating Above</Typography>
                                    <Slider 
                                        value={ratings}
                                        onChange={(e, newRating)=>{
                                            setRatings(newRating)
                                        }}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="continuous-slider"
                                        min={0}
                                        max={5}
                                    />
                                </fieldset>
                            </div>

                            {
                                resultPerPage < productCount &&
                                <div className='paginationBox'>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass='page-item'
                                        linkClass='page-link'
                                        activeClass='pageItemActive'
                                        activeLinkClass='pageLinkActive'
                                    />
                                </div>
                            }

                        </Fragment>
                    )
            }
        </Fragment>
    )
}

export default Products
