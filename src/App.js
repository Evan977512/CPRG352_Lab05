import axios from "axios";
import { useEffect, useState } from "react";
import table from "./table.css";

function App() {
  const [data, setData] = useState([]);

  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        console.log("Getting from: ", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // postData
  const postData = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/photos", {
        userId: userId,
        title: title,
      })
      .then((res) => console.log("posting data", res))
      .catch((err) => console.log(err));
  };

  // DeleteRow function
  const deleteRow = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((res) => {
        console.log("Deleted: ", res.data);
        setData(data.filter((item) => item.id !== id));
      })

      .catch((err) => console.log("why not working....?", err));
  };

  const arr = data.map((data, index) => {
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.title}</td>
        <td>
          <img src={data.thumbnailUrl} alt="image....?" />
        </td>
        <td>
          <button onClick={() => deleteRow(data.id)}>Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="App">
      <h3>post</h3>
      <form>
        <input type="text" name="userId" placeholder="UserID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <hr />
        <input type="text" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <hr />
        <button onClick={postData}>Submit</button>
      </form>

      <h3>List of album</h3>

      <table>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Thumbnail</th>
          <th>Delete</th>
        </tr>

        {arr}
      </table>
    </div>
  );
}

export default App;
