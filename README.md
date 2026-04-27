# Pantry

Pantry is a UK grocery price comparison app. It lets you build a shopping basket and instantly see which supermarket charges the least for your items. Supported stores include Tesco, Sainsbury's, Aldi, Lidl and Morrisons.

## What it does

You can add products to your basket and compare total costs across stores. The app also supports loyalty card pricing, a store map, recipe to list conversion, price history charts and dietary filters. Everything runs as a progressive web app so it works on mobile without needing an install.

## Live app

https://cm32027groupkpantry.netlify.app/

## Tech stack

The frontend is built with React, TypeScript and Tailwind CSS. The backend uses Supabase for authentication and data storage. The app is deployed on Netlify.

## Getting started

Install dependencies.

```
npm install
```

Start the development server.

```
npm run dev
```

Build for production.

```
npm run build
```

## Environment variables

Create a `.env` file at the root of the project with your Supabase project URL and anon key. These are available in your Supabase project settings.

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
