import React, { useState } from 'react';
import '../css/Contact.css'; // Đảm bảo đường dẫn đến tệp CSS là chính xác
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/contact', formData);
            alert('Gửi thông tin thành công');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending contact form:', error);
            alert('Gửi thông tin thành công!');
        }
    };

    return (
        <div className="contact-content">
            <h2>Liên Hệ</h2>
            <p>
                Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi bằng cách điền vào biểu mẫu dưới đây. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
                <label>
                    Tên của bạn:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Tin nhắn:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </label>
                <button type="submit">Gửi</button>
            </form>
        </div>
    );
};

export default Contact;
