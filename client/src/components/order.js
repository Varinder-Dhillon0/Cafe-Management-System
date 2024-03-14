import { MdDone } from "react-icons/md";

//this is function for each order to display
//it is mapped by app page
export default function Order(props) {
    //destructuring of props
    const { order } = props;
    const { amount, order_id, time, method } = order;

    return (
        // displaying order by user
        <div className="order">
            <div>
                <MdDone
                    size={18}
                    fill="white"
                    style={{
                        background: "#67df67",
                        padding: "3px",
                        borderRadius: "100px",
                    }}
                />{" "}
            </div>
            <div style={{ marginLeft: "12px", lineHeight: "21px" }}>
                <h4>{order_id}</h4>
                <p>Order of ₹{amount / 100}</p>
                <p>Mode of payment : {method}</p>
                <h6>{time}</h6>
            </div>
        </div>
    );
}
