import { useState } from "react";
import { useEffect } from "react";
import Cart from "../cart/Cart";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import "./App.css";

export default function App() {
    //const [error, setError] = useState(null);
    //const [isLoaded, setIsLoaded] = useState(false);

    const [data, setData] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [order, setOrder] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch("pizza.json")
            .then((res) => res.json())
            .then((result) => {
                setData(result.data);
                setfilterData(result.data);
            });
    }, []);

    useEffect(() => {
        let pizzaPriceArr = order.map((item) => item.price * item.quant);
        if (pizzaPriceArr.length !== 0) setTotalPrice(pizzaPriceArr.reduce((a, b) => a + b));
        else setTotalPrice(0);
    }, [order]);

    useEffect(() => {
        setMainData(filterData);
    }, [filterData]);

    useEffect(() => {
        setMainData(searchData);
    }, [searchData]);

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = () => setShowModal(true);

    const onAddToCart = (pizza) => {
        let repeatedPizza = order.find((item) => pizza.id === item.id);
        let newArray = [];
        if (repeatedPizza) {
            let newOrder = order.map((item) => {
                if (pizza.id === item.id) {
                    return { ...item, quant: item.quant + 1 };
                } else {
                    return item;
                }
            });
            newArray = [...newOrder];
        } else {
            newArray = [...order, pizza];
        }
        setOrder(newArray);
    };

    const onDeleteCartItem = (id) => setOrder(order.filter((item) => id !== item.id));

    const onChangeQuant = (id, x) => {
        let pizza = order.find((item) => id === item.id);
        let newArray = [];
        if (pizza.quant < 20 && x > 0) {
            pizza = { ...pizza, quant: pizza.quant + x };
            newArray = order.map((item) => (id === item.id ? pizza : item));
        } else if (pizza.quant > 1) {
            pizza = { ...pizza, quant: pizza.quant + x };
            newArray = order.map((item) => (id === item.id ? pizza : item));
        } else {
            newArray = order;
        }
        setOrder(newArray);
    };

    const onFilter = (e) => {
        let type = e.target.value;
        let newData = type === "all" ? data.map((item) => item) : data.filter((item) => item[type]);
        setfilterData(newData);
    };

    const onSearch = (e) => {
        let searchText = e.target.value.trim().toUpperCase();
        let newData = filterData.filter((item) => {
            let name = item.name;
            let textInName = name.slice(0, searchText.length).toUpperCase();
            if (textInName === searchText) {
                return item;
            }
        });
        setSearchData(newData);
    };

    return (
        <>
            <Header handleShowModal={handleShowModal} totalQuant={order.length} order={order} />
            <Main data={mainData} onAddToCart={onAddToCart} onFilter={onFilter} onSearch={onSearch} />
            <Footer />
            <Cart
                order={order}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                onChangeQuant={onChangeQuant}
                onDeleteCartItem={onDeleteCartItem}
                totalPrice={totalPrice}
            />
        </>
    );
}
