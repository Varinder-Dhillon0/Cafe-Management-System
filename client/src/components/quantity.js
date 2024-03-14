import { cartContext } from "../context/CartContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import "../styles/quantity.css";

export default function Quantity({ counter, setCounter, item }) {
    const { cart, setCart, updateservercart } = useContext(cartContext);
    const [showDel, setshowDel] = useState(false);

    const body = document.querySelector("body");

    if (showDel) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }

    const removeItem = async () => {
        const newCart = cart.filter((object) => object.name !== item.name);
        await setCart(newCart);
        await updateservercart(newCart);
        toast.error("Removed from cart");
    };

    useEffect(() => {
        // Update the count in the parent cart state
        const currentCart = cart; // Access current cart value
        // Create a new cart with updated count
        const newCart = currentCart.map((object) =>
            object.name === item.name ? { ...object, count: counter } : object
        );

        setCart(newCart);
        updateservercart(newCart);
    }, [counter, item.name, setCart]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                }}
            >
                <div>
                    <button
                        className="redbtn"
                        type="button"
                        onClick={() => {
                            setCounter((prevCounter) => {
                                const newCounter = Math.max(prevCounter - 1, 1); // Ensure the counter doesn't go below 1

                                return newCounter;
                            });
                            if (counter === 1) {
                                setshowDel(true);
                            }
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // marginTop: "20%",
                            background: "var(--background-color)",
                            border: "1px solid var(--border-color)",
                            // borderStyle: "solid none solid solid",
                            borderTopLeftRadius: "2px",
                            borderBottomLeftRadius: "2px",
                            fontWeight: "600",
                            height: "25px",
                            color: "var(--text-color)",
                        }}
                    >
                        {counter === 1 ? <RiDeleteBinLine /> : "-"}
                    </button>
                </div>

                <p
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "400",
                        border: "1px solid var(--border-color)",
                        borderStyle: "solid none",
                        width: "30px",
                        color: "var(--text-color)",
                    }}
                >
                    {counter}
                </p>
                <button
                    className="greenbtn"
                    type="button"
                    onClick={() => {
                        setCounter((prevCounter) => prevCounter + 1);
                    }}
                    style={{
                        background: "var(--background-color)",
                        border: "1px solid var(--border-color)",
                        // borderStyle: "solid solid solid none",
                        borderTopRightRadius: "2px",
                        borderBottomRightRadius: "2px",
                        fontWeight: "600",
                        color: "var(--text-color)",
                    }}
                >
                    +
                </button>
            </div>
            {showDel &&
                createPortal(
                    <Modal open={showDel}>
                        <div>
                            <div
                                style={{
                                    transform:
                                        "translateX(-40.5px) translateY(-31px)",
                                }}
                            >
                                {/* <svg
                                    width="248px"
                                    height="37px"
                                    viewBox="0 0 248 37"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="popup_header"
                                        stroke="none"
                                        stroke-width="1"
                                        fill="none"
                                        fill-rule="evenodd"
                                    >
                                        <path
                                            d="M234.228443,4.4408921e-15 L242.273543,4.4408921e-15 L247.5,10 L233.5,10 L231.396868,3.99105127 C230.849525,2.42721555 231.673556,0.715767436 233.237392,0.168424931 C233.555918,0.0569408721 233.890971,4.94697393e-15 234.228443,4.88498131e-15 Z"
                                            id="Rectangle-22"
                                            fill="#004D7F"
                                        ></path>
                                        <path
                                            d="M3,0 L242,0 L218.618357,37 L0,37 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z"
                                            id="Rectangle-22-Copy"
                                            fill="#0066A7"
                                        ></path>
                                    </g>
                                </svg> */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="248"
                                    height="37"
                                    viewBox="0 0 248 37"
                                >
                                    <g
                                        fill="none"
                                        fillRule="evenodd"
                                        stroke="none"
                                        strokeWidth="1"
                                    >
                                        <path
                                            fill="#004D7F"
                                            d="M234.228 0h8.046l5.226 10h-14l-2.103-6.009A3 3 0 01234.228 0z"
                                        ></path>
                                        <path
                                            fill="#0066A7"
                                            d="M3 0h239l-23.382 37H0V3a3 3 0 013-3z"
                                        ></path>
                                    </g>
                                </svg>

                                <p
                                    style={{
                                        transform:
                                            "translateX(37.5px) translateY(-31px)",
                                        color: "var(--secondary-text-color)",
                                    }}
                                >
                                    Remove Item
                                </p>
                            </div>
                            <div
                                style={{
                                    transform: "translateY(-15px)",
                                }}
                            >
                                <p>
                                    Are you sure you want to remove this item
                                    from cart?
                                </p>
                                <div className="yesno">
                                    <button
                                        onClick={() => setshowDel(false)}
                                        className="no"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={() => {
                                            removeItem();
                                            setshowDel(false);
                                        }}
                                        className="yes"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>,
                    document.body
                )}
        </>
    );
}
