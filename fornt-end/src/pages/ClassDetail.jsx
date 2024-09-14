import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ClassDetail() {
  const { classId } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClassDetail = async () => {
      const { data } = await axios.get(`/api/class/${classId}`, {
        headers: { Authorization: token },
      });
      setClassDetail(data);
    };

    fetchClassDetail();
  }, [classId, token]);

  return (
    <div>
      {classDetail ? (
        <div>
          <h2>{classDetail.title}</h2>
          <h3>Units:</h3>
          <ul>
            {classDetail.units.map((unit) => (
              <li key={unit._id}>
                <h4>{unit.title}</h4>
                <ul>
                  {unit.sessions.map((session) => (
                    <li key={session._id}>{session.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ClassDetail;
