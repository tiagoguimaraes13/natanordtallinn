import React from 'react';
import './Gallery.css'; // Ensure this CSS is applied

const Gallery = ({ addToCart }) => {
  // Reference the images directly from the public/images/ directory
  const artworks = [
    { name: 'Galaxy', price: 350, imgSrc: '/images/image1.jpg' },
    { name: 'Freedom', price: 400, imgSrc: '/images/image2.jpg' },
    { name: 'Golden Crack', price: 300, imgSrc: '/images/image3.jpg' },
  ];

  return (
    <section className="gallery">
      {artworks.map((art, idx) => (
        <div className="artwork" key={idx}>
          <img src={art.imgSrc} alt={`${art.name} Artwork`} />
          <h3>{art.name}</h3>
          <p>Price: €{art.price}</p>
          <button className="buy-item" onClick={() => addToCart(art.name, art.price)}>
            Buy
          </button>
        </div>
      ))}
    </section>
  );
};

export default Gallery;
