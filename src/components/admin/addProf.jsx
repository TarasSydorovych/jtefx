import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { db } from "../../function/firebase";

const AddProfession = () => {
  const [name, setName] = useState("");
  const [currentProfession, setCurrentProfession] = useState("");
  const [fullProfessions, setFullProfessions] = useState([]);

  const handleCurrentProfessionChange = (value) => {
    setCurrentProfession(value);
  };

  const handleAddProfession = () => {
    if (currentProfession.trim() !== "") {
      setFullProfessions([...fullProfessions, currentProfession.trim()]);
      setCurrentProfession("");
    }
  };

  const handleSave = async () => {
    if (name.trim() !== "" && fullProfessions.length > 0) {
      try {
        const docRef = await addDoc(collection(db, "professions"), {
          name: {
            nameProf: name.trim(),
            fullProf: fullProfessions,
          },
        });
        console.log("Profession added to Firebase with ID: ", docRef.id);

        // Reset the form
        setName("");
        setCurrentProfession("");
        setFullProfessions([]);
      } catch (error) {
        console.error("Error adding profession to Firebase: ", error);
      }
    } else {
      alert("Please enter a name and at least one profession");
    }
  };

  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div>
        Current Profession:
        <input
          type="text"
          value={currentProfession}
          onChange={(e) => handleCurrentProfessionChange(e.target.value)}
        />
        <button onClick={handleAddProfession}>Add Profession</button>
      </div>
      <div>
        Full Professions:
        <ul>
          {fullProfessions.map((profession, index) => (
            <li key={index}>{profession}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AddProfession;
