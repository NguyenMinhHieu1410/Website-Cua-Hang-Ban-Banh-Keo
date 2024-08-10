import React from 'react';
import '../css/Footer.css'; // Đảm bảo đường dẫn đến tệp CSS là chính xác
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'; // hoặc từ @fortawesome/free-solid-svg-icons nếu bạn sử dụng biểu tượng solid


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-section">
                    <h3>BÁNH KẸO ĐỒNG KHÁNH</h3>
                    <p>
                        Bánh Kẹo Đồng Khánh - Thương hiệu bánh kẹo truyền thống Việt Nam với hơn 100 năm kinh nghiệm.
                    </p>
                    {/* Thêm biểu tượng chứng nhận (nếu có) */}
                    <div className="footer-badges">
                        {/* Ví dụ: <img src="logo_chung_nhan.png" alt="Chứng nhận" /> */}
                    </div>
                </div>
<div>
<div className="footer-section"></div>
</div>
                <div className="footer-section">
                    <h3>DỊCH VỤ</h3>
                    <ul>
                        <li>Đặt bánh kem</li>
                        <li>Đặt bánh trung thu</li>
                        <li>Đặt bánh mứt Tết</li>
                        <li>Đặt quà tặng</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>THÔNG TIN LIÊN HỆ</h3>
                    <p>
                        Địa chỉ: An Phú Đông, Q12, TP.HCM
                    </p>
                    <p>Hotline: (028) 1234 5678</p>
                    <p className="contact-info">
                        info@dongkhanh.com.vn <br />
                        (028) 1234 5678 (Fax)
                    </p>
                    {/* Thêm thông tin chi nhánh khác nếu cần */}
                </div>
                <div>
<div className="footer-section"></div>
</div>
                <div className="footer-section">
                    <h3>FANPAGE</h3>
                    {<a href="https://www.facebook.com/dongkhanhbakery" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>}
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Bánh Kẹo Đồng Khánh</p>
                    <div className="social-icons">
                        {/* Thêm các biểu tượng mạng xã hội tại đây */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
