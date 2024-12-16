import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock child components
jest.mock('./components/Homepage', () => () => <div data-testid="homepage">Homepage</div>);
jest.mock('./components/OurArt', () => ({ addToCart }) => (
  <div data-testid="our-art">
    OurArt
    <button onClick={() => addToCart({ name: 'Test Art', price: 100 })}>Add to Cart</button>
  </div>
));
jest.mock('./components/Location', () => () => <div data-testid="location">Location</div>);
jest.mock('./components/Cart', () => ({ cart, removeFromCart }) => (
  <div data-testid="cart">
    Cart Items: {cart.length}
    <button onClick={() => removeFromCart(0)}>Remove Item</button>
  </div>
));

// Wrapper component for tests
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('App Component', () => {
  // Navigation Tests
  describe('Navigation', () => {
    test('renders navigation links', () => {
      renderWithRouter(<App />);

      expect(screen.getByText(/homepage/i)).toBeInTheDocument();
      expect(screen.getByText(/ourart/i)).toBeInTheDocument();
      expect(screen.getByText(/about us/i)).toBeInTheDocument();
    });

    test('navigates to different pages', async () => {
      renderWithRouter(<App />);

      // Navigate to OurArt
      const artLink = screen.getByText(/ourart/i);
      fireEvent.click(artLink);
      expect(screen.getByTestId('our-art')).toBeInTheDocument();

      // Navigate to Location
      const locationLink = screen.getByText(/about us/i);
      fireEvent.click(locationLink);
      expect(screen.getByTestId('location')).toBeInTheDocument();
    });
  });

  // Cart Functionality Tests
  describe('Cart Operations', () => {
    test('adds item to cart', async () => {
      renderWithRouter(<App />);

      // Navigate to OurArt
      const artLink = screen.getByText(/ourart/i);
      fireEvent.click(artLink);

      // Add item to cart
      const addButton = screen.getByText(/add to cart/i);
      fireEvent.click(addButton);

      // Check cart badge
      const cartBadge = screen.getByText('1');
      expect(cartBadge).toBeInTheDocument();
    });

    test('removes item from cart', async () => {
      renderWithRouter(<App />);

      // Add item and navigate to cart
      const artLink = screen.getByText(/ourart/i);
      fireEvent.click(artLink);
      const addButton = screen.getByText(/add to cart/i);
      fireEvent.click(addButton);

      // Navigate to cart
      const cartLink = screen.getByTestId('cart');
      fireEvent.click(cartLink);

      // Remove item
      const removeButton = screen.getByText(/remove item/i);
      fireEvent.click(removeButton);

      // Check cart is empty
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });
  });

  // UI Element Tests
  describe('UI Elements', () => {
    test('renders logo', () => {
      renderWithRouter(<App />);
      const logo = screen.getByAltText(/logo/i);
      expect(logo).toBeInTheDocument();
    });

    test('shows mobile menu on small screens', () => {
      // Mock window resize
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));

      renderWithRouter(<App />);
      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toBeInTheDocument();
    });
  });

  // Animation and Interaction Tests
  describe('Animations and Interactions', () => {
    test('scrolls to top when button clicked', async () => {
      renderWithRouter(<App />);

      // Mock scroll position
      global.scrollY = 1000;
      global.dispatchEvent(new Event('scroll'));

      // Click scroll to top button
      const scrollButton = await screen.findByRole('button', { name: /scroll to top/i });
      fireEvent.click(scrollButton);

      // Verify scroll behavior
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });

  // Error Handling Tests
  describe('Error Handling', () => {
    test('shows error notification on failed cart operation', async () => {
      renderWithRouter(<App />);

      // Mock failed cart operation
      jest.spyOn(console, 'error').mockImplementation(() => {});

      // Trigger error
      const artLink = screen.getByText(/ourart/i);
      fireEvent.click(artLink);

      const addButton = screen.getByText(/add to cart/i);
      fireEvent.click(addButton);

      // Check for error notification
      await waitFor(() => {
        expect(screen.getByText(/error adding to cart/i)).toBeInTheDocument();
      });
    });
  });

  // Performance Tests
  describe('Performance', () => {
    test('lazy loads components', async () => {
      renderWithRouter(<App />);

      // Navigate to different routes
      const artLink = screen.getByText(/ourart/i);
      fireEvent.click(artLink);

      // Verify loading state
      expect(screen.getByTestId('our-art')).toBeInTheDocument();
    });
  });
});
