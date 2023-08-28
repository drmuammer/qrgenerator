import React, { useRef, useState } from 'react';
import QrCode from 'qrcode.react';
import ReactToPrint from 'react-to-print';

const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const qrCodeRef = useRef(null);

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <QrCode value={text} ref={qrCodeRef} />
      <ReactToPrint
        trigger={() => <button>Print QR Code</button>}
        content={() => qrCodeRef.current}
      />
    </div>
  );
};

export default QrCodeGenerator;
