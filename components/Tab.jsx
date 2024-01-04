import React from "react";

const Tab = () => {
  return (
    <div className="panels">
      <section className={`panel ${checkActive(1, "active")}`}></section>
      <div className={`panel ${checkActive(2, "active")}`}>
        <p>
          Nulla lobortis quis massa quis lobortis. Nullam porta semper lorem,
          vel efficitur augue rutrum quis. Suspendisse potenti.
        </p>
      </div>
      <div className={`panel ${checkActive(3, "active")}`}>
        <p>
          Cras porta consectetur dolor porttitor fringilla. Cras vitae urna ac
          erat fermentum egestas. Donec egestas cursus scelerisque.
        </p>
      </div>
    </div>
  );
};

export default Tab;
