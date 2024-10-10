import { useState, useEffect } from "react";

export const Rating = (props: { setIsBad: (isBad: boolean) => void}) => {
  const {setIsBad} = props;
  const [file, setFile] = useState<File | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (file && (file.size / 1024 > 100 || file.size / 1024 < 1)) {
      setIsBad(true)
    }
    setRating(file ? Math.floor(file.size / 1024) : 0);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const list = [];
  for (let i = 1; i <= 100; i++) {
    list.push(i);
  }

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file ? (
        <section>
          <div className="text-xl mt-3">
            Your rating: {Math.floor(file.size / 1024)} (Between 1 and 100)
          </div>
        </section>
      ) : (
        <div className="text-l">No rating selected</div>
      )}
      {list.map((star) => {
        return (
          <span
            className="start"
            style={{
              cursor: "pointer",
              color: rating && rating >= star ? "gold" : "gray",
              fontSize: `35px`,
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </>
  );
};
