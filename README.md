# GariFFon Portfolio Website

A modern, responsive portfolio website showcasing the skills, projects, and professional journey of Gourav Dash (GariFFon).

## Features

- **Modern Design**: Dark gradient theme with color accents and minimalist UI
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Elements**: Smooth animations and transitions using Framer Motion
- **Dynamic Content**: Integration with GitHub API to showcase latest projects
- **Professional Contact Form**: Easy way for visitors to get in touch
- **SEO Optimized**: Built with Next.js for better search engine visibility

## Sections

1. **Home/Landing**: Animated introduction with personal branding
2. **About**: Personal journey, skills, and development philosophy
3. **Projects**: Showcase of portfolio projects with descriptions and links
4. **Timeline**: Education and professional experience
5. **Contact**: Contact form and professional links

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **API Integration**: GitHub API for project showcase

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Customization

To customize the portfolio for your own use:

1. Update personal information in various components
2. Replace project data with your own projects
3. Modify the timeline with your education and experience
4. Update contact information and social links
5. Add your own photos and assets in the public directory

### Adding Images

The portfolio requires several images for personalization:

1. **Profile Photo**: Add your professional headshot to `/public/images/profile.jpg` (recommended size: 400x400px)
2. **Project Screenshots**: Add screenshots of your projects to `/public/images/projects/` directory
   - Name them appropriately: `project-1.jpg`, `project-2.jpg`, etc.
   - Recommended size: 1200x675px (16:9 aspect ratio)
3. **Favicon**: Replace `/app/favicon.ico` with your personalized icon
4. **Open Graph Image**: Add a site preview image at `/public/images/og-image.jpg` for better social media sharing

Example of adding images:

```bash
# Create necessary directories
mkdir -p public/images/projects

# Add your images
cp ~/my-photos/headshot.jpg public/images/profile.jpg
cp ~/my-photos/project-screenshots/*.jpg public/images/projects/
```

## Deployment

This portfolio is optimized for deployment on Vercel:

```bash
npm run build
# or
yarn build
```

Then deploy to your preferred hosting service.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Design inspiration from modern portfolio trends
- Icons from React Icons
- Animation library by Framer Motion 