import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ZoomIn, X } from 'lucide-react';
import './OurArt.css';

export const OurArt = ({ addToCart }) => {
  const [selectedArt, setSelectedArt] = useState(null);
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const artworks = [
    {
      id: 1,
      name: 'Galaxy',
      price: 350,
      imgSrc: '/api/placeholder/400/400', // Temporarily using placeholder
      category: 'abstract',
      description: 'A mesmerizing view of the cosmic dance, captured in vibrant colors and fluid motions.',
      dimensions: '60 x 80 cm',
      medium: 'Acrylic on Canvas',
    },
    // ... other artworks
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const toggleFavorite = (artId) => {
    setFavorites((prev) =>
      prev.includes(artId) ? prev.filter((id) => id !== artId) : [...prev, artId]
    );
  };

  const filteredArtworks =
    filter === 'all' ? artworks : artworks.filter((art) => art.category === filter);

  const categories = ['all', 'abstract', 'contemporary', 'surreal'];

  return (
    <motion.div 
      className="our-art-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="gallery-header">
        <motion.h1 
          variants={itemVariants}
          className="gallery-title"
        >
          Our Collection
        </motion.h1>

        <motion.div 
          className="filter-container"
          variants={itemVariants}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`filter-button ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="gallery-grid"
        layout
        variants={itemVariants}
      >
        <AnimatePresence mode="wait">
          {filteredArtworks.map((art) => (
            <motion.div
              key={art.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="artwork-card"
            >
              <div className="artwork-image-container">
                <img src={art.imgSrc} alt={art.name} className="artwork-image" />
                <motion.div 
                  className="artwork-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="overlay-button"
                    onClick={() => setSelectedArt(art)}
                  >
                    <ZoomIn size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`overlay-button ${favorites.includes(art.id) ? 'favorite' : ''}`}
                    onClick={() => toggleFavorite(art.id)}
                  >
                    <Heart size={20} />
                  </motion.button>
                </motion.div>
              </div>

              <motion.div className="artwork-info">
                <h3>{art.name}</h3>
                <p className="artwork-medium">{art.medium}</p>
                <p className="artwork-dimensions">{art.dimensions}</p>
                <div className="price-container">
                  <span className="price">€{art.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="add-to-cart-button"
                    onClick={() => addToCart(art)}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedArt(null)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="modal-close"
                onClick={() => setSelectedArt(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
              
              <img src={selectedArt.imgSrc} alt={selectedArt.name} className="modal-image" />
              <div className="modal-info">
                <h2>{selectedArt.name}</h2>
                <p className="modal-description">{selectedArt.description}</p>
                <div className="modal-details">
                  <p>
                    <strong>Medium:</strong> {selectedArt.medium}
                  </p>
                  <p>
                    <strong>Dimensions:</strong> {selectedArt.dimensions}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedArt.category}
                  </p>
                </div>
                <div className="modal-actions">
                  <span className="modal-price">€{selectedArt.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="modal-buy-button"
                    onClick={() => {
                      addToCart(selectedArt);
                      setSelectedArt(null);
                    }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OurArt;