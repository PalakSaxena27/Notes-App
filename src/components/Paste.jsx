import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToPastes } from '../redux/pasteslice';
import { useNavigate } from 'react-router-dom';

const Paste = () => { 
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter pastes by title
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Edit paste
  const handleEdit = (id) => {
    navigate(`/?pasteId=${id}`);
  };

  // ✅ Delete paste
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this paste?')) {
      dispatch(removeToPastes(id));
    }
  };

  // ✅ View paste
  const handleView = (id) => {
    navigate(`/pastes/${id}`);
  };

  // ✅ Copy paste content
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  // ✅ Share paste (copy link)
  const handleShare = (id) => {
    const url = `${window.location.origin}/pastes/${id}`;
    navigator.clipboard.writeText(url);
    alert('Share link copied!');
  };

  return (
    <div className="paste-container">
      <input
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border paste-card" key={paste._id}>
                <div>
                  <strong>{paste.title}</strong>
                </div>

                <div>{paste.content}</div>

                <div className="flex flex-row gap-4 place-content-evenly">
                  <button onClick={() => handleEdit(paste._id)}>Edit</button>
                  <button onClick={() => handleDelete(paste._id)}>Delete</button>
                  <button onClick={() => handleView(paste._id)}>View</button>
                  <button onClick={() => handleCopy(paste.content)}>Copy</button>
                  <button onClick={() => handleShare(paste._id)}>Share</button>
                </div>

                <div>{new Date(paste.createdAt).toLocaleString()}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
