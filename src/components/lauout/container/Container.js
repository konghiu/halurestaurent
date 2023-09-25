import React from "react";

const Container = ({ children }) => {
     return (
          <section className={"center py-8"}>
               <div className="container">{children}</div>
          </section>
     );
};

export default Container;
