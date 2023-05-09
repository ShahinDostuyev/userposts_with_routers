import {
  Col,
  Row,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Layout } from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdEditSquare } from "react-icons/md";

export const UserPosts = () => {
  const defaultEditObj = {
    body: "",
    title: "",
  };
  const { id } = useParams();
  const [posts, setposts] = useState([]);
  const [modal, setModal] = useState(false);
  const [editObj, seteditObj] = useState(defaultEditObj);

  
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then((res) => {
        setposts(res.data);
      })
      .catch((err) => {
        console.log("Error occured: " + err.toString());
      });
  }, [id]);

  const deletePost = (postId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error occured: " + err.toString());
      });
  };
  const toggle = (obj=defaultEditObj) =>{
    seteditObj(obj)
    setModal(!modal);

  } 
  function editInputs(value, type) {
    seteditObj((oldData) => ({ ...oldData, [type]: value }));
    console.log(editObj);
  }
  function editRow(item) {
    seteditObj({ body: item.body, title: item.title });
  }
  function editPost() {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", editObj)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    seteditObj(defaultEditObj);
  }
  return (
    <Layout>
      <Row>
        <Col ms={12}>
          <p>This is post page {id}</p>
          <Button
            style={{ marginLeft: "90%", backgroundColor: "green" }}
            onClick={toggle}
          >
            Add a new post
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Enter information</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="Body">Body</Label>
                  <Input
                    type="text"
                    id="Body"
                    name="Body"
                    value={editObj.body}
                    onChange={(e) => editInputs(e.target.value.trim(), "body")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Title">Title</Label>
                  <Input
                    type="text"
                    id="Title"
                    name="Title"
                    value={editObj.title}
                    onChange={(e) => editInputs(e.target.value.trim(), "title")}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={editPost} color="primary">
                Save
              </Button>
            </ModalFooter>
          </Modal>
          <Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Body</th>
                <th>Update</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.body}</td>
                      <td>
                        <button
                          style={{ backgroundColor: "red" }}
                          className="btn btn-primary"
                          onClick={() => deletePost(item.id)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </td>
                      <td>
                        <button
                          style={{ backgroundColor: "gray" }}
                          className="btn btn-primary"
                          onClick={() =>toggle(item)}
                        >
                          <MdEditSquare />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Layout>
  );
};
