import React, { useState } from 'react';
import { db } from './firebase';
import Papa from 'papaparse'; // Import papaparse
// src/index.css
import 'tailwindcss/tailwind.css';

function UserDashboard() {
  const [data, setData] = useState([]);
  const [importing, setImporting] = useState(false);

  const handleImport = async (csvData) => {
    setImporting(true);
    
    // Assuming your CSV has headers and each row is an object
    csvData.forEach(async (row) => {
      try {
        // Store data in Firebase
        await db.collection('users').add(row);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    });
    setData(csvData);
    setImporting(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (result.data) {
            handleImport(result.data);
          }
        },
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">User Dashboard</h2>
      <button
        onClick={() => document.getElementById('csv-input').click()}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        disabled={importing}
      >
        Import Data
      </button>
      <input
        type="file"
        id="csv-input"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      {importing && <p className="mt-4">Importing data...</p>}
      <table className="table-auto mt-4">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th className="px-4 py-2" key={key}>
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td className="border px-4 py-2" key={index}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
