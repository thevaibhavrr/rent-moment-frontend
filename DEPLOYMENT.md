# Deployment Guide for Luxe Rent Couture

## Vercel Deployment

This is a Vite React application that can be deployed to Vercel.

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Environment Variables
Set the following environment variable in your Vercel dashboard:

```
VITE_API_URL=https://cloth-backend-tpce.onrender.com/api
```

### Build Configuration
The project is configured with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Deployment Steps
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the environment variable `VITE_API_URL`
4. Deploy

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

### Troubleshooting
- Ensure the API URL is correctly set in environment variables
- Check that all dependencies are properly installed
- Verify the build output in the `dist` folder
