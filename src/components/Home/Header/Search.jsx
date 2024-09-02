import React, {  useState } from "react";
import { CiSearch } from "react-icons/ci";

import { Blog } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const { postData } = Blog();

  const searchData =
    postData &&
    postData?.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

  const navigate = useNavigate();
  return (
    <>
      
          <div className="flex items-center gap-2 border-[1px] border-gray-600 px-5 py-2 rounded-full relative z-10">
            <span className="text-xl text-black">
              <CiSearch />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" outline-none text-sm w-full text-black "
              type="text"
              placeholder="Search Medium"
            />
            {search !== "" && (
              <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
                {searchData.length > 0 ? (
                  <>
                    {searchData.map((post, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          navigate(`/post/${post?.id}`);
                          setSearch("");
                        }}
                        className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                        <h2 className="line-clamp-1 capitalize text-sm font-bold">
                          {post.title}
                        </h2>
                        <div
                          className="text-xs text-gray-500 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: post.desc }}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 p-3">No Post Found</p>
                )}
              </div>
            )}
          </div>
    </>
  );
};

export default Search;