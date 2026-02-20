"use client";

import { useEffect, useState } from "react";

export default function PendingNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/faculty/pending-notes");

      if (!res.ok) {
        console.error("Failed to fetch notes");
        return;
      }

      const data = await res.json();
      setNotes(data.notes || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleReview = async (noteId, status) => {
    try {
      const res = await fetch("/api/faculty/review-note", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId, status }),
      });

      const data = await res.json();
      alert(data.message);

      fetchNotes(); // refresh list
    } catch (error) {
      console.error("Review error:", error);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Pending Student Notes
      </h1>

      {notes.length === 0 ? (
        <p>No pending notes found.</p>
      ) : (
        <div className="space-y-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="border rounded-lg p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {note.title}
              </h2>

              <p className="text-sm text-gray-600">
                Uploaded by: {note.uploadedBy?.name}
              </p>

              <p className="text-sm text-gray-600">
                Class: {note.class?.name}
              </p>

              <p className="text-sm text-gray-600">
                Subject: {note.subject}
              </p>

              <p className="text-sm text-gray-600">
                Semester: {note.semester}
              </p>

              <p className="text-sm text-gray-600">
                Unit: {note.unit}
              </p>

              <a
                href={note.fileUrl}
                target="_blank"
                className="text-blue-600 underline text-sm block mt-2"
              >
                View File
              </a>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() =>
                    handleReview(note._id, "approved")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleReview(note._id, "rejected")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}