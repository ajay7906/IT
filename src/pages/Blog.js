import React, { useState, useEffect } from "react";
import axios from "axios";

function Blog() {
  const [blogs, setBlogs] = useState([]); // State to store blog data
  const API_URL = "http://localhost:5000/api/blog/getAll"; // Backend API URL

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_URL);
        setBlogs(response.data); // Store fetched blogs in state
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Render a loading state until data is fetched
  if (!blogs.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Blog Header Section */}
        <div className="relative h-64 bg-gray-900 text-white">
          <img
            src={`http://localhost:5000/${blogs[0].header.image.replace("\\", "/")}`} // Dynamic header image
            alt="Blog Background"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold">{blogs[0].header.title}</h1>
          </div>
        </div>

        {/* Blog Content Section */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {/* Blog Image */}
              <img
                src={`http://localhost:5000/${blog.image.replace("\\", "/")}`} // Dynamic blog image
                alt={blog.title}
                className="w-full h-64 object-cover"
              />

              {/* Blog Text Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {blog.title.replace(/"/g, "")}
                </h2>
                <p className="text-gray-600 mb-4">{blog.content.replace(/"/g, "")}</p>

                {/* Blog Meta Info */}
                <div className="text-sm text-gray-500 mb-4">
                  By <span className="font-semibold">{blog.author.replace(/"/g, "")}</span> |{" "}
                  {new Date(blog.publishedDate).toLocaleDateString()} |{" "}
                  <span className="font-semibold">{blog.category.replace(/"/g, "")}</span> |{" "}
                  <span>{blog.metaInfo.comments.replace(/"/g, "")}</span>
                </div>

                {/* Read More Link */}
                <a href="#" className="text-teal-500 font-semibold hover:underline">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment Section */}
      <div className="bg-[#00BFB3] text-white text-center py-8">
        <p className="text-lg font-medium max-w-4xl mx-auto">
          Theplacify demonstrates its commitment to quality and cost, not
          just by <span className="font-bold italic">“words”</span>, but by
          actions and results.
        </p>
      </div>
    </>
  );
}

export default Blog;
