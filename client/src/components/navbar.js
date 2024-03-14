import { RiSearchLine } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiAlignJustify } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { showContext } from "../context/showCartOrders";
import { cartContext } from "../context/CartContext";
import { useContext, useState } from "react";
import { RiAccountBoxLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import logo from "..//images/logo.png";

export default function Navbar() {
    // getting context values
    const { setshowCart, setshowOrders } = useContext(showContext);
    const { totalItems } = useContext(cartContext);

    const [openProfile, setopenProfile] = useState(false);

    // hamburger for mobiles
    const [showMenu, setShowMenu] = useState(false);

    const cookies = new Cookies();

    //logout function
    function logout() {
        cookies.remove("username");
        cookies.remove("name");

        toast.error("logged out");

        //reloading the page to reflect changes
        window.location.reload(false);
    }

    return (
        <nav className="nav">
            <div>
                <a href="/">Brewtopia</a>
            </div>

            <div className="flex">
                <div className="cartOrders">
                    <div className="search">
                        <RiSearchLine size={25} style={{ padding: "2px" }} />
                        <input
                            className="navLabel"
                            type="search"
                            placeholder="Search"
                            style={{
                                marginLeft: "12px",
                                height: "25px",
                                background: "none",
                                border: "none",
                                outline: "none",
                                borderBottom: "1px solid",
                                width: "140px",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => setshowCart(true)}
                    >
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <RiShoppingCartLine
                                size={25}
                                style={{ padding: "2px" }}
                            ></RiShoppingCartLine>
                            {totalItems ? (
                                <p className="total-items">{totalItems}</p>
                            ) : (
                                ""
                            )}
                        </div>
                        <label
                            className="navLabel"
                            style={{
                                marginLeft: "12px",
                                cursor: "pointer",
                            }}
                        >
                            Cart
                        </label>
                    </div>
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            background: "var(--headings-bg)",
                            border: "1px dashed var(--)",
                            borderRadius: "5px",
                            padding: "10px 20px",
                            cursor: "pointer",
                            width: "198px",
                        }}
                        onClick={() => setopenProfile((prev) => !prev)}
                    >
                        <RiAccountBoxLine
                            fill="var(--secondary-text-color)"
                            size={25}
                            style={{ padding: "2px" }}
                        />
                        <h1
                            className="navLabel"
                            style={{
                                color: "var(--secondary-text-color)",
                                marginLeft: "12px",
                            }}
                        >
                            My Account
                        </h1>
                        {openProfile ? (
                            <RiArrowDropUpLine
                                fill="var(--secondary-text-color)"
                                size={25}
                                style={{ padding: "2px" }}
                            />
                        ) : (
                            <RiArrowDropDownLine
                                fill="var(--secondary-text-color)"
                                size={25}
                                style={{ padding: "2px" }}
                            />
                        )}
                    </div>
                </div>
                {openProfile && (
                    <div className="dropDown">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => setshowOrders(true)}
                        >
                            <RiFileList3Line
                                size={25}
                                style={{ padding: "2px" }}
                            />
                            <label
                                className="navLabel"
                                style={{
                                    marginLeft: "12px",
                                    cursor: "pointer",
                                }}
                            >
                                Orders
                            </label>
                        </div>
                        <hr
                            style={{
                                margin: "10px 0",
                                borderTop: "0.5px dashed var(--border-color)",
                            }}
                        ></hr>
                        <div
                            className="user"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => logout()}
                        >
                            <RiLogoutBoxLine
                                size={25}
                                style={{ padding: "2px" }}
                            />
                            <div className="username">
                                <label
                                    className="navLabel"
                                    style={{
                                        marginLeft: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Logout
                                </label>
                                {/* <h3>{name}</h3> */}
                                {/* <p>{email}</p> */}
                            </div>
                        </div>
                    </div>
                )}
                <div className="hamburgerMenu">
                    <div onClick={() => setShowMenu(!showMenu)}>
                        <FiAlignJustify size={20}></FiAlignJustify>
                    </div>
                </div>
            </div>
        </nav>
    );
}
