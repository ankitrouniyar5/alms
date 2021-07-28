import React from "react"

function Footer(){

    var year = new Date().getFullYear();
    return (
        <footer>
        <p> Beetle Nut Solutions  &copy;{year}</p>
        </footer>
    );
}

export default Footer;