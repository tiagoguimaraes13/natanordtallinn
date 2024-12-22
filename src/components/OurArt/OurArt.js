import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ZoomIn, X } from 'lucide-react';
import './OurArt.css';
import eyeImage from '../../assets/eye3.jpg';
import splashImage from '../../assets/splash3.jpg';
import freedoomImage from '../../assets/freedoom2.png';
import UFOImage from '../../assets/ufo2.jpg';
import galaxyImage from '../../assets/galaxy2.jpg';
import goldenImage from '../../assets/golden.jpg';

export const OurArt = ({ addToCart }) => {
  const [selectedArt, setSelectedArt] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const artworks = [
    {
      id: 1,
      name: 'The Eye',
      price: 450,
      imgSrc: eyeImage,
      description: 'A mysterious gaze into the depths of imagination, where reality meets the extraordinary in a swirl of enchanting colors.',
      dimensions: '60 x 80 cm',
      medium: 'Mixed Media on Canvas',
    },
    {
      id: 2,
      name: 'Splash',
      price: 380,
      imgSrc: splashImage,
      description: 'An explosive celebration of color and movement, capturing the dynamic energy of water in motion.',
      dimensions: '70 x 90 cm',
      medium: 'Acrylic on Canvas',
    },
    {
      id: 3,
      name: 'Freedoom',
      price: 520,
      imgSrc: freedoomImage,
      description: 'Breaking free from conventional boundaries, this piece explores the essence of liberation through surreal imagery.',
      dimensions: '80 x 100 cm',
      medium: 'Digital Art on Canvas',
    },
    {
      id: 4,
      name: 'UFO',
      price: 420,
      imgSrc: UFOImage,
      description: 'A cosmic journey into the unknown, blending otherworldly elements with terrestrial landscapes.',
      dimensions: '65 x 85 cm',
      medium: 'Mixed Media with Metallic Paint',
    },
    {
      id: 5,
      name: 'Golden Crack',
      price: 580,
      imgSrc: goldenImage,
      description: 'Inspired by kintsugi, this piece celebrates the beauty of imperfection through golden highlights and bold textures.',
      dimensions: '90 x 120 cm',
      medium: 'Acrylic with Gold Leaf',
    },
    {
      id: 6,
      name: 'Galaxy',
      price: 490,
      imgSrc: galaxyImage,
      description: 'A mesmerizing exploration of cosmic beauty, featuring swirling nebulas and interstellar patterns.',
      dimensions: '75 x 95 cm',
      medium: 'Acrylic and Metallic Paint',
    }
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
      </div>

      <motion.div 
        className="gallery-grid"
        layout
        variants={itemVariants}
      >
        <AnimatePresence mode="wait">
          {artworks.map((art) => (
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
              <div className="modal-image-container">
                <img src={selectedArt.imgSrc} alt={selectedArt.name} className="modal-image" />
              </div>
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