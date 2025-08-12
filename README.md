# 🚀 Modern Portfolio Website

> A stunning, interactive portfolio website featuring glassmorphism design, particle animations, and cutting-edge web technologies.

![Portfolio Preview](https://img.shields.io/badge/Status-Ready%20to%20Deploy-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🌐 Live Demo

**[View Live Portfolio →](https://kartikeyji17.github.io/portfolio-website-Kartikey)**

## 📸 Preview

*Add screenshot here after deployment*

---

## ✨ Features

### 🎨 Design & UI
- **Glassmorphism Design**: Modern glass-like elements with backdrop blur effects
- **Dynamic Particle System**: Interactive particles that respond to mouse movement
- **Smooth Animations**: Intersection Observer-based animations and transitions
- **Responsive Design**: Looks great on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark color scheme with gradient accents

### 🔥 Interactive Elements
- **Morphing Navigation**: Smooth navigation with active state indicators
- **Floating Code Window**: Animated code snippet display
- **Skill Progress Bars**: Animated skill level indicators
- **Project Cards**: Interactive project showcases with hover effects
- **Contact Form**: Functional contact form with validation
- **Custom Cursor**: Enhanced cursor effects for desktop users

### ⚡ Performance & Accessibility
- **Optimized Loading**: Lazy loading for images and resources
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Reduced Motion Support**: Respects user's motion preferences
- **Mobile Optimized**: Touch-friendly interface for mobile devices

### 🎮 Easter Eggs
- **Konami Code**: Try entering ↑↑↓↓←→←→BA for a surprise!
- **Logo Secret**: Click the logo 5 times quickly
- **Console Messages**: Check the browser console for hidden messages

## 🛠 Customization Guide

### 1. Personal Information

Replace placeholder content in `index.html`:

```html
<!-- Update your name -->
<span class="title-main">Your Name</span>

<!-- Update your role -->
<span class="title-subtitle">Creative Developer</span>

<!-- Update your description -->
<p class="hero-description">Your personal description here...</p>

<!-- Update contact information -->
<p>your.email@example.com</p>
<p>+1 (555) 123-4567</p>
```

### 2. Profile Image

Replace the profile image URL in the about section:

```html
<img src="your-profile-image-url.jpg" alt="Profile">
```

### 3. Projects

Update the project cards with your actual projects:

```html
<div class="project-card">
    <div class="project-image">
        <img src="your-project-image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

### 4. Skills

Modify skill levels in the skills section by updating the `data-level` attribute:

```html
<div class="skill-item" data-level="95">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar">
        <div class="skill-progress"></div>
    </div>
</div>
```

### 5. Social Links

Update social media links throughout the site:

```html
<a href="https://github.com/yourusername" class="social-link">
    <i class="fab fa-github"></i>
</a>
```

### 6. Color Scheme

Customize colors in `styles.css` by modifying CSS custom properties:

```css
:root {
    --primary-color: #6366f1;  /* Change primary color */
    --secondary-color: #ec4899; /* Change secondary color */
    --accent-color: #06b6d4;   /* Change accent color */
}
```

### 7. Logo

Update the logo in the navigation:

```html
<span class="logo">YN</span> <!-- Replace with your initials -->
```

## 🚀 Deployment

### Option 1: GitHub Pages
1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://kartikeyji17.github.io/portfolio-website-Kartikey`

### Option 2: Netlify
1. Create account at [Netlify](https://netlify.com)
2. Drag and drop the portfolio folder to deploy
3. Get instant HTTPS domain

### Option 3: Vercel
1. Create account at [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Auto-deploy on every commit

### Option 4: Traditional Web Hosting
Upload all files to your web hosting provider's public_html folder via FTP.

## 📁 File Structure

```
portfolio-website/
│
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
├── README.md           # This file
│
└── assets/ (optional)
    ├── images/         # Your images
    ├── documents/      # Resume, etc.
    └── icons/          # Custom icons
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)**: Modules, classes, modern APIs
- **Web APIs**: Intersection Observer, Canvas API, Local Storage

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance Features
- Lazy loading images
- Debounced scroll events
- Optimized animations (60fps)
- Compressed assets
- Efficient particle system

## 🎯 SEO Optimization

### Meta Tags (Add to `<head>`)
```html
<meta name="description" content="Your portfolio description">
<meta name="keywords" content="developer, portfolio, web developer">
<meta name="author" content="Your Name">

<!-- Open Graph -->
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Portfolio description">
<meta property="og:image" content="portfolio-preview.jpg">
<meta property="og:url" content="https://yourportfolio.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Name - Portfolio">
<meta name="twitter:description" content="Portfolio description">
<meta name="twitter:image" content="portfolio-preview.jpg">
```

## 🐛 Troubleshooting

### Common Issues

**Particles not showing:**
- Check browser console for JavaScript errors
- Ensure Canvas API is supported

**Animations not working:**
- Check if user has reduced motion preference enabled
- Verify Intersection Observer support

**Mobile layout issues:**
- Test responsive design in browser dev tools
- Check viewport meta tag is present

## 📱 Mobile Optimization

The portfolio is fully responsive and includes:
- Touch-friendly navigation
- Optimized font sizes for mobile
- Mobile-specific interactions
- Performance optimizations for slower connections

## 🔒 Privacy & Analytics

The included analytics system is privacy-friendly:
- No external trackers
- No personal data collection
- Client-side only
- Easy to remove if not needed

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this template!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for placeholder images
- Modern web standards and APIs

---

**Made with ❤️ and lots of ☕**

Happy coding! 🚀

## 💬 Support

If you have questions or need help customizing your portfolio:

1. Check the browser console for any error messages
2. Review this README for customization instructions
3. Test in different browsers and devices
4. Consider the performance tips for optimal loading

Remember to test your portfolio thoroughly before deployment and keep your content updated!
