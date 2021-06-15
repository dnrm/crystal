import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 p-6 border-gray-300 border-t-2">
            <div className="main">
                <h3>© Daniel Medina 2021</h3>
                <p>Made with ❤️</p>
            </div>
            <div className="socials mt-1">
                <a href="https://instagram.com/dannermm" rel="noreferrer" target="_blank">
                    <i className="fab fa-instagram text-2xl mr-2 text-black" aria-hidden="false"></i>
                </a>
                <a href="https://twitter.com/_dnrm" rel="noreferrer" target="_blank">
                    <i className="fab fa-twitter text-2xl mr-2 text-black" aria-hidden="false"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
