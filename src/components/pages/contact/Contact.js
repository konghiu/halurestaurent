import React from "react";

// css
import "./contact.css";

const Contact = () => {
     return (
          <section className="contact center py-8">
               <div className="container">
                    <div>
                         <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.8595699802027!2d106.6857625728333!3d10.822150080776742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1687530865449!5m2!1svi!2s"
                              className="w-full"
                              height="400"
                              allowFullScreen=""
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                         />
                    </div>
                    <div className="flex gap-10 mt-10">
                         <div className="contact__address w-1/3">
                              <h1>Liên hệ</h1>
                              <p>
                                   Địa chỉ: 100 Phan Văn Trị, Phường 15, Gò Vấp,
                                   TP. Hồ Chí Minh
                              </p>
                              <p>Điện thoại: 0392 534 482</p>
                              <p>Email: conghieu.dev.3104@gmail.com</p>
                         </div>
                         <div className="contact__form flex-1">
                              <h1>Gửi tin nhắn cho chúng tôi</h1>
                              <form>
                                   <input
                                        type="text"
                                        placeholder="Họ tên *"
                                        className="inline-block"
                                   />
                                   <input
                                        type="text"
                                        placeholder="Email *"
                                        className="inline-block float-right"
                                   />
                                   <input
                                        type="text"
                                        placeholder="Số điện thoại *"
                                        className="block w-full"
                                   />
                                   <textarea
                                        placeholder="Nhập nội dung *"
                                        className="w-full h-40"
                                   ></textarea>
                                   <button className="main__button">
                                        Gửi tin nhắn
                                   </button>
                              </form>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Contact;
