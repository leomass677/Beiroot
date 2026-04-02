import React from "react";
import { svgImg } from "../assets/svgImg";
import { FaFacebook, FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa";

export const exploreData = [
  {
    id: 1,
    title: "Loaded Fries",
    description: "Crispy fries with delicious toppings.",
    image: svgImg.loadedFries,
  },
  {
    id: 2,
    title: "Wraps",
    description: "Soft wraps filled with tasty ingredients.",
    image: svgImg.wraps,
  },
  {
    id: 3,
    title: "Burgers",
    description: "Juicy burgers packed with flavor.",
    image: svgImg.burger,
  },
  {
    id: 4,
    title: "Sides",
    description: "Perfect accompaniments to your meal.",
    image: svgImg.sides,
  },
  {
    id: 5,
    title: "Extras",
    description: "Perfect extras for your meal.",
    image: svgImg.extras,
  },
];

export const OurMissionData = [
  {
    id: 1,
    title: "Passion for Food",
    description:
      "We love what we do, and it shows in every dish we prepare. Food is not just our business—it's our passion.",
    image: svgImg.passion,
  },
  {
    id: 2,
    title: "Quality Ingredients",
    description:
      "We source only the freshest and highest quality ingredients to ensure every bite is delicious and satisfying.",
    image: svgImg.quality,
  },
  {
    id: 3,
    title: "Fresh Ingredients",
    description:
      "All our meals are prepared fresh daily using locally sourced, quality ingredients.",
    image: svgImg.fresh,
  },
  {
    id: 4,
    title: "Community Focus",
    description:
      "We're proud to be part of the Ilorin community, serving our neighbors with care and dedication.",
    image: svgImg.community,
  },
];

export const WhatOurCustomersSayData = [
  {
    id: 1,
    name: "John Doe",
    feedback:
      "Beiroot's food is amazing! The flavors are bold and the quality is top-notch. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback:
      "I love the convenience of ordering from Beiroot. The food is always fresh and delicious, and the delivery is super fast!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    feedback:
      "Beiroot has become my go-to for quick and tasty meals. The variety on the menu is fantastic, and the quality is consistently excellent.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    feedback:
      "I can't get enough of Beiroot's food! The flavors are incredible, and the portion sizes are generous. It's my favorite place to order from in Ilorin.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

export const OurBestSellersData = [
  {
    id: 1,
    name: "Loaded Fries",
    description: "Crispy fries topped with cheese, bacon, and green onions.",
    image: svgImg.loadedFries,
  },
  {
    id: 2,
    name: "Classic Burger",
    description:
      "Juicy beef patty with lettuce, tomato, and our special sauce.",
    image: svgImg.burger,
  },
  {
    id: 3,
    name: "Chicken Wrap",
    description:
      "Grilled chicken with fresh veggies wrapped in a soft tortilla.",
    image: svgImg.wraps,
  },
  {
    id: 4,
    name: "Sides Combo",
    description: "A delicious mix of our best sides, perfect for sharing.",
    image: svgImg.sides,
  },
  {
    id: 5,
    name: "Extras Pack",
    description:
      "A variety of extras to complement your meal, including sauces and toppings.",
    image: svgImg.extras,
  },
];

export const ContactInformationData = [
  {
    id: 1,
    type: "Phone",
    value: "+234 803 456 7890",
    icon: svgImg.phone,
    action: "tel:+2348034567890",
    isLink: true,
  },
  {
    id: 2,
    type: "WhatsApp",
    value: "+234 803 456 7890",
    icon: svgImg.whatsapp,
    action: "https://wa.me/2348034567890",
    isLink: true,
  },
  {
    id: 3,
    type: "Email",
    value: "info@beiroot.com",
    icon: svgImg.email,
    action: "mailto:info@beiroot.com", // This is correct
    isLink: true,
  },
  {
    id: 4,
    type: "Address",
    value: "123 Main Street, Ilorin, Nigeria",
    icon: svgImg.location,
    action: "https://maps.google.com/?q=123+Main+Street+Ilorin+Nigeria",
    isLink: true,
  },
  {
    id: 5,
    type: "Open Hours",
    value: "Mon-Sun: 10:00 AM - 10:00 PM",
    icon: svgImg.clock,
    action: null,
    isLink: false,
  },
];

export const FollowUsData = [
  {
    id: 1,
    platform: "Facebook",
    url: "https://www.facebook.com/beiroot",
    icon: React.createElement(FaFacebook),
  },
  {
    id: 2,
    platform: "Instagram",
    url: "https://www.instagram.com/beiroot",
    icon: React.createElement(FaInstagram),
  },
  {
    id: 3,
    platform: "TikTok",
    url: "https://www.tiktok.com/@beiroot",
    icon: React.createElement(FaTiktok),
  },
  {
    id: 4,
    platform: "Snapchat",
    url: "https://www.snapchat.com/add/beiroot",
    icon: React.createElement(FaSnapchat),
  },
];

export const QuickLinks = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Menu", url: "/menu" },
  { id: 3, name: "Checkout", url: "/checkout" },
  { id: 4, name: "Contact Us", url: "/contact" },
  { id: 5, name: "About Us", url: "/about" },
];

export const AboutUsData = {
  hero: {
    heading: "About Beiroot",
    subheading: "Bringing authentic flavors to Ilorin since 2020",
    description:
      "At Beiroot, we're passionate about bringing you the best in fast food with a twist. Our menu features a variety of mouth-watering dishes, from loaded fries and wraps to burgers and sides, all made with fresh ingredients and bold flavors. Whether you're craving a quick bite or a full meal, Beiroot has something for everyone. Join us on this flavorful journey and experience the taste of Beiroot in Ilorin!",
  },
  story: {
    title: "Our Story",
    content: [
      {
        id: 1,
        title: "The Beginning",
        text: "Beiroot was founded in 2020 with a simple yet powerful mission: to bring delicious, freshly prepared meals to the people of Ilorin, Kwara State. What started as a small passion project for authentic flavors has grown into a beloved local restaurant that serves hundreds of satisfied customers daily.",
      },
      {
        id: 2,
        title: "Our Location",
        text: "Conveniently located in the heart of Ilorin, we serve a diverse menu that beautifully combines traditional Nigerian favorites with international classics. Every dish is carefully crafted using premium quality ingredients and time-tested recipes that have been perfected over the years.",
      },
      {
        id: 3,
        title: "Our Commitment",
        text: "Our dedicated team is committed to providing not just great food, but an exceptional dining experience from start to finish. Whether you're ordering for delivery or dining in with family and friends, we go above and beyond to make every meal memorable and every customer satisfied.",
      },
    ],
  },
  stats: [
    {
      id: 1,
      number: "2020",
      label: "Year Founded",
    },
    {
      id: 2,
      number: "5000+",
      label: "Happy Customers",
    },
    {
      id: 3,
      number: "50+",
      label: "Delicious Dishes",
    },
    {
      id: 4,
      number: "30min",
      label: "Average Delivery",
    },
  ],
  values: {
    title: "Our Core Values",
    subtitle: "What makes us different",
    items: [
      {
        id: 1,
        title: "Quality First",
        description:
          "We never compromise on quality. Only the finest ingredients make it to your plate.",
        img: svgImg.quality,
      },
      {
        id: 2,
        title: "Passion for Food",
        description:
          "We love what we do, and it shows in every dish we prepare. Food is not just our business it's our passion.",
        img: svgImg.passion,
      },
      {
        id: 3,
        title: "Fresh Ingredients",
        description:
          "All our meals are prepared fresh daily using locally sourced, quality ingredients.",
        img: svgImg.fresh,
      },
      {
        id: 4,
        title: "Community Focus",
        description:
          "We're proud to be part of the Ilorin community, serving our neighbors with care and dedication.",
        img: svgImg.community,
      },
    ],
  },
  mission: {
    title: "Our Mission",
    description:
      "To serve Ilorin the most delicious, freshly prepared meals with exceptional service, creating memorable dining experiences that keep our customers coming back for more.",
  },
  vision: {
    title: "Our Vision",
    description:
      "To become the most loved fast-food brand in Ilorin and beyond, known for our authentic flavors, quality ingredients, and outstanding customer service.",
  },
  team: {
    title: "Meet Our Team",
    subtitle: "The passionate people behind Beiroot",
    members: [
      {
        id: 1,
        name: "Ahmed Beiroot",
        role: "Founder & CEO",
        bio: "With over 10 years of culinary experience, Ahmed started Beiroot to bring authentic flavors to Ilorin.",
        image:
          "https://plus.unsplash.com/premium_photo-1702249257649-e463edaa6eec?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        name: "Fatima Ibrahim",
        role: "Head Chef",
        bio: "Fatima brings creativity and passion to every dish, ensuring each meal is a masterpiece.",
        image:
          "https://plus.unsplash.com/premium_photo-1681483867977-a2d9c24ee63b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        name: "Oluwaseun Adeyemi",
        role: "Operations Manager",
        bio: "Seun ensures everything runs smoothly, from kitchen to customer delivery.",
        image:
          "https://plus.unsplash.com/premium_photo-1661255367848-a4a29983bc2e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
};

export const WhyChooseBeirootArray = [
  {
    id: 1,
    name: "Freshly Prepared Meals",
    description:
      "Our meals are made with carefully selected ingredients to deliver great taste and satisfying portions every time.",
    image: svgImg.fastPreparedMeal,
  },
  {
    id: 2,
    name: "Fast & Easy Ordering",
    description:
      "Order your favorite food quickly through our simple WhatsApp ordering system and enjoy a smooth experience.",
    image: svgImg.fastEasyOrdering,
  },
  {
    id: 3,
    name: "Affordable Prices",
    description:
      "Delicious food at prices that everyone can enjoy, perfect for students, families, and food lovers.",
    image: svgImg.affordablePrices,
  },
  {
    id: 4,
    name: "Convenient Location",
    description:
      "Proudly serving the Ilorin community with tasty meals, snacks, and refreshing drinks.",
    image: svgImg.covenientLocation,
  },
];
