import React, { useState, useEffect } from 'react';
import TabSection from '../components/TabSection';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]); // State to hold products data
  const [banner, setBanner] = useState(null); // State to hold banner data
  const API_URL = 'http://localhost:5000/api/products/getAll'; // Backend API endpoint

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);

        // Set products data
        setProducts(response.data);

        // Set banner data (assuming first product has the banner data)
        const firstProductWithBanner = response.data.find((product) => product.banner);
        if (firstProductWithBanner) {
          setBanner(firstProductWithBanner.banner);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Render a loading state until data is fetched
  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Banner Section */}
      {banner && (
        <section
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `url('http://localhost:5000/${banner.backgroundImage.replace(
              '\\',
              '/'
            )}')`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white px-4 w-full text-center">
            <h1 className="text-3xl font-bold">{banner.title.replace(/"/g, '')}</h1>
          </div>
        </section>
      )}

      {/* Products Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
            >
              <img
                src={`http://localhost:5000/${product.image.replace('\\', '/')}`} // Dynamic image URL
                alt={product.title}
                className="rounded-md w-full h-40 object-cover mb-4"
              />
              <h2 className="text-xl font-bold mb-2">
                {product.title.replace(/"/g, '')}
              </h2>
              <h3 className="text-lg text-[#00BFB3] font-medium mb-2">
                {product.subtitle.replace(/"/g, '')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description.replace(/"/g, '')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tab Section */}
      <TabSection />

      {/* Commitment Section */}
      <div className="bg-[#00BFB3] text-white text-center py-8">
        <p className="text-lg font-medium max-w-4xl mx-auto">
          Theplacify demonstrates its commitment to quality and cost, not just by{' '}
          <span className="font-bold italic">“words”</span>, but by actions and
          results.
        </p>
      </div>
    </div>
  );
}

export default Products;
