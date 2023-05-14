import React, { useState } from "react";
import "./GithubUpdateModal.css";
import axiosHTTP from "../../../http/http-common";

const GithubUpdateModal = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
  username,
}) => {
  const [name, setName] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [visibility, setVisibility] = useState(undefined);

  const visibilityOptions = ["public", "private"];

  async function handleUpdate(params) {
    let updateRequest = {
      id: modalData.id,
      name: name !== undefined ? name : modalData.name,
      description:
        description !== undefined
          ? description
          : modalData.description !== null
          ? modalData.description
          : "",
      html_url: modalData.html_url,
      clone_url: modalData.clone_url,
      ssh_url: modalData.clone_url,
      visibility: visibility !== undefined ? visibility : modalData.visibility,
    };

    console.log(updateRequest);

    const response = await axiosHTTP
      .put(
        `/Github/update-user-repository?username=${username}`,
        JSON.stringify(updateRequest)
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setIsModalOpen(false);
  }
  function closeModal(params) {
    setIsModalOpen(false);
  }

  return (
    <div
      className="github__modal_parent"
      style={{ display: isModalOpen ? "flex" : "none" }}
    >
      <div className="github__modal">
        <h2 className="github__modalTitle">Update record</h2>

        <div className="github__modalData">
          <label>Id</label>
          <input
            type="text"
            className="github__modalInput"
            disabled={true}
            value={modalData.id}
          ></input>
          <label>Name</label>
          <input
            type="text"
            className="github__modalInput"
            defaultValue={modalData.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <label>Description</label>
          <input
            type="text"
            className="github__modalInput"
            defaultValue={modalData.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>
          <label>Html url</label>
          <input
            type="text"
            className="github__modalInput"
            disabled={true}
            value={modalData.html_url}
          ></input>
          <label>Clone url</label>
          <input
            type="text"
            className="github__modalInput"
            disabled={true}
            value={modalData.clone_url}
          ></input>
          <label>SSH url</label>
          <input
            type="text"
            className="github__modalInput"
            disabled={true}
            value={modalData.ssh_url}
          ></input>
          <label>Visibility</label>
          <select
            className="github__modalSelect"
            placeholder={modalData.visibility}
            onChange={(e) => {
              setVisibility(e.target.value);
            }}
          >
            {/* <option>{modalData.visibility}</option> */}
            {visibilityOptions.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>

        <div className="github__modalButtons">
          <button className="github__modalCloseBtn" onClick={closeModal}>
            Close
          </button>
          <button className="github__modalContinueBtn" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GithubUpdateModal;
