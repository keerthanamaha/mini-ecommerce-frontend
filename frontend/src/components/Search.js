import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // Create a debounced version of the navigate function
  const debouncedNavigate = debounce((kw) => {
    if (kw.trim() !== "") {
      navigate("/search?keyword=" + encodeURIComponent(kw.trim()));
    } else {
      // Optionally navigate to default page or clear search results
      navigate("/search");
    }
  }, 300); // 300ms debounce delay

  // Effect to run debounced navigation when keyword changes
  useEffect(() => {
    debouncedNavigate(keyword);
  }, [keyword]);

  return (
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="form-control"
        placeholder="Enter Product Name ..."
      />
    </div>
  );
}
