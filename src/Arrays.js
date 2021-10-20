import React, { useState, useRef, useEffect, useMemo } from "react";
import CreateUser from "./CreateUser";

const User = React.memo(function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log("user", "user componet");
    return () => {
      console.log("user", "user comp disappear");
    };
  }, [user]);

  return (
    <div>
      <b
        style={{ cursor: "pointer", color: user.active ? "green" : "black" }}
        onClick={(e) => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={(e) => onRemove(user.id)}>삭제</button>
    </div>
  );
});

const UserList = React.memo(function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
});

const UserMap = ({ userMap }) => {
  return (
    <div>
      <b>{userMap.username}</b>
      <span>({userMap.email})</span>
    </div>
  );
};

const countActiveUsers = (users) => {
  console.log("counting users");
  return users.filter((user) => user.active).length;
};

const Arrays = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);

  const [inputs, setInputs] = useState({ username: "", email: "" });
  const { username, email } = inputs;
  const onchange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };

    //setUsers([...users, user]);
    setUsers(users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    console.log("remove", id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const handleCheck = (e) => {
    console.log("users", `data ${users}`);
  };

  useEffect(() => {
    console.log("app", "appear");
    return () => {
      console.log("app", "disappear");
    };
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div>
      <div>
        <b>{users[0].username}</b> <span>({users[0].email})</span>
      </div>
      <div>
        <b>{users[1].username}</b> <span>({users[1].email})</span>
      </div>
      <div>
        <b>{users[2].username}</b> <span>({users[1].email})</span>
      </div>
      <div>
        <br />
        ======================================================
        <br />
      </div>
      <div>
        <User user={users[0]} />
        <User user={users[1]} />
        <User user={users[2]} />
      </div>
      <div>
        <br />
        ======================================================
        <br />
      </div>
      <CreateUser
        username={username}
        email={email}
        onCreate={onCreate}
        onChange={onchange}
      />

      {/* {users.map((user) => (
        <UserMap userMap={user} />
      ))} */}

      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>active user : {count} </div>
      <button onClick={(e) => handleCheck(e)}>Check</button>
    </div>
  );
};

export default Arrays;
