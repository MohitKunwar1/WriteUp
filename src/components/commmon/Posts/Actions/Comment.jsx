import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { Blog } from "../../../../Context/Context";
import { formatNumber } from "../../../../utils/helper";

const Comment = () => {
  const { setShowComment, commentLength } = Blog();

  return (
    <button
      onClick={() => setShowComment(true)}
      className={`flex items-center gap-1 text-sm hover:text-gray-500 transition-all duration-200`}
    >
      <FaRegComment className="text-lg" />
      <span>{formatNumber(commentLength)}</span>
    </button>
  );
};

export default Comment;
