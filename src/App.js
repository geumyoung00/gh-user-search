import { useEffect, useState } from "react";
import "./App.css";

// 아래 query 안에 사용자가 input 내에 타이핑 한 깃헙 아이디가 들어가면 돼요:
// const API_URL = `https://api.github.com/search/users?q=${query}`;

export default function App() {
  const [word, setWord] = useState("");
  const [searcedhUsers, setSearedUsers] = useState([]);

  function onSearchChange(e) {
    setWord(e.target.value);
  }

  async function onSearchSubmit(event) {
    event.preventDefault();
    console.log(word);
    getUsers(word);
  }

  const getUsers = async (word) => {
    const res = await fetch(`https://api.github.com/search/users?q=${word}`);
    console.log("res__", res);
    const json = await res.json();
    console.log("json__", json);
    setSearedUsers(json.items);
    console.log("users__", searcedhUsers);
  };

  useEffect(() => {
    // getUsers();
  }, []);

  return (
    <div className="app">
      <main className="main">
        <h2>Project 6: GitHub User Search</h2>
        <Form
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          value={word}
        />
        <h3>Results</h3>
        <div id="results">
          <div>
            {searcedhUsers.map((user) => (
              <User
                key={user.login}
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function User({ avatar, url, username }) {
  return (
    <div className="user">
      <img src={avatar} alt="Profile" width="50" height="50" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
}

function Form({ onSubmit, onChange, value }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        id="search"
        type="text"
        placeholder="Enter username or email"
        onChange={onChange}
        defaultValue={value}
      />
      <button type="submit">Search</button>
    </form>
  );
}
