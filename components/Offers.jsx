import React from 'react'
import Images from "../assets/images/image"

const Offers = () => {
  return (
    <section id="request_p" className='container'>
        <div className='people'>
            <img src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=446&q=80" alt="peoples" className='display'/>
            {/* Description Container */}
            <div className="d_container">   
                <div className="wrap_price">
                    <div className="name">
                        <img src={Images.DummyP} alt="user" />
                        <h1>Adegunbiade Biola</h1>
                        <div className="mid">
                            <div className="id_online"></div>
                        </div>
                    </div>
                    <p>$200</p>
                </div>

                <p>I will design your dream wedding gown within 5 Business days</p>
                <p>24 hours delivery</p>
                <div className="hero_b">
                    <button className="native-btn">Accept</button>
                    <button className="btn_only">Message</button>
                </div>
            </div>
        </div>
        <div className='people'>
            <img src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=446&q=80" alt="peoples" className='display'/>
            {/* Description Container */}
            <div className="d_container">   
                <div className="wrap_price">
                    <div className="name">
                        <img src={Images.DummyP} alt="user" />
                        <h1>Adegunbiade Biola</h1>
                        <div className="mid">
                            <div className="id_offline"></div>
                        </div>
                    </div>
                    <p>$200</p>
                </div>

                <p>I will design your dream wedding gown within 5 Business days</p>
                <p>24 hours delivery</p>
                <div className="hero_b">
                    <button className="native-btn">Accept</button>
                    <button className="btn_only">Message</button>
                </div>
            </div>
        </div>
        <div className='people'>
            <img src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=446&q=80" alt="peoples" className='display'/>
            {/* Description Container */}
            <div className="d_container">   
                <div className="wrap_price">
                    <div className="name">
                        <img src={Images.DummyP} alt="user" />
                        <h1>Adegunbiade Biola</h1>
                        <div className="mid">
                            <div className="id_online"></div>
                        </div>
                    </div>
                    <p>$200</p>
                </div>

                <p>I will design your dream wedding gown within 5 Business days</p>
                <p>24 hours delivery</p>
                <div className="hero_b">
                    <button className="native-btn">Accept</button>
                    <button className="btn_only">Message</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Offers