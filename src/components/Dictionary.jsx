import { useState } from "react";
import axios from "axios";
const Dictionary = () => {
  // ======================= functionality =============================

  //================================= Creat the State =========================
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordData, setWordData] = useState(null);

  //========================================= condition ======================================
  const searchWord = async () => {
    try {
      if (word.trim().length === 0) {
        setError("Please Enter a Word...");
        return;
      }
      setLoading(true);
      setError("");
      let res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      console.log(res);
      setWordData(res.data[0]);
    } catch (error) {
      console.log(error);
      setError("Word Not Found");
    } finally {
      setLoading(false);
    }
  };

  // =================================== User interface ===================================
  return (
    <div className="min-h-screen bg-radial from-purple-400- via-purple-400 to-violet-500 flex justify-center items-center p-5">
      <div className=" bg-white/50 w-full max-w-2xl rounded-3xl p-8 shadow-xl shadow-black/50  border-purple-600">
        {/* ================================================================================================= */}
        <h1 className="text-4xl text-center font-bold text-purple-800 mb-8">
          📖 Dictionary App
        </h1>
        {/* ================================================================================================== */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter a Word 🧐"
            className=" flex-1 border-2 border-purple-400  rounded-xl px-4 py-3 outline-none focus:border-purple-500 shadow-2xl shadow-black/40 placeholder:text-black "
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            className="bg-blue-700 text-white font-medium text-xl px-4 rounded-xl shadow-2xl shadow-black/40   hover:bg-blue-800  transition-all  hover:scale-110"
            onClick={searchWord}
          >
            Search🔍
          </button>
        </div>

        {loading && (
          <h2 className="text-center mt-6 text-lg text-purple-500 font-semibold animate-pulse">
            Searching.....
          </h2>
        )}

        {error && (
          <h2 className="text-center mt-6 text-lg text-red-700 font-semibold">
            {error}
          </h2>
        )}

        {wordData && (
          <div className="mt-8 bg-black/20 rounded-2xl p-7 ">
            <h2 className="text-3xl font-bold text-purple-700">{wordData.word}</h2>
            <p className="text-black mt-1 ">
              {wordData.phoneic || "phonetic is not found"}
            </p>
            <div className="mt-5 space-y-3">
              <div
                className="bg-white/70 rounded-xl p-3
              flex justify-between"
              >
                <span className="font-semibold ">Part of Speech </span>
                <span className="">{wordData.meanings[0].partOfSpeech}</span>
              </div>

              <div className="bg-white/70 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Meaning:-</h3>
                <p className="">
                  {wordData.meanings[0].definitions[0].definition}
                </p>
              </div>

              {/*  */}

              <div className="bg-white/70 rounded-xl p-3">
                <h3 className="font-semibold mb-2 ">Example</h3>
                <p className="">{wordData.meanings[0].definitions[0].example || "No example Available "}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
