import axios from "axios";
import { useEffect, useState } from "react";
import table from "./table.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        console.log("Getting from: ", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // DeleteRow function
  const deleteRow = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((res) => {
        console.log("Deleted: ", res.data);
        setData(data.filter((item) => item.id !== id));
      })

      .catch((err) => console.log(err));
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
