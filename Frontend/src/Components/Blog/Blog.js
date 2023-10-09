import React from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import ellips1 from '../../images/Ellipse 1.png';



const Blog = () => {
    return (
        <>
            <div className="ourBlog">
                <div>
                    <h4>Our Blog</h4>
                    <h1>From Our Blog News</h1>
                    <div className="ourBlogDetails">
                        <Card style={{ width: '21rem', border: "none", boxShadow: "5px 5px 10px lightGray" }}>
                            <Card.Body>
                                <p style={{ fontSize: "20px", fontWeight: "600", marginBottom: "-5px" }}>Muhid Hossain</p>
                                <p>21 July 2020</p>
                                <p style={{ fontSize: "20px", fontWeight: "700", marginTop: "30px" }}>Check at least a doctor in a <br />year for your teeth.</p>
                                <FontAwesomeIcon style={{ fontSize: "30px", marginTop: "50px" }} icon={faLongArrowAltRight} />
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '21rem', border: "none", boxShadow: "5px 5px 10px lightGray" }}>
                            <Card.Header style={{ border: "none", display: "flex" }}>
                                <img src={ellips1} alt="" />
                                <div className="doctorinfo">
                                    <p>Dr. Robiul Islam</p>
                                    <p>15 July 2020</p>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p style={{ fontSize: "20px", fontWeight: "700" }}>2 times of brush in a day can <br />keep you healthy</p>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sint consequuntur non beatae alias dolorem!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '21rem', border: "none", boxShadow: "5px 5px 10px lightGray" }}>
                            <Card.Header style={{ border: "none", display: "flex" }}>
                                <img src={ellips1} alt="" />
                                <div className="doctorinfo">
                                    <p>Dr. MK Roman</p>
                                    <p>13 July 2020</p>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p style={{ fontSize: "20px", fontWeight: "700" }}>The tooth cancere is taking a <br />Challenge</p>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sint consequuntur non beatae alias dolorem!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Blog;
