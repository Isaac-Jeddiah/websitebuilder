import React, { useState } from 'react';
import  {GripVertical,ChevronDown, ChevronUp,Pin}  from 'lucide-react';
import SegmentedControl from './SegmentedControl';
import Draggable from 'react-draggable'
import { Rnd } from 'react-rnd'
import { createPortal } from 'react-dom';
import { useDropzone } from 'react-dropzone';
const ComponentPalette = ({ onComponentDrop,livePreviewRef  }) => {
  const [selectedSection, setSelectedSection] = useState('Templates');
  const [isPinned, setIsPinned] = useState(false);
  
  const [localAssets, setLocalAssets] = useState(() => {
    const savedAssets = localStorage.getItem('localAssets');
    return savedAssets ? JSON.parse(savedAssets) : [];
  });
  // Tracks if the overlay is pinned
    const [components] = useState({
        headers: [
          {
            id: 'header1',
            type: 'Event Logo Header',
            template: `
<header class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" data-edit-key="eventName">EventName</a>
    </div>
</header>`,
            editableTexts: {
                eventName: 'EventName'
            }
        },
            {
                id: 'header2',
                type: 'Nav Header with Event Details',
                template: `
<header class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl">EventName</a>
        <nav>
            <ul class="menu menu-horizontal px-1">
                <li><a>Home</a></li>
                <li><a>Agenda</a></li>
                <li><a>Speakers</a></li>
                <li><a>Contact</a></li>
            </ul>
        </nav>
    </div>
</header>`
            },
            {
                id: 'header3',
                type: 'Search Header for Event Sessions',
                template: `
<header class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl">EventName</a>
    </div>
    <div class="flex-none gap-2">
        <div class="form-control">
            <input type="text" placeholder="Search sessions" class="input input-bordered w-24 md:w-auto"/>
        </div>
    </div>
</header>`
            },
            {
                id: 'header4',
                type: 'Dropdown Header for Event Categories',
                template: `
<header class="navbar bg-base-100">
    <div class="dropdown">
        <button class="btn btn-ghost lg:hidden">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
        </button>
        <ul tabindex="0" class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Schedule</a></li>
            <li><a>Speakers</a></li>
            <li><a>Tickets</a></li>
        </ul>
    </div>
</header>`
            },
            {
                id: 'header5',
                type: 'Centered Header for Event Branding',
                template: `
<header class="navbar bg-base-100 justify-center">
    <div class="flex-1 justify-center">
        <a class="btn btn-ghost text-xl">EventName</a>
    </div>
</header>`
            }
        ],
        heroes: [
            {
                id: 'hero1',
                type: 'Event Welcome Hero',
                template: `
<div class="hero min-h-[400px] bg-base-200">
    <div class="hero-content text-center">
        <h1 class="text-5xl font-bold">Welcome to EventName</h1>
        <p class="py-6">Join us for an unforgettable experience. Explore sessions, network, and gain insights.</p>
    </div>
</div>`
            },
            {
                id: 'hero2',
                type: 'Image Hero with Event Highlights',
                template: `
<div class="hero min-h-[400px]" style="background-image: url('https://source.unsplash.com/random/800x400?event');">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">Discover Event Highlights</h1>
            <p class="py-6">Join us for engaging talks, workshops, and more.</p>
        </div>
    </div>
</div>`
            },
            {
                id: 'hero3',
                type: 'Event Call-to-Action Hero',
                template: `
<div class="hero min-h-[400px] bg-base-200">
    <div class="hero-content">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">Register Now</h1>
            <p class="py-6">Don't miss out on the opportunity to be part of this exciting event.</p>
            <button class="btn btn-primary">Get Tickets</button>
        </div>
    </div>
</div>`
            },
            {
                id: 'hero4',
                type: 'Event Speakers Highlight Hero',
                template: `
<div class="hero min-h-[400px] bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
        <img src="https://images.pluto.tv/channels/6675c7868768aa0008d7f1c7/featuredImage.jpg?auto=&q=70&fit=fill&fill=blur&ixlib=react-9.1.5" class="max-w-sm rounded-lg shadow-2xl" alt="Speaker"/>
        <div>
            <h1 class="text-5xl font-bold">Meet Our Speakers</h1>
            <p class="py-6">Learn from industry leaders and innovators.</p>
        </div>
    </div>
</div>`
            },
            {
                id: 'hero5',
                type: 'Event Countdown Hero',
                template: `
<div class="hero min-h-[400px] bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">Countdown to EventName</h1>
            <p class="py-6">Mark your calendar. The event starts in:</p>
            <div class="flex justify-center space-x-4">
                <div class="text-3xl">10</div><span>Days</span>
                <div class="text-3xl">5</div><span>Hours</span>
                <div class="text-3xl">30</div><span>Minutes</span>
            </div>
        </div>
    </div>
</div>`
            }
        ]
    ,
        body: [
    {
      id: 'body1',
      type: 'Features Grid',
      template: `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div class="card bg-base-100 shadow-xl">
            <figure><img src="https://images.pluto.tv/channels/6675c7868768aa0008d7f1c7/featuredImage.jpg?auto=&q=70&fit=fill&fill=blur&ixlib=react-9.1.5" alt="Feature 1"></figure>
            <div class="card-body">
              <h2 class="card-title">Elegant Venues</h2>
              <p>Discover amazing locations to host your events.</p>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <figure><img src="https://images.pluto.tv/channels/6675c7868768aa0008d7f1c7/featuredImage.jpg?auto=&q=70&fit=fill&fill=blur&ixlib=react-9.1.5" alt="Feature 2"></figure>
            <div class="card-body">
              <h2 class="card-title">Breathtaking Scenery</h2>
              <p>Capture unforgettable moments in stunning surroundings.</p>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <figure><img src="https://images.pluto.tv/channels/6675c7868768aa0008d7f1c7/featuredImage.jpg?auto=&q=70&fit=fill&fill=blur&ixlib=react-9.1.5" alt="Feature 3"></figure>
            <div class="card-body">
              <h2 class="card-title">Unforgettable Events</h2>
              <p>Organize events that leave a lasting impression.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'body5',
      type: 'Gallery',
      template: `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <img src="/sample.png" alt="Gallery Image 1" class="rounded">
          <img src="/sample.png" alt="Gallery Image 2" class="rounded">
          <img src="/sample.png" alt="Gallery Image 3" class="rounded">
          <img src="/sample.png" alt="Gallery Image 4" class="rounded">
        </div>
      `
    },
    {
      id: 'body9',
      type: 'Card Grid',
      template: `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div class="card bg-base-100 shadow-xl">
            <figure><img src="/sample.png" alt="Card 1"></figure>
            <div class="card-body">
              <h2 class="card-title">Professional Conferences</h2>
              <p>Host your next big meeting with ease.</p>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <figure><img src="/sample.png" alt="Card 2"></figure>
            <div class="card-body">
              <h2 class="card-title">Festivals & Celebrations</h2>
              <p>Make every festival a memory to cherish.</p>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <figure><img src="/sample.png" alt="Card 3"></figure>
            <div class="card-body">
              <h2 class="card-title">Music Events</h2>
              <p>Bring the rhythm to life with our music events.</p>
            </div>
          </div>
        </div>
      `
    }
  ],
        contact: [
    {
      id: 'contact1',
      type: "contact 1",
      template: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div>
            <h2 class="text-2xl font-bold mb-4">Get in Touch</h2>
            <form class="bg-base-100 shadow-lg p-6 rounded">
              <label class="block mb-2">Name</label>
              <input type="text" class="input input-bordered w-full mb-4" placeholder="Your Name">
              <label class="block mb-2">Email</label>
              <input type="email" class="input input-bordered w-full mb-4" placeholder="Your Email">
              <label class="block mb-2">Message</label>
              <textarea class="textarea textarea-bordered w-full mb-4" placeholder="Your Message"></textarea>
              <button type="submit" class="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Our Address</h3>
            <p>123 Event Road</p>
            <p>Cityville, Country</p>
            <p>Email: contact@example.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
      `,
    },
    {
      id: 'contact2',
      type: "contact 2",
      template: `
        <div class="relative w-full h-96">
          <iframe class="absolute inset-0 w-full h-full rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509618!2d144.95565141531878!3d-37.81720927975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sVictoria!5e0!3m2!1sen!2sau!4v1643247602753!5m2!1sen!2sau" allowfullscreen loading="lazy"></iframe>
          <div class="absolute bottom-4 left-4 bg-white p-4 shadow-xl rounded w-1/2">
            <h2 class="text-xl font-bold mb-2">Contact Us</h2>
            <form>
              <input type="text" class="input input-bordered w-full mb-4" placeholder="Your Name">
              <input type="email" class="input input-bordered w-full mb-4" placeholder="Your Email">
              <textarea class="textarea textarea-bordered w-full mb-4" placeholder="Your Message"></textarea>
              <button type="submit" class="btn btn-primary w-full">Submit</button>
            </form>
          </div>
        </div>
      `,
    },
    {
      id: 'contact3',
      type: "conatcat 3",
      template: `<div class="p-6">
  <h2 class="text-2xl font-bold mb-4 text-center">Drop Us a Line</h2>
  <form class="bg-base-200 shadow-lg p-6 rounded w-full max-w-lg mx-auto">
    <label class="block mb-2">Full Name</label>
    <input type="text" class="input input-bordered w-full mb-4" placeholder="Your Full Name">
    <label class="block mb-2">Email Address</label>
    <input type="email" class="input input-bordered w-full mb-4" placeholder="Your Email">
    <label class="block mb-2">Phone Number</label>
    <input type="text" class="input input-bordered w-full mb-4" placeholder="Your Phone Number">
    <label class="block mb-2">Message</label>
    <textarea class="textarea textarea-bordered w-full mb-4" placeholder="Your Message"></textarea>
    <button type="submit" class="btn btn-accent w-full">Send Message</button>
  </form>
</div>
`,}
    // Add other contact templates here...
  ],
  footer: [
    {
      id: 'footer1',
      template: "festival",
      html: `
        <footer class="footer p-10 bg-base-200 text-base-content">
          <div>
            <h3 class="footer-title">About Us</h3>
            <p>We create unforgettable event experiences tailored to your needs.</p>
          </div>
          <div>
            <h3 class="footer-title">Quick Links</h3>
            <a class="link link-hover">Home</a>
            <a class="link link-hover">Gallery</a>
            <a class="link link-hover">Contact</a>
            <a class="link link-hover">FAQ</a>
          </div>
          <div>
            <h3 class="footer-title">Follow Us</h3>
            <a class="link link-hover">Facebook</a>
            <a class="link link-hover">Twitter</a>
            <a class="link link-hover">Instagram</a>
          </div>
        </footer>
      `,
    },
    {
      id: 'footer2',
      type: 'festival 1',
      template: `
        <footer class="footer items-center p-10 bg-base-300 text-center text-base-content">
          <div>
            <p>&copy; 2025 EventPro. All rights reserved.</p>
            <p>Powered by Passion and Innovation</p>
          </div>
        </footer>
      `,
    },
     {
      id: 'footer3',
      type: 'festival 12',
      template: `
<footer class="footer p-10 bg-primary text-primary-content">
  <div class="text-center">
    <h3 class="text-2xl font-bold">Ready to Plan Your Next Event?</h3>
    <button class="btn btn-accent mt-4">Contact Us Today</button>
  </div>
</footer>

      `,
    },
    // Add other footer templates here...

  ],
        maps: [
            {
                id: 'map1',
                type: 'Basic Map',
                template: `<div class="w-full h-96 rounded-lg overflow-hidden">
                    <iframe class="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926!3d48.8583736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1644834642285!5m2!1sen!2sus" loading="lazy"></iframe>
                </div>`
            },
            {
                id: 'map2',
                type: 'Map with Coordinates',
                template: `<div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Location</h2>
                        <div class="form-control">
                            <label class="label"><span>Latitude</span></label>
                            <input type="text" placeholder="48.8583736" class="input input-bordered"/>
                            <label class="label"><span>Longitude</span></label>
                            <input type="text" placeholder="2.2922926" class="input input-bordered"/>
                        </div>
                        <div class="w-full h-64 mt-4 rounded-lg overflow-hidden">
                            <iframe class="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926!3d48.8583736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1644834642285!5m2!1sen!2sus" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>`
            }
        ],

        forms: [
            {
                id: 'form1',
                type: 'Contact Form',
                template: `<div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Contact Us</h2>
                        <form class="space-y-4">
                            <div class="form-control">
                                <label class="label"><span>Name</span></label>
                                <input type="text" placeholder="John Doe" class="input input-bordered"/>
                            </div>
                            <div class="form-control">
                                <label class="label"><span>Email</span></label>
                                <input type="email" placeholder="john@example.com" class="input input-bordered"/>
                            </div>
                            <div class="form-control">
                                <label class="label"><span>Message</span></label>
                                <textarea class="textarea textarea-bordered h-24" placeholder="Your message here"></textarea>
                            </div>
                            <button class="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>`
            },
            {
                id: 'form2',
                type: 'Login Form',
                template: `<div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Login</h2>
                        <form class="space-y-4">
                            <div class="form-control">
                                <label class="label"><span>Email</span></label>
                                <input type="email" placeholder="email@example.com" class="input input-bordered"/>
                            </div>
                            <div class="form-control">
                                <label class="label"><span>Password</span></label>
                                <input type="password" class="input input-bordered"/>
                            </div>
                            <button class="btn btn-primary w-full">Login</button>
                        </form>
                    </div>
                </div>`
            }
        ],

        testimonials: [
            {
                id: 'testimonial1',
                type: 'Single Testimonial',
                template: `<div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex items-center space-x-4">
                            <div class="avatar">
                                <div class="w-16 rounded-full">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar"/>
                                </div>
                            </div>
                            <div>
                                <h3 class="font-bold">John Doe</h3>
                                <div class="rating rating-sm">
                                    <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
                                    <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
                                    <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
                                    <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
                                    <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
                                </div>
                            </div>
                        </div>
                        <p class="mt-4">"Absolutely amazing service! The team went above and beyond my expectations."</p>
                    </div>
                </div>`
            }
        ],

        pricing: [
            {
                id: 'pricing1',
                type: 'Simple Pricing',
                template: `<div class="card bg-base-100 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="text-2xl font-bold">Pro Plan</h2>
                        <div class="text-4xl font-bold my-4">$29<span class="text-sm font-normal">/month</span></div>
                        <ul class="space-y-2">
                            <li>✓ Feature 1</li>
                            <li>✓ Feature 2</li>
                            <li>✓ Feature 3</li>
                        </ul>
                        <button class="btn btn-primary mt-6">Get Started</button>
                    </div>
                </div>`
            }
        ],

        cta: [
            {
                id: 'cta1',
                type: 'Full Width CTA',
                template: `<div class="bg-primary text-primary-content p-12 text-center">
                    <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
                    <p class="mb-6">Join thousands of satisfied customers today.</p>
                    <button class="btn btn-secondary">Get Started</button>
                </div>`
            }
        ],

        ecommerce: [
            {
                id: 'product1',
                type: 'Product Card',
                template: `<div class="card bg-base-100 shadow-xl">
                    <figure><img src="/sample.png" alt="Product"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">Product Name</h2>
                        <p>Product description goes here.</p>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-2xl font-bold">$99.99</span>
                            <button class="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>`
            }
        ],

        
    });
    //assets want to develop and put it in here
    const predefinedAssets = [
      { 
        id: 'asset-1', 
        type: 'Image', 
        src: 'https://tse2.mm.bing.net/th?id=OIP.B39-1EvwOFXOffOfIKZT0AHaEK&pid=Api&P=0&h=180',
        template: `<img src="https://tse2.mm.bing.net/th?id=OIP.B39-1EvwOFXOffOfIKZT0AHaEK&pid=Api&P=0&h=180" alt="Predefined Image" />`
      },
      { 
        id: 'asset-2', 
        type: 'Video', 
        src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        template: `<video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls></video>`
      },
      // { 
      //   id: 'asset-3', 
      //   type: 'Custom', 
      //   src: 'https://tse2.mm.bing.net/th?id=OIP.B39-1EvwOFXOffOfIKZT0AHaEK&pid=Api&P=0&h=180',
      //   template: `
      //     <div class="custom-3d-block">
      //       <!-- HTML content for 3D block -->
      //     </div>
      //     <style>
      //       /* CSS content for 3D block */
      //     </style>
      //     <script>
      //       // JavaScript content for 3D block
      //     </script>
      //   `
      // }
      ];
    const templates = [
      {
        id: 'landing-template',
        name: 'Landing Page',
        description: 'A complete landing page with hero, features, and CTA',
        preview: 'https://tse4.mm.bing.net/th?id=OIP.YNoM71xaLB3sxbQHc4RCYAHaFs&pid=Api&P=0&h=180',
        components: ['header1', 'hero1', 'body1', 'contact1', 'footer1']
      },
      {
        id: 'event-template',
        name: 'Event Page',
        description: 'Perfect for conferences and meetups',
        preview: 'https://tse4.mm.bing.net/th?id=OIP.YNoM71xaLB3sxbQHc4RCYAHaFs&pid=Api&P=0&h=180',
        components: ['header2', 'hero2', 'body5', 'contact2', 'footer2']
      }
    ];

    
    // const handleComponentClick = (component) => {
    //     onComponentDrop(component);
    // };

    const [activeOverlay, setActiveOverlay] = useState(null); // Tracks the active overlay
{/**handle pin for  */}
    const handlePinToggle = () => {
      setIsPinned(!isPinned);
    };
  const handleOverlayToggle = (category) => {
    setActiveOverlay(activeOverlay === category ? null : category);
  };

{/**handle drop files for assets */}
  const handleDrop = (files) => {
    const uploadedAssets = files.map((file) => {
      const url = URL.createObjectURL(file);
      const newComponent = {
        id: `${file.type.split('/')[0]}-${Date.now()}`,
        type: 'asset',
        src: url,
        template: file.type.split('/')[0] === 'image'
          ? `<img src="${url}" alt="Uploaded Image" />`
          : `<video src="${url}" controls></video>`
      };
      return newComponent;
    });
    const updatedAssets = [...localAssets, ...uploadedAssets];
    setLocalAssets(updatedAssets);
    localStorage.setItem('localAssets', JSON.stringify(updatedAssets));
  };
{/**convert assets to components */}
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });
  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
    onComponentDrop(component);
};
{/**render overlay for components selection*/}
const renderOverlay = (category, items) => {
  const overlayContent = (
    <Rnd
      default={{
        y:1250,
        width: 300,
        height: window.innerHeight / 1.5,
      }}
      
      enableResizing={false}
      disableDragging={true}
      className="sticky z-50 bg-base-100 shadow-lg p-4 overflow-y-auto border-2 border-base-content/10 rounded-3xl"
      style={{ backgroundColor: 'rgba(81, 80, 162, 0.9)', scrollbarWidth: 'none' }}
    >
      <div 
          style={{backgroundColor:'rgba(81, 80, 162, 0.9)',}} className=" mb-4 sticky top-0 z-50">
        <button 
          className="btn btn-sm btn-primary "
          
          style={{backgroundColor:'rgba(235, 44, 44, 0.9)',}}
          onClick={() => handleOverlayToggle(category)}
        >
          Close
        </button>
        {/* <button 
          className={`btn btn-sm ${isPinned ? 'btn-secondary' : 'btn-primary'}`}
          onClick={handlePinToggle}
        >
          <Pin />
        </button> */}
      </div>
      {/**my predefined components in a list */}
      {items.map((comp) => (
        <div
          key={comp.id}
          draggable
          onDragStart={(e) => handleDragStart(e, comp)}
          onClick={() => onComponentDrop(comp)}
          className="flex flex-col items-center gap-3 p-3 bg-base-200 rounded-lg mb-4"
        >
          <div className="bg-base-300 p-2 rounded-lg">
            <img src="https://static.wixstatic.com/media/72c0b2_4b28e59db27945fab192808be7ce5f18~mv2.jpg/v1/fill/w_1000,h_571,al_c,q_85,usm_0.66_1.00_0.01/72c0b2_4b28e59db27945fab192808be7ce5f18~mv2.jpg" alt={comp.type} className="w-24 h-16 object-cover rounded-lg" />
          </div>
          <span className="text-sm">{comp.type}</span>
        </div>
      ))}
    </Rnd>
  );
{/**create portal package used for internal backend to transfer files or data between components */}
  return createPortal(overlayContent, livePreviewRef.current);
};

    const renderContent = () => {
      switch (selectedSection) {
      /**update the template in js function to show components as group */
        case 'Templates':
          return (
            <div className="grid grid-cols-1 gap-4 p-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="group relative bg-base-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-base-content">{template.name}</h3>
                    <p className="text-sm text-base-content/70 mt-1">{template.description}</p>
                  </div>
                  <button  className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 btn btn-sm btn-primary">
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          );
        
        case 'Pages':
          
        return (
          <div className="space-y-6 p-4">
            {Object.entries(components).map(([category, items]) => (
              <div key={category} className="relative">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleOverlayToggle(category)}
                >
                  <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
                    {category}
                  </h3>
                  {activeOverlay === category ? <ChevronUp /> : <ChevronDown />}
                </div>
                {activeOverlay === category && renderOverlay(category, items)}
              </div>
            ))}
          </div>
        );
        
          case 'Assets':
            
        return (
          <div className="space-y-6 p-4">
            <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider">Predefined Assets</h3>
            {predefinedAssets.map((asset) => (
              <div
                key={asset.id}
                draggable
                onDragStart={(e) => handleDragStart(e, asset)}
                className="flex items-center gap-3 p-3 bg-base-100 rounded-lg hover:bg-base-200 cursor-move group"
              >
                <div className="bg-base-300 p-2 rounded-lg">
                  {asset.type === 'Image' && (
                    <img src={asset.src} alt={asset.type} className="w-24 h-16 object-cover rounded-lg" />
                  )}
                  {asset.type === 'Video' && (
                    <video src={asset.src} className="w-24 h-16 object-cover rounded-lg" controls />
                  )}
                </div>
                <span className="text-sm">{asset.type}</span>
              </div>
            ))}
            <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider">Local Assets</h3>
            {localAssets.map((asset) => (
              <div
                key={asset.id}
                draggable
                onDragStart={(e) => handleDragStart(e, asset)}
                className="flex items-center gap-3 p-3 bg-base-100 rounded-lg hover:bg-base-200 cursor-move group"
              >
                <div className="bg-base-300 p-2 rounded-lg">
                  {asset.type === 'Image' && (
                    <img src={asset.src} alt={asset.type} className="w-24 h-16 object-cover rounded-lg" />
                  )}
                  {asset.type === 'Video' && (
                    <video src={asset.src} className="w-24 h-16 object-cover rounded-lg" controls />
                  )}
                </div>
                <span className="text-sm">{asset.type}</span>
              </div>
            ))}
            <div {...getRootProps()} className="mt-4 p-4 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300">
              <input {...getInputProps()} />
              <p>Drag & drop files here, or click to select files</p>
            </div>
          </div>
        );

      

        default:
            return null;
    
      }
    };
  
    return (
      <div className="flex flex-col h-full">
        <div className="p-4">
          <SegmentedControl 
            selected={selectedSection} 
            onSelect={setSelectedSection} 
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    );
  };
  
  export default ComponentPalette;