import React, { useRef, useState, useEffect } from 'react';
import QrCode from 'qrcode.react';
import ReactToPrint from 'react-to-print';
import 'bootstrap/dist/css/bootstrap.min.css';

const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const qrCodeRef = useRef(null);

  useEffect(() => {
    // Get current date and time
    const currentDate = new Date();
    setDateTime(currentDate.toLocaleString());

    // Get current GPS coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    }
  }, []);

  const qrText = `${text}\nDate & Time: ${dateTime}\nLocation: ${location}`;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h1>QR Code Generator</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <p>Date & Time: {dateTime}</p>
            <p>Location: {location}</p>
            <ReactToPrint
              trigger={() => <button className="btn btn-primary">Print QR Code</button>}
              content={() => qrCodeRef.current}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <QrCode value={qrText} ref={qrCodeRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <QrCodeGenerator />
    </div>
  );
};

export default App;
