# Tesseract

A next-generation Web3 donation matching platform powered by Solana and USDC, enabling transparent and automated donation matching campaigns.

![preview](https://github.com/user-attachments/assets/27951334-afc1-4606-a302-7719a2bfe90b)


## Features

### For Donors
- Seamless donation experience with both crypto and credit card options
- Real-time donation matching visualization
- Transaction history and impact tracking
- Connect with Solana wallet or create an email account

### For Campaign Creators
- Easy campaign creation and management
- Automated donation matching system
- Real-time analytics and reporting
- Customizable campaign pages with rich media support

### Technical Features
- Built on Solana blockchain for fast, low-cost transactions
- USDC integration for stable value transfer
- Modern, gradient-based UI with responsive design
- Secure wallet connection and authentication system

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Solana, USDC
- **Authentication**: Hybrid system (Wallet + Email)
- **Payment Processing**: CandyPay integration

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm
- Solana CLI tools
- A Solana wallet (Phantom recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tesseract.git
cd tesseract
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_ENDPOINT=your-rpc-endpoint
NEXT_PUBLIC_CANDY_PAY_API_KEY=your-api-key
```

5. Run the development server:
```bash
yarn dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
tesseract/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components
├── lib/                   # Utility functions and configs
├── styles/                # Global styles and Tailwind config
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Design System

### Brand Colors

```css
/* Primary Brand Gradient */
background: linear-gradient(to right, #2E3192, #1CADD9);

/* Secondary Gradient */
background: linear-gradient(to right, #7B61FF, #00F0FF);

/* Accent Gradient */
background: linear-gradient(to right, #0E33FF, #00FFEB);
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## Security

If you discover any security-related issues, please email security@tesseract.com instead of using the issue tracker.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with inspiration from [Stockpile](https://www.stockpile.pro/)
- Uses [CandyPay](https://docs.candypay.fun/) for payment processing
- Community contributions and feedback

## Contact

- Website: [tesseract.com](https://tesseract.com)
- Twitter: [@TesseractDonate](https://twitter.com/TesseractDonate)
- Email: hello@tesseract.com

---

Author: @virjilakrum
