import React from "react";
import { useState } from "react";
import "./Github.css";
import apiClient from "../../http/http-common";
import Modal from "./GithubModal/GithubUpdateModal";

const Github = () => {
  const [username, setUsername] = useState("");
  const [githubData, setGithubdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const handleSearch = async (e) => {
    try {
      await apiClient
        .get(`/Github/get-user-repositories?username=${username}`)
        .then((res) => {
          console.log(res.data);
          setGithubdata(res.data);
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  function DataListTable(props) {
    return (
      <table className="github__tabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Html url</th>
            <th>Clone url</th>
            <th>SSH url</th>
            <th>Visibility</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.dataList.map((data, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.html_url}</td>
              <td>{data.clone_url}</td>
              <td>{data.ssh_url}</td>
              <td>{data.visibility}</td>
              <td>
                <button
                  className="github__edit__button"
                  onClick={() => {
                    setIsModalOpen(true);
                    setModalData(data);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="github__page">
      <div className="search__section">
        <input
          className="search__username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <button className="search__button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="github__content">
        <DataListTable dataList={githubData} />
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalData={modalData}
          username={username}
        />
      </div>
    </div>
  );
};

export default Github;
