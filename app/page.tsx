"use client"

import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

interface Product {
  id: number
  name: string
  price: number
  category: string
  rating: number
  image: string
  originalPrice?: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Smart Watch Latest Model",
    price: 99,
    category: "Electronics",
    rating: 5,
    image: "/placeholder.svg",
    originalPrice: 129,
  },
  // ... add more products as needed
]

const slides = [
  {
    image: "/placeholder.svg",
    alt: "Audio System",
    title: "Latest Audio System",
    discount: "Special Discount",
    offer: "offer 20% off",
  },
  {
    image: "/placeholder.svg",
    alt: "Latest Laptop",
    title: "Latest Laptop",
    discount: "New Arrival",
    offer: "Get 15% off",
  },
  {
    image: "/placeholder.svg",
    alt: "Latest AirPods",
    title: "Latest AirPods",
    discount: "Limited Time Offer",
    offer: "Buy now and save 25%",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [sortOrder, setSortOrder] = useState("asc")

  useEffect(() => {
    let result = [...products]

    if (categoryFilter !== "All") {
      result = result.filter((product) => product.category === categoryFilter)
    }

    result = result.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)

    result.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price))

    setFilteredProducts(result)
  }, [categoryFilter, priceRange, sortOrder])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 30000)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div>
      {/* Top Banner */}
      <div className="w-full bg-black text-white text-center text-sm py-1">
        Free Shipping On All Order Over $150 India - NYW1
      </div>

      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/placeholder.svg" alt="Emetix Logo" width={120} height={40} className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 uppercase text-sm">
          <Link href="/" className="text-black hover:text-[#FFA800]">
            Home
          </Link>
          <Link href="/shop" className="text-black hover:text-[#FFA800]">
            Shop
          </Link>
          <Link href="/blog" className="text-black hover:text-[#FFA800]">
            Blog
          </Link>
          <Link href="/media" className="text-black hover:text-[#FFA800]">
            Media
          </Link>
          <Link href="/shortcode" className="text-black hover:text-[#FFA800]">
            Shortcode
          </Link>
          <Link href="/features" className="text-black hover:text-[#FFA800]">
            Features
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <Link href="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#FFA800] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Slider */}
        <div className="relative bg-gray-900 h-[350px]">
          <div className="container mx-auto h-full px-4 flex items-center justify-between">
            <button className="text-white p-4 z-10" onClick={prevSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="flex-1 flex items-center justify-between">
              <div className="w-1/2 text-left pr-8">
                <p className="text-[#FFA800] mb-1">{slides[currentSlide].discount}</p>
                <h1 className="text-white text-3xl mb-2">{slides[currentSlide].title}</h1>
                <p className="text-white text-xl mb-4">{slides[currentSlide].offer}</p>
                <button className="bg-[#FFA800] text-white px-6 py-2 rounded">Shop Now</button>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <Image
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt={slides[currentSlide].alt}
                  width={300}
                  height={200}
                  className="object-contain max-h-[280px]"
                />
              </div>
            </div>

            <button className="text-white p-4 z-10" onClick={nextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2 h2 l4 10 l-8 0 l4 -10" />
                  <path d="M6 12h12" />
                  <path d="M8 22v-10" />
                  <path d="M16 22v-10" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">FREE SHIPPING WORLDWIDE</h3>
                <p className="text-gray-500 text-sm">Lorem ipsum sit amet dummy text...</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">24/7 CUSTOMER SERVICE</h3>
                <p className="text-gray-500 text-sm">Lorem ipsum sit amet dummy text...</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">MONEY BACK GUARANTEE</h3>
                <p className="text-gray-500 text-sm">Lorem ipsum sit amet dummy text...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="relative bg-gray-900 p-8 rounded-lg">
            <Image src="/placeholder.svg" alt="Headphones" width={300} height={300} className="mx-auto mb-4" />
            <h3 className="text-white text-2xl mb-2">Sale Up To 30% Off</h3>
            <p className="text-gray-400 mb-4">Latest Sound System</p>
            <button className="text-[#FFA800] uppercase text-sm font-bold">View Offer</button>
          </div>

          <div className="relative bg-gray-900 p-8 rounded-lg">
            <Image src="/placeholder.svg" alt="Smart Watch" width={300} height={300} className="mx-auto mb-4" />
            <h3 className="text-white text-2xl mb-2">20% Off</h3>
            <p className="text-gray-400 mb-4">Smart Watch</p>
            <button className="text-[#FFA800] uppercase text-sm font-bold">Shop Now</button>
          </div>

          <div className="lg:col-span-1 grid grid-rows-2 gap-8">
            <div className="relative bg-gray-900 p-8 rounded-lg">
              <Image src="/placeholder.svg" alt="Tablet Computer" width={200} height={200} className="mx-auto mb-4" />
              <h3 className="text-white text-xl">Tablet Computer</h3>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="relative bg-gray-900 p-6 rounded-lg">
                <Image src="/placeholder.svg" alt="Smart Speaker" width={150} height={150} className="mx-auto mb-4" />
                <h3 className="text-white text-lg text-center">Smart Speaker</h3>
              </div>

              <div className="relative bg-gray-900 p-6 rounded-lg">
                <Image src="/placeholder.svg" alt="Game Controller" width={150} height={150} className="mx-auto mb-4" />
                <h3 className="text-white text-lg">Game Controller</h3>
                <button className="text-[#FFA800] text-sm uppercase font-bold mt-2">View More</button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Top Products</h2>
            <div className="flex gap-4">
              <button className="text-gray-500 hover:text-black">LATEST</button>
              <button className="text-gray-500 hover:text-black">BEST SELLER</button>
              <button className="text-gray-500 hover:text-black">FEATURED</button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-6">Filters</h3>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-[#FFA800]"
                    >
                      <option value="All">All</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Books">Books</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-[#FFA800]"
                        placeholder="Min"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-[#FFA800]"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  {/* Sort by Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort by Price</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-[#FFA800]"
                    >
                      <option value="asc">Low to High</option>
                      <option value="desc">High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFA800] text-[#FFA800]" />
                      ))}
                    </div>
                    <h3 className="text-sm mb-2">{product.name}</h3>
                    <p className="text-[#FFA800] font-bold">${product.price.toFixed(2)}</p>
                    {product.originalPrice && (
                      <p className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t mt-16 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Information Column */}
              <div>
                <h3 className="font-semibold mb-4">Information</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/orders">Orders and Returns</Link>
                  </li>
                  <li>
                    <Link href="/support">Support</Link>
                  </li>
                  <li>
                    <Link href="/shipping">Shipping & Delivery</Link>
                  </li>
                </ul>
              </div>

              {/* Why Buy From Us */}
              <div>
                <h3 className="font-semibold mb-4">Why Buy From Us</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/shipping-policy">Shipping Policy</Link>
                  </li>
                  <li>
                    <Link href="/returns">Returns Policy</Link>
                  </li>
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>

              {/* My Account */}
              <div>
                <h3 className="font-semibold mb-4">My Account</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/account">Sign In</Link>
                  </li>
                  <li>
                    <Link href="/cart">View Cart</Link>
                  </li>
                  <li>
                    <Link href="/wishlist">My Wishlist</Link>
                  </li>
                  <li>
                    <Link href="/orders">Track My Order</Link>
                  </li>
                  <li>
                    <Link href="/help">Help</Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold mb-4">Contacts</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 mt-0.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>
                      Got Questions? Call us 24/7!
                      <br />
                      (800)245-6789
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Link href="https://facebook.com" className="text-gray-600 hover:text-[#FFA800]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </Link>
                    <Link href="https://twitter.com" className="text-gray-600 hover:text-[#FFA800]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </Link>
                    <Link href="https://linkedin.com" className="text-gray-600 hover:text-[#FFA800]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

