import React, { useState } from "react";
import axios from "axios";

const AddUrlComponent = () => {
  const [url, setUrl] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    debugger;
    if (!url) {
      alert("please enter something");
      return;
    } else {
      try {
        let response = await axios.post("http://localhost:4000/short", {
          origUrl: url,
        });
        console.log(response, "shortresponse");
      } catch (error) {
        console.log(error, "error");
      }
      // axios
      //   .post("http://localhost:4000/short", { origUrl: url })
      //   .then((res) => {
      //     debugger;
      //     console.log(res.data, "shortresponse");
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
    }

    setUrl("");
  };
  console.log(url);

  return (
    <div>
      <main>
        <section className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="mb-2 fs-1">URL Shortener</h1>
          <form className="w-50" onSubmit={onSubmit}>
            <input
              className="w-100 border border-primary p-2 mb-2 fs-3 h-25"
              type="text"
              placeholder="http://samplesite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div class="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-danger m-5">
                Shorten!
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddUrlComponent;
