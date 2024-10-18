"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        console.log(data)
        if (data.success) setMemes(data.data.memes);
        
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div>
      <h1 className="justify-center text-center align-middle text-[2rem]">
        Popular Memes
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {memes.length > 0 ? (
          memes.map((meme, index) => (
            <Link
              key={index}
              href={{
                pathname: "generatememe",
                query: {
                  url: meme.url,
                  id: meme.id,
                  box_count: meme.box_count,
                },
              }}
            >
              <Image
                className="tilt-in-top-1 hover:relative hover:bottom-2 hover:shadow-lg hover:border transition-delay-150ms"
                width={400}
                height={300}
                alt={`Meme ${index}`}
                src={meme.url}
              />
            </Link>
          ))
        ) : (
          <h1 className="text-[2rem]">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
