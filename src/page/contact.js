import React, { Suspense, useState } from 'react';
import 'antd/dist/antd.css';
import Row from 'antd/es/row'
import Col from 'antd/es/col'

const ContactForm = React.lazy(
    () => import('./contactForm')
);

const Contact = () => {
    const [showContact, SetshowContact] = useState(true);
    const [showMsg, SetshowMsg] = useState(false);

    const handleSubmit = () => {
        SetshowMsg(true)
        SetshowContact(false)

        setTimeout(() => {
            window.location.reload();
        }, 3000)
    }

    return (
        <div>
            {showMsg && <div className="response-pg">
                <h1>All good!</h1>
                <h2>Thank you for your interest. We will contact you in 1-2 working days.</h2>
            </div>}
            {showContact && <div>
                <Row>
                    <Col xs={24} className="top-heading" span={24}>
                        <h1>Contact Us</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <Row>
                            <Col xs={24} xl={10} span={10}>
                                <div className="con-info">
                                    <h2>Media enquiries:</h2>
                                    <a href="mailto:press@modularbank.co">press@modularbank.co</a>
                                </div>
                                <div className="con-info">
                                    <h2>Career questions:</h2>
                                    <a href="mailto:careers@modularbank.co">careers@modularbank.co</a>

                                </div>
                                <div className="con-info">
                                    <p>Our offices:<br />
                                        Tallinn, Estonia<br />
                                        Vabaduse Workland<br />
                                        Pärnu mnt 12, 10146<br />
                                    </p>
                                </div>

                                <div className="con-info">
                                    <p>Berlin, Germany<br />
                                        Bikini Berlin, Scaling Spaces, 2.OG<br />
                                        Budapester Str. 46<br />
                                        10787 Berlin<br />
                                    </p>
                                </div>
                            </Col>
                            <Col xs={24} xl={14} span={14}>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ContactForm callSubmit={() => handleSubmit()} />
                                </Suspense>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>}
        </div>
    )
}
export default Contact;