import { useState, useEffect } from "react";

const totalPhotos = 200;

const FotomelaPoll = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [votes, setVotes] = useState(() => {
    const storedVotes = JSON.parse(localStorage.getItem("fotomelaVotes")) || {};
    return storedVotes;
  });

  useEffect(() => {
    const storedVote = localStorage.getItem("selectedPhoto");
    if (storedVote) {
      setSelectedNumber(parseInt(storedVote, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fotomelaVotes", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (photoNumber) => {
    setVotes((prevVotes) => {
      const newVotes = { ...prevVotes };

      if (selectedNumber === photoNumber) {
        delete newVotes[photoNumber];
        localStorage.removeItem("selectedPhoto");
        setSelectedNumber(null);
      } else {
        if (selectedNumber !== null) {
          newVotes[selectedNumber] = Math.max((newVotes[selectedNumber] || 1) - 1, 0);
        }
        newVotes[photoNumber] = (newVotes[photoNumber] || 0) + 1;
        localStorage.setItem("selectedPhoto", photoNumber);
        setSelectedNumber(photoNumber);
      }

      return newVotes;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-4">Fotomela Voting Poll</h1>
      <div className="grid grid-cols-10 gap-3 max-w-4xl">
        {Array.from({ length: totalPhotos }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`p-3 text-sm rounded-lg border-2 font-medium ${
              selectedNumber === num
                ? "border-purple-600 bg-purple-500 text-white"
                : "border-gray-300 bg-white text-black"
            }`}
            onClick={() => handleVote(num)}
          >
            {num} ({votes[num] || 0})
          </button>
        ))}
      </div>
    </div>
  );
};

export default FotomelaPoll;


