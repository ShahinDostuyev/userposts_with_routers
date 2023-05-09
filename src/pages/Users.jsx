import { Col, Row , Spinner, Table} from "reactstrap";
import { Layout } from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserData } from "../components/UserData";

export const Users = () => {
  let initialState = {
    data: undefined,
    error: undefined,
    loading: false,
  };

  const [datas, setDatas] = useState(initialState);
  useEffect(() => {
    setDatas((oldData) => ({
      ...oldData,
      loading: true,
      error: undefined,
      data: undefined,
    }));

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => {
        setDatas((oldData) => ({
          ...oldData,
          data: data,
          loading: false,
          error: undefined,
        }));
      })
      .catch((err) => {
        setDatas({ data: undefined, loading: false, error: err.toString() });
      });
  }, []);
  return (
    <Layout>
      <Row>
        <Col>
        <div>
      {datas.error && <h5 color="red">Error occured ....</h5>}
      {datas.loading && <Spinner />}
      {datas.data && (
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>companyName</th>
              <th>Posts</th>
            </tr>
          </thead>
          <tbody>
            {datas.data &&
            <UserData data = {datas.data}/>
              }
          </tbody>
        </Table>
      )}
    </div>
        </Col>
      </Row>
    </Layout>
  );
};
