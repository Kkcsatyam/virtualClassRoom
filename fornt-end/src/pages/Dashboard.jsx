import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
function Dashboard() {
  const [classes, setClasses] = useState([]);
  const token = localStorage.getItem('token');

  // Ensure token is valid before decoding
  // const user = token ? jwtDecode(token) : null;
  // const user=token ? jwt.verify(token, 'yourSecretKey') : "";

  useEffect(() => {
    const fetchClasses = async () => {
      if (token) {
        const { data } = await axios.get('/api/classes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data);
        setClasses(data);
      }
    };

    fetchClasses();
  }, [token]);

  return (
    <div>
      {/* <h2>Welcome, {user ? user.name : 'User'}</h2> */}
      <h3>Your Classes</h3>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            <Link to={`/class/${classItem._id}`}>{classItem.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
