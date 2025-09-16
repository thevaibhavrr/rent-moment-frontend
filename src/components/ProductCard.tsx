import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/services/api";
import { useWishlist } from "@/contexts/WishlistContext";
import WhatsAppIcon from "./WhatsAppIcon";

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
}

const ProductCard = ({
  product,
  isWishlisted: propIsWishlisted,
  onWishlistToggle: propOnWishlistToggle
}: ProductCardProps) => {
  const { _id, name, description, images, price, originalPrice, rentalDuration, deposit } = product;
  const image = images?.[0] || '/placeholder.svg';
  
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Use context values if not provided as props
  const isWishlisted = propIsWishlisted !== undefined ? propIsWishlisted : isInWishlist(_id);
  const onWishlistToggle = propOnWishlistToggle || ((productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  });

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const depositText = deposit && deposit > 0 ? `\nDeposit: ₹${deposit}` : '';
    const message = `Check out this amazing product: *${name}*\n\nPrice: ₹${price} for ${rentalDuration} days${depositText}\n\nView more: ${window.location.origin}/product/${_id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product-card group">
      <div className="relative">
        <Link to={`/product/${_id}`}>
          <img
            src={image}
            alt={name}
            className="product-card-image"
          />
        </Link>
        
        {/* WhatsApp Share Button */}
        {/* <button
          onClick={handleWhatsAppShare}
          className="absolute top-3 left-3 p-2 bg-green-500/90 backdrop-blur-sm rounded-full shadow-md transition-all duration-300 hover:bg-green-500 hover:scale-110"
          title="Share on WhatsApp"
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </button> */}

        {/* Wishlist Button */}
        <button
          onClick={() => onWishlistToggle?.(_id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-playfair font-semibold text-lg text-gray-900 line-clamp-1">
            {name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{price}
              </span>
            </div>
            {/* deposit */}
            {deposit && deposit > 0 && (
              <p className="text-xs text-gray-400">
                Deposit: ₹{deposit.toLocaleString()}
              </p>
            )}
            
          </div>
        </div>

        <Link
          to={`/product/${_id}`}
          className="block w-full text-center btn-luxury-outline py-2 md:py-3 text-xs md:text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;