import React, { useState, useContext } from "react";
import { Web3Storage } from "web3.storage";
import AddItemForm from "../components/AddItemForm";
import { web3Context } from "../context/web3Context";

export default function AddItem() {
  const { createItem } = useContext(web3Context);
  const [isCreating, setIsCreating] = useState(false);
  const [upload, setUpload] = useState({
    isUploading: false,
    isUploaded: false,
  });

  const onCreateItem = async (formValues) => {
    console.log("formValues", formValues);
    setIsCreating(true);
    setUpload({ isUploading: true, isUploaded: false });

    try {
      const client = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUxYTE2YTBFRkViQWIyRDlCQmNFNEMxRDk0NGRCMzM3Mjk3NTk0ZDciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNjA1NzUzMzUsIm5hbWUiOiJzYXZlLWl0ZW0ifQ.yNamXuYFB_bB9Ao4nCDKhZCKE7YDqp7w7ZNHMvT_0Fk",
      });
      console.log("client", client);

      const fileName = formValues.picture.name;
      const fileType = formValues.picture.type;

      const newFile = new File([formValues.picture], fileName, {
        type: fileType,
      });

      const cid = await client.put([newFile], {
        name: formValues.picture.name,
      });
      const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
      formValues.imageUri = imageURI;

      setUpload({ isUploading: false, isUploaded: true });

      console.log("formValues", formValues);

      const result = await createItem(formValues);
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <div>
      <AddItemForm
        isCreating={isCreating}
        upload={upload}
        onCreateItem={onCreateItem}
      />
    </div>
  );
}
