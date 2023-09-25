import React from "react";
import Slider from "react-slick";
import NewsItem from "../../../lauout/news/NewsItem";

const settings = {
     dots: true,
     infinite: false,
     speed: 500,
     slidesToShow: 3,
     slidesToScroll: 2,
};

const Section7 = () => {
     return (
          <section className="section7 center py-12">
               <div className="container">
                    <h1 className="home__h1 text-center">
                         Những bài viết mới nhât
                    </h1>
                    <h2 className="home__h2 text-center">- Tin tức -</h2>
                    <div></div>
                    <Slider {...settings}>
                         {[1, 2, 3, 4, 5].map((num) => (
                              <NewsItem key={num} />
                         ))}
                    </Slider>
               </div>
          </section>
     );
};

export default Section7;
