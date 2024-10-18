"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

const SingalMeme = ({ searchParams }) => {
  const { url, box_count, id } = searchParams;
  const text1Val = useRef();
  const text2Val = useRef();
  const [myMeme, setMyMeme] = useState(null);

  const generateMeme = async (event) => {
    event.preventDefault();
    if (!text1Val.current.value || !text2Val.current.value) {
      alert("Please fill all inputs");
      return;
    }
    try {
      const res = await fetch(
        `https://api.imgflip.com/caption_image?template_id=${id}&username=haseeburrehmanjs&password=haseeb123&text0=${text1Val.current.value}&text1=${text2Val.current.value}`
      );
      const data = await res.json();
      setMyMeme(data.data.url);
      text1Val.current.value = "";
      text2Val.current.value = "";
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center mt-10 text-6xl font-bold">Meme Generator</h1>
      <div className="flex justify-center flex-wrap gap-5 mt-5">
        <Image src={url} width={300} height={300} alt="Original Meme" />
        {myMeme && <Image src={myMeme} width={300} height={300} alt="Generated Meme" />}
      </div>
      <div className="mt-4">
        {myMeme ? (
          <div>
            <h1>
              Download{" "}
              <a className="text-blue-700 underline" href={myMeme} target="_blank" rel="noopener noreferrer">
                Meme
              </a>
            </h1>
          </div>
        ) : (
          <form className="flex flex-col gap-2" onSubmit={generateMeme}>
            <input
              ref={text1Val}
              className="w-[300px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type first text..."
            />
            <input
              ref={text2Val}
              className="w-[300px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type second text..."
            />
            <button type="submit" variant="contained">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SingalMeme;
