import React, { useEffect, useState } from "react";

import treding1 from "./assets/img/treding1.jpg";
import men from "./assets/img/Men.jpg";
import become_member from "./assets/img/become_member.jpg";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import { BsFacebook, BsInstagram, BsGoogle, BsTwitter } from "react-icons/bs";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "40px",
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [product, setProduct] = useState([]);
  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/product-slider`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.products);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  console.log(product);
  return (
    <div className="container-fluid p-0">
      <div className="banner">
        <ReactPlayer
          playing={true}
          autoplay
          loop={true}
          width="100%"
          height="100%"
          muted={true}
          controls={true}
          url="https://brand.assets.adidas.com/video/upload/q_auto,vc_auto/video/upload/running-fw22-supernova-launch-hp-masthead-large-3d-d_u6rjfy.mp4"
          className="banner_vid"
        />
        <div className="banner_info">
          <p className="banner_descr">Member Access: Find Your Fast</p>
          <Link to="/collections">
            <button type="button" className="btn btn-lg btn-light rounded-pill">
              Shop Fast Pack
            </button>
          </Link>
        </div>
      </div>
      <div className="trending container">
        <div className="trending-title d-flex flex-column">
          Trending
          <span className="custom_line"></span>
        </div>
        <div className="row">
          <div className="trending1 col-md-6">
            <img src={treding1} className="img-trending1" alt="img1" />
            <div className="trending1_info">
              <p className="trending1_descr">Women Collection</p>
              <Link to="/collections/Women">
                <button
                  type="button"
                  className="btn btn-md btn-light rounded-pill fw-bold"
                >
                  Shop
                </button>
              </Link>
            </div>
          </div>
          <div className="trending2 col-md-6">
            <img src={treding1} className="img-trending2" alt="img2" />
            <div className="trending2_info">
              <p className="trending2_descr">Men Collection</p>
              <Link to="/collections/Men">
                <button
                  type="button"
                  className="btn btn-md btn-light rounded-pill fw-bold"
                >
                  Shop
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="represent container">
        <div className="represent-title d-flex flex-column">
          Representative Products
          <span className="custom_line"></span>
        </div>
        <div className="represent-slider">
          <Slider {...settings}>
            {product.map((item) => {
              return (
                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                  <div className="slider-item">
                    <img src={`http://localhost:8000/${item.image}`} alt="" />
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className="member container pb-4">
        <div className="member_title">
          Snicker Membership
          <span className="custom_line"></span>
        </div>
        <span className="custom_line"></span>
        <div className="member_info">
          <img src={become_member} className="member_img" alt="member" />
          <div className="member_descr">
            Become a member
            <p>Sign up for free. Join the community. Never pay for shipping.</p>
          </div>
          <Link to="/register">
            <button
              type="button"
              className="btn btn-md btn-light fw-bold rounded-pill"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
      <div className="footer">
        <div class="container-fluid m-0 p-0 my-5">
          <footer class="text-center bg-black text-lg-start text-white">
            <div class="container p-4 pb-0">
              <section class="">
                <div class="row">
                  <div class="col-lg-5 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">About us</h5>

                    <p>
                      Was founded in 1964 as Blue Ribbon Sports by Bill
                      Bowerman, a track-and-field coach at the University of
                      Oregon, and his former student Phil Knight. We opened
                      their first retail outlet in 1966 and launched the Nike
                      brand shoe in 1972. The company was renamed Nike, Inc., in
                      1978 and went public two years later.
                    </p>
                  </div>

                  <div class="col-lg-3 col-md-6 mb-4 mb-md-0 ms-5">
                    <h5 class="text-uppercase">GET HELP</h5>

                    <ul class="list-unstyled mb-0">
                      <li>
                        <a href="#!" class="text-white">
                          Order Status
                        </a>
                      </li>
                      <li>
                        <a href="#!" class="text-white">
                          Shipping and Delivery
                        </a>
                      </li>
                      <li>
                        <a href="#!" class="text-white">
                          Returns
                        </a>
                      </li>
                      <li>
                        <a href="#!" class="text-white">
                          Payment Options
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">GIFT CARDS</h5>

                    <ul class="list-unstyled mb-0">
                      <li>
                        <a href="#!" class="text-white fs-6">
                          Promotions
                        </a>
                      </li>
                      <li>
                        <a href="#!" class="text-white">
                          Find a store
                        </a>
                      </li>
                      <li>
                        <a href="#!" class="text-white">
                          Sign up for email
                        </a>
                      </li>
                      <li>
                        <a href="#!" class="text-white">
                          Become a member
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <hr class="mb-4" />

              <section class="mb-4 text-center">
                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <BsFacebook />
                </a>

                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <BsInstagram />
                </a>

                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <BsGoogle />
                </a>

                <a
                  class="btn btn-outline-light btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <BsTwitter />
                </a>
              </section>
            </div>

            <div class="text-center bg-black p-3">
              © 2020 Copyright:
              <a class="text-white ms-1" href="https://mdbootstrap.com/">
                Nike.corp
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
export default Home;
