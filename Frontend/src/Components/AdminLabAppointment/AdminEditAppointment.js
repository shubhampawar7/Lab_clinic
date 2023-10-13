import React, { useState, useNavigate } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';




function AdminEditAppointment() {


    // const [update, setUpdate] = useState(users);



    function handleInput(e) {
        // e.preventDefault();

        // const newlist = users.map(list => (

        //     list.id === user.id ? ({ ...list, [e.target.name]: e.target.value }) : (list)

        // ))
        // console.log("newlist",newlist)

        // setUpdate(newlist)
    }


    function handlesave(e) {
        // e.preventDefault();

        // swal({
        //     title: "Update Succesfully",
        //     text: ``,
        //     icon: "success",
        //     dangerMode: true,
        // })
        // setData(update)

    }



    return (
        <>

            {/* try start*/}
            {/* <tr scope="row">
                <th scope="row">1</th>
                <td><a   target="_blank"><img  style={{width:"70px",height:"80px"}}/></a></td>
                <td>dd</td>
                <td>ss</td>
                <td>sss</td>
                <td>aa</td>
                <td>
                    <button class="btn  btn-outline-primary " variant="primary" >Edit <i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-outline-danger" >Delete<i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr> */}

            {/* Edit Modal Start */}

            <Modal show={false} >
                <Modal.Header closeButton style={{ backgroundColor: "#5cb85c", display: "flex" }} >
                    <Modal.Title style={{ display: "flex", justifyContent: "center" }}>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form
                        onSubmit={handlesave}
                    >


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required="required"
                                type="text"
                                name="name"
                                // defaultValue={user.name}
                                onChange={handleInput}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="author"
                                // defaultValue={user.author}
                                onChange={handleInput}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pages</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="pages"
                                // defaultValue={user.pages}
                                onChange={handleInput}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="Category"
                                // defaultValue={user.Category}
                                onChange={handleInput}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Book Image</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="image"
                                // defaultValue={user.image}
                                onChange={handleInput}
                            />
                        </Form.Group>


                        

                        <Form.Group class="d-flex justify-content-center">
                            <Button  class="btn btn-success gap-2" variant="secondary" >
                                Cancel
                            </Button>
                            <Button type="submit" variant="success"   
                            >
                                Save
                            </Button>
                        </Form.Group>


                    </Form>
                </Modal.Body>
            </Modal>


            {/* Edit Modal end */}



        </>
    )
}



export default AdminEditAppointment;