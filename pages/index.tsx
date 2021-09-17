import { useState } from "react";

export default function Index() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    fetch(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL, {
      method: "post",
      body: data
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data", data);
        setUrl(data.url);
      });
  };
  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
      <button onClick={uploadImage}>Upload</button>
      <br />
      <img src={url} />
    </div>
  );
}
