import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadMessages, setUploadMessages] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/api/assignments")
      .then(res => setAssignments(res.data))
      .catch(console.error);
  }, []);

  const handleFileChange = (assignmentId, e) => {
    setSelectedFiles(prev => ({ ...prev, [assignmentId]: e.target.files[0] }));
    setUploadMessages(prev => ({ ...prev, [assignmentId]: "" }));
  };

  const uploadFile = (assignmentId) => {
    const file = selectedFiles[assignmentId];
    if (!file) {
      setUploadMessages(prev => ({ ...prev, [assignmentId]: "Please select a file first." }));
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignmentId', assignmentId);

    axios.post("http://localhost:3001/api/assignments/upload", formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      setUploadMessages(prev => ({ ...prev, [assignmentId]: "Upload successful!" }));
    }).catch(() => {
      setUploadMessages(prev => ({ ...prev, [assignmentId]: "Upload failed." }));
    });
  };

  const removeFile = (assignmentId) => {
    axios.delete(`http://localhost:3001/api/assignments/upload/${assignmentId}`)
      .then(() => {
        setUploadMessages(prev => ({ ...prev, [assignmentId]: "Upload removed." }));
      }).catch(() => {
        setUploadMessages(prev => ({ ...prev, [assignmentId]: "Remove failed." }));
      });
  };

  return (
    <div>
      <style>{`
        .assignments-container {
          max-width: 900px;
          margin: auto;
          padding: 1rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .assignments-container h1 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #0077b6;
        }
        .assignment-card {
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          background: #fdfdfd;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .assignment-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 22px rgba(0,0,0,0.15);
        }
        .assignment-card h3 {
          margin-top: 0;
          color: #0077b6;
        }
        .assignment-card p {
          margin: 6px 0;
          color: #333;
        }
        .assignment-card input[type="file"] {
          margin-top: 8px;
        }
        .assignment-card button {
          margin-top: 8px;
          padding: 8px 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s ease;
        }
        .upload-btn {
          background-color: #0077b6;
          color: #fff;
        }
        .upload-btn:hover {
          background-color: #005f8e;
        }
        .remove-btn {
          background-color: #e63946;
          color: #fff;
          margin-left: 8px;
        }
        .remove-btn:hover {
          background-color: #b8333f;
        }
        .upload-message {
          margin-top: 6px;
          font-size: 0.9rem;
          color: #333;
        }
      `}</style>

      <div className="assignments-container">
        <h1>Assignments</h1>
        {assignments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No assignments available.</p>
        ) : (
          assignments.map(a => (
            <div key={a.id} className="assignment-card">
              <h3>{a.title}</h3>
              <p><strong>Exam Date:</strong> {a.examDate}</p>
              <p><strong>Details:</strong> {a.details}</p>
              <p><strong>Course:</strong> {a.course.title}</p>

              <input type="file" onChange={(e) => handleFileChange(a.id, e)} />
              <div>
                <button className="upload-btn" onClick={() => uploadFile(a.id)}>Upload</button>
                <button className="remove-btn" onClick={() => removeFile(a.id)}>Remove Upload</button>
              </div>

              {uploadMessages[a.id] && <p className="upload-message">{uploadMessages[a.id]}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
