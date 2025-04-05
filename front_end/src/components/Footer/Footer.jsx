import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
        <h3>🔗 Liên Kết Hữu Ích</h3>
        <div className='footer-social'>
            <div className="social">
                <a href="https://www.facebook.com/">🌍 Facebook</a>
            </div>
            <div className="social">
                <a href="">💬 Hỗ trợ</a>
            </div>
            <div className="social">
                <a href="">✉️ Góp ý</a>
            </div>
        </div>
    </div>
  )
}

export default Footer