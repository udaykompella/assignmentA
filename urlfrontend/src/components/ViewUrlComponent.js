import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewUrlComponent = () => {
  const [urls, setUrls] = useState([]);
  const fetchUrlAndSetUrl = async () => {
    // debugger;
    const response = await axios.get("http://localhost:4000/all");
    // const response = result.json();
    const result = response.data.data;
    setUrls(result);
    console.log(urls);
  };
  useEffect(() => {
    try {
      //   debugger;

      fetchUrlAndSetUrl();
    } catch (error) {}
  }, [urls]);

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Original Url</th>
            <th>Short Url</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>
              <td>{url.origUrl}</td>
              <td>
                <a href={`${url.shortUrl}`} target="_blank">
                  {url.shortUrl}
                </a>
              </td>
              <td>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUrlComponent;
