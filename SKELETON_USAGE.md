# Skeleton Screen Components

This guide shows how to use skeleton screens throughout the Beiroot app.

## Basic Usage

### Simple Skeleton

```jsx
import Skeleton from "./Skeleton";

export const Example = () => <Skeleton width="w-full" height="h-4" />;
```

### Preset Skeletons

#### 1. Card Skeleton (for product/menu cards)

```jsx
import { CardSkeleton } from "./Skeleton";

export const ProductList = ({ isLoading }) => (
  <div>{isLoading ? <CardSkeleton /> : <YourCard />}</div>
);
```

#### 2. Menu Item Skeleton (for menu items)

```jsx
import { MenuItemSkeleton } from "./Skeleton";

export const MenuGrid = ({ isLoading }) => (
  <div className="grid grid-cols-3 gap-4">
    {isLoading ? (
      <>
        <MenuItemSkeleton />
        <MenuItemSkeleton />
        <MenuItemSkeleton />
      </>
    ) : (
      <YourMenuItems />
    )}
  </div>
);
```

#### 3. Text Skeleton (for paragraph content)

```jsx
import { TextSkeleton } from "./Skeleton";

export const ArticleCard = ({ isLoading }) => (
  <div className="card p-6">
    {isLoading ? <TextSkeleton lines={4} /> : <YourText />}
  </div>
);
```

#### 4. Circle Avatar Skeleton (for user avatars)

```jsx
import { CircleAvatarSkeleton } from "./Skeleton";

export const UserProfile = ({ isLoading }) => (
  <div>{isLoading ? <CircleAvatarSkeleton /> : <YourAvatar />}</div>
);
```

## Custom Skeleton with Props

```jsx
<Skeleton
  width="w-1/2" // Tailwind width class
  height="h-6" // Tailwind height class
  variant="light" // "default" (primary-100) or "light" (primary-50)
  count={3} // Renders multiple skeletons
  circle={true} // Rounded circle shape
  className="rounded-xl" // Additional custom classes
/>
```

## Complete Example: Loading State

```jsx
import { useState, useEffect } from "react";
import { MenuItemSkeleton } from "./Skeleton";

export const MenuGrid = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems().then((data) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {isLoading ? (
        <>
          <MenuItemSkeleton />
          <MenuItemSkeleton />
          <MenuItemSkeleton />
        </>
      ) : (
        items.map((item) => <MenuItem key={item.id} item={item} />)
      )}
    </div>
  );
};
```

## Components to Add Skeletons To

- **MenuGrid.jsx** - Show when loading menu items
- **Cart.jsx** - Show when loading cart items
- **Gallery.jsx** - Show when loading images
- **OurBestSellers.jsx** - Show when loading product data
- **ContactInformation.jsx** - Show when loading contact data
- **WhatOurCustomers.jsx** - Show when loading customer reviews
- **ExploreOurMenu.jsx** - Show when loading menu categories

This provides a smooth loading experience for users! 🎉
