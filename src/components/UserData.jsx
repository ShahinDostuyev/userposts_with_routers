import { Link } from "react-router-dom";

export const UserData = ({data}) => {
  return data.map(
    ({id, name, email, company: { name: companyName } }, i) => (
      <tr key={id}>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{email}</td>
        <td>{companyName}</td>
        <td><Link to={`/userPosts/${id}`} className="btn btn-primary">See posts</Link></td>
      </tr>
    )
  );
};
