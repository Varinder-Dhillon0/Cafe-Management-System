import Order from "./order";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { ReactComponent as Rolling } from "../Loaders/RollingLoadersvg.svg";
import { loginContext } from "../context/LoginContext";
import { showContext } from "../context/showCartOrders";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setloading] = useState(true);
    const { email } = useContext(loginContext);
    const { setshowOrders } = useContext(showContext);

    useEffect(() => {
        async function fetchOrders() {
            const AllOrders = await Axios.post(apiUrl + "/getOrders", {
                username: email,
            });
            setOrders(AllOrders.data);
            setloading(false);
        }
        fetchOrders();
    }, [email]);

    return (
        <div className="ordersBack">
            <div
                className="backDrop"
                onClick={() => setshowOrders(false)}
            ></div>
            <div className="orders-wrap">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <h2>My Orders</h2>

                    <AiOutlineCloseCircle
                        size={25}
                        fill="var(--text-color)"
                        onClick={() => setshowOrders(false)}
                        style={{
                            cursor: "pointer",
                        }}
                    ></AiOutlineCloseCircle>
                </div>
                <div className="orders">
                    {/* checking if there are previous orders  by user */}
                    {loading ? (
                        <Rolling />
                    ) : orders.length > 0 ? (
                        orders.map((order, index = orders.indexOf(order)) => {
                            return <Order key={index} order={order}></Order>;
                        })
                    ) : (
                        "No orders yet..."
                    )}
                </div>
            </div>
        </div>
    );
}
