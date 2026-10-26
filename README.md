# AVERMONTIS Store

A responsive premium skincare storefront starter built with Next.js, TypeScript and Lucide icons.

## Run locally
1. Install Node.js 20 or newer.
2. In this folder run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Current scope
- Responsive homepage and product catalog
- Search and category filters
- Add/remove products in a client-side cart
- Mobile navigation and simple cart drawer
- Black, forest-green and ivory brand palette

## Not yet connected
This is a storefront prototype. Checkout, login, stock, tax calculation, GST invoices, database persistence, shipping and Razorpay are not live. Do not accept real payments until server-side order creation, Razorpay signature/webhook verification, idempotency and production configuration have been implemented and tested.

## Security
- Never commit `.env` files or secret credentials.
- Browser-visible `NEXT_PUBLIC_*` variables must never contain secrets.
- Server must calculate prices and enforce inventory, roles and ownership before orders/payments are enabled.
