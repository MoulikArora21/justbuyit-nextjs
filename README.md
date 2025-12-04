# JustBuyIt

An e-commerce product listing app built with Next.js and TypeScript.

**Live Demo:** [https://justbuyit-nextjs.vercel.app/](https://justbuyit-nextjs.vercel.app/)

**Note:** The app uses a public test API (Platzi Fake Store API), so sometimes products might have weird or inappropriate or missing content. This is because anyone can add or delete data using that API.

## What It Does

- Shows a list of products with name, price, and category
- Search bar that filters products as you type (waits 500ms after you stop typing)
- Pagination
- Click on a product to see more details
- Works on mobile and desktop
- Loading animations

## Built With

- Next.js
- React
- TypeScript
- Custom CSS (no Tailwind)
- GSAP for animations
- Vitest for testing

## Getting Started

```bash
# Clone the repository
git clone https://github.com/MoulikArora21/justbuyit-nextjs.git
cd justbuyit-nextjs

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run test` - Run tests

## Testing

The project has unit tests using Vitest and Testing Library. Tests cover:

- Product list rendering
- Search functionality
- Pagination
- Product details page

Run tests with `npm run test`

## Task Requirements

This was the assigned task. Here's what was asked and what I did:

**Main Task - Done:**

- Product list page
- Products fetched from free API
- Search input that filters without page refresh
- Search automatically when user stops typing
- Each product shows: name, price, and category
- Clicking on product redirects to details page
- Product details page shows: name, price, category, and description

**Requirements - Done:**

- Written in TypeScript and React.js
- Responsive design for desktop and mobile

**Bonus - Done:**

- Implemented using Next.js (Bonus)
- Pagination (Bonus)
- Unit tests with @testing-library/react (Bonus)

**Bonus - Not Done:**

- Tailwind CSS or styled-components (Bonus) - I used custom CSS instead

## API Used

**Platzi Fake Store API**  
Base URL: `https://api.escuelajs.co/api/v1`

- `GET /products` - Get all products
- `GET /products/{id}` - Get one product

This is a free public API that anyone can use and modify, so product data might be weird sometimes.

## What's Missing

Some features are just UI (they don't actually work):

- Add to cart button
- Buy now button
- No user login
- No real shopping cart

These weren't part of the task requirements.

## Credits

- useDebounce hook adapted from [this article](https://medium.com/@sankalpa115/usedebounce-hook-in-react-2c71f02ff8d8)
- API from [Platzi Fake Store API](https://fakeapi.platzi.com/)
- Icons from [Remix Icon](https://remixicon.com/)

## Contact

Built by Moulik Arora

Email: moulikarora12@gmail.com
