import React, { useEffect, useState } from 'react';
import axios from 'axios';

const generateRandomId = () => {
  return Math.floor(100000000 + Math.random() * 900000000);
};

const getCurrentTimeUTC7 = () => {
  const now = new Date();
  const utc7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return utc7Time.toISOString();
};

function Kone() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [liftPositionData, setLiftPositionData] = useState(null);
  const [liftDoorsData, setLiftDoorsData] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const clientId = '35030b5a-7152-41df-a84c-13e00ea3aa85';
      const clientSecret = '2ebc26b17920462930afa2a31baf5a0fff109bca02941a6889807155e98aa42e';
      const tokenUrl = 'https://dev.kone.com/api/v2/oauth2/token';

      try {
        const response = await axios.post(
          tokenUrl,
          new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'application/inventory robotcall/group:heNw9gllO2y:1',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
            },
          }
        );

        setToken(response.data.access_token);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const websocket = new WebSocket(`wss://dev.kone.com/stream-v2?accessToken=${token}`, 'koneapi');
    setWs(websocket);

    websocket.onopen = () => {
      console.log('WebSocket connected!');
      const requestId = crypto.randomUUID();
      const liftCallPayload = {
        type: 'site-monitoring',
        requestId,
        buildingId: 'building:heNw9gllO2y',
        callType: 'monitor',
        groupId: '1',
        payload: {
          sub: 'smartOfficeLiftSouthWing_user123',
          duration: 300,
          subtopics: ['lift_1/position', 'lift_1/doors'],
        },
      };
      websocket.send(JSON.stringify(liftCallPayload));
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);

        if (data.subtopic === 'lift_1/position') {
          setLiftPositionData(data.data);
        } else if (data.subtopic === 'lift_1/doors') {
          setLiftDoorsData(data.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('WebSocket connection error');
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected.');
    };

    return () => {
      websocket.close();
    };
  }, [token]);

  const callLift = () => {
    if (!ws) return;
    const message = {
      type: 'lift-call-api-v2',
      buildingId: 'building:heNw9gllO2y',
      callType: 'action',
      groupId: '1',
      payload: {
        request_id: generateRandomId(),
        area: 1001010,
        time: getCurrentTimeUTC7(),
        terminal: 10011,
        call: {
          action: 5000,
          destination: 2000,
        },
      },
    };
    ws.send(JSON.stringify(message));
  };

  const holdDoors = () => {
    if (!ws) return;
    const message = {
      type: 'lift-call-api-v2',
      buildingId: 'building:heNw9gllO2y',
      callType: 'hold_open',
      groupId: '1',
      payload: {
        request_id: generateRandomId(),
        time: getCurrentTimeUTC7(),
        lift_deck: 1001010,
        served_area: 2000,
        hard_time: 5,
      },
    };
    ws.send(JSON.stringify(message));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Kone API Token</h2>
      {error ? (
        <p className="text-red-500 font-semibold text-center">Error: {JSON.stringify(error)}</p>
      ) : (
        <p className="text-center text-gray-700">Access Token: {token}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Lift Position Data */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Lift Position</h3>
          {liftPositionData ? (
            <ul className="text-gray-700">
              <li><strong>Floor:</strong> {liftPositionData.cur}</li>
              <li><strong>Direction:</strong> {liftPositionData.dir}</li>
              <li><strong>Moving State:</strong> {liftPositionData.moving_state}</li>
              <li><strong>Drive Mode:</strong> {liftPositionData.drive_mode}</li>
              <li><strong>Serving Mode:</strong> {liftPositionData.serving_mode}</li>
              <li><strong>Door Open:</strong> {liftPositionData.door ? 'Yes' : 'No'}</li>
            </ul>
          ) : (
            <p className="text-gray-500">Waiting for lift data...</p>
          )}
        </div>

        {/* Lift Doors Data */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Lift Doors Status</h3>
          {liftDoorsData ? (
            <ul className="text-gray-700">
              <li><strong>Time:</strong> {liftDoorsData.time}</li>
              <li><strong>Area:</strong> {liftDoorsData.area}</li>
              <li><strong>Lift Side:</strong> {liftDoorsData.lift_side}</li>
              <li><strong>State:</strong> {liftDoorsData.state}</li>
              <li><strong>Landing:</strong> {liftDoorsData.landing}</li>
            </ul>
          ) : (
            <p className="text-gray-500">Waiting for lift doors data...</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={callLift} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Call Lift
        </button>
        <button onClick={holdDoors} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Hold Doors
        </button>
      </div>
    </div>
  );
}

export default Kone;
