import React from "react";
import Link from "next/link";

const Navbar = (props) => {
  return (
    <div>
      <header>
        <nav className="container">
          <Link href="/">
            <h2>instasew</h2>
          </Link>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;
