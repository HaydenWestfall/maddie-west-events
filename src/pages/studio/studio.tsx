import { useGSAP } from "@gsap/react";
import "./studio.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { createGsapAnimation, mweNavigate } from "../../shared/utility";
import { ScrollTrigger } from "gsap/all";
import Angle from "../../assets/angle.svg?react";
import Cross from "../../assets/cross.svg?react";

interface GalleryItem {
  id: number;
  image: string;
  images: string[];
  title: string;
  description: string;
}

interface ReviewItem {
  id: number;
  review: string;
  reviewer: string;
}

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const StudioRoute: React.FC<{ handleNavigation: (path: string) => void }> = ({ handleNavigation }) => {
  const mainSubHeader = useRef<HTMLHeadingElement | null>(null);
  const aboutHeader = useRef<HTMLDivElement | null>(null);
  const aboutContainer = useRef<HTMLDivElement | null>(null);
  const galleryContainer = useRef<HTMLDivElement | null>(null);
  const reviewContainer = useRef<HTMLDivElement | null>(null);
  const contactSection = useRef<HTMLDivElement | null>(null);
  const aestheticContainer = useRef<HTMLDivElement | null>(null);
  const column1 = useRef<HTMLDivElement | null>(null);
  const column2 = useRef<HTMLDivElement | null>(null);

  const galleryHeader = useRef<HTMLDivElement | null>(null);

  // Gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: "/studio/gallery1.jpg",
      images: ["/studio/gallery1.jpg", "/studio/gallery2.jpg", "/studio/gallery3.jpg", "/studio/gallery4.jpg"],
      title: "Hayden + Madison",
      description: "Fall Shoot",
    },
    {
      id: 2,
      image: "/studio/gallery2.jpg",
      images: ["/studio/gallery2.jpg", "/studio/gallery2.jpg", "/studio/gallery2.jpg", "/studio/gallery2.jpg"],
      title: "Sarah + James",
      description: "Spring Session",
    },
    {
      id: 3,
      image: "/studio/gallery3.jpg",
      images: ["/studio/gallery3.jpg", "/studio/gallery3.jpg", "/studio/gallery3.jpg", "/studio/gallery3.jpg"],
      title: "Emma + Friends",
      description: "Group Portrait",
    },
    {
      id: 4,
      image: "/studio/gallery4.jpg",
      images: ["/studio/gallery4.jpg", "/studio/gallery4.jpg", "/studio/gallery4.jpg", "/studio/gallery4.jpg"],
      title: "The Johnson Family",
      description: "Family Session",
    },
  ];

  // Reviews data
  const reviewItems: ReviewItem[] = [
    {
      id: 1,
      review: "The most peaceful, beautiful space we've ever shot in.",
      reviewer: "Cassidy Clark - Photographer",
    },
    {
      id: 2,
      review: "Stillacre Studios transformed our vision into something magical.",
      reviewer: "Emma Rodriguez - Wedding Planner",
    },
    {
      id: 3,
      review: "Natural light like this is impossible to recreate anywhere else.",
      reviewer: "Marcus Thompson - Portrait Artist",
    },
    {
      id: 4,
      review: "Every corner of this studio tells a story worth capturing.",
      reviewer: "Sarah Mitchell - Creative Director",
    },
  ];

  // State for rotating reviews
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // State for gallery modal
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useGSAP(
    () => {
      createGsapAnimation(column1.current, 30, "top 75%", "top 25%", true);
      createGsapAnimation(column2.current, 30, "top 75%", "top 25%", true);
    },
    { scope: aboutContainer }
  );

  // Review rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviewItems.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [reviewItems.length]);

  // Gallery modal handlers
  const openGallery = (galleryIndex: number) => {
    setCurrentGalleryIndex(galleryIndex);
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = "unset"; // Restore scroll
  };

  const nextImage = () => {
    const gallery = galleryItems[currentGalleryIndex];
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gallery.images.length);
  };

  const prevImage = () => {
    const gallery = galleryItems[currentGalleryIndex];
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? gallery.images.length - 1 : prevIndex - 1));
  };

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "Escape":
          closeGallery();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGalleryOpen, currentGalleryIndex]);

  return (
    <main data-barba="wrapper">
      <div data-barba="container" data-barba-namespace="index" className="studio_route">
        <section id="main" className="section-main">
          <img src="/studio/main.jpg" alt="" />
          <div id="title">
            <h6 id="main-subheader" ref={mainSubHeader}>
              PHOTOGRAPHY STUDIO
            </h6>
            <h1 id="main-header">STILLACRE STUDIOS</h1>
          </div>
        </section>

        <section ref={aboutContainer} className="section-about">
          <div className="section-wrapper">
            <div ref={column1} id="section-about-column1" className="section-header">
              <h6 id="section-about-subheader">STILLACRE STUDIOS</h6>
              <h4 id="section-about-header" ref={aboutHeader}>
                Light. Space. Style. The Perfect Setting for Every Session
              </h4>
            </div>
            <div ref={column2} id="section-about-column2">
              <p id="about-maddie-description" className="description justify">
                Nestled among the trees at 9358 Fenner Rd in Ludlow Falls, Ohio, Stillacre Studio offers a one-of-a-kind
                setting designed to bring out the natural beauty in every photo. Surrounded by woods and bathed in soft,
                natural light, the studio’s modern aesthetic creates the perfect backdrop for timeless photography.
                Whether it’s an intimate couple’s session, a fun shoot with friends, or family portraits that feel
                effortlessly genuine, Stillacre Studio provides an atmosphere where every moment feels real.
                <br />
                <br />A private, peaceful escape for your next session. Hidden away from the noise yet easily
                accessible, the studio offers hourly bookings that give you complete freedom to create, connect, and
                capture memories at your own pace. The surrounding nature adds warmth and depth to every image — from
                sunlit portraits to moody, romantic tones. At Stillacre Studio, you’ll find more than just a space to
                take photos — you’ll find a place where moments come alive.
              </p>
            </div>
          </div>
        </section>

        <section ref={galleryContainer} className="section-gallery">
          <div className="section-wrapper">
            <div ref={galleryHeader} id="gallery-header" className="gallery-header">
              <h6 id="gallery-subheader">GALLERIES</h6>
              <h4 id="gallery-header" ref={aboutHeader}>
                Some of Our Favorites
              </h4>
            </div>
            <div className="gallery-wrapper">
              {galleryItems.map((item, index) => (
                <div key={item.id} className="gallery-item" onClick={() => openGallery(index)}>
                  <div className="gallery-image-wrapper">
                    <img src={item.image} alt={`${item.title} - ${item.description}`} />
                  </div>
                  <div className="gallery-info">
                    <h5 className="gallery-title">{item.title}</h5>
                    <p className="gallery-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={aestheticContainer} className="section-aesthetic">
          <div className="section-wrapper">
            <div className="aesthetic-description-wrapper">
              <div ref={galleryHeader} id="aesthetic-header" className="aesthetic-header-wrapper">
                <h6 id="aesthetic-subheader">THE STILL</h6>
                <h4 id="aesthetic-header" ref={aboutHeader}>
                  Perfect for Every Shot.
                </h4>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <p id="aesthetic-description" className="description justify">
                  Tucked away among the trees, Still Acre Studio offers a bright and secluded space surrounded by
                  nature. It’s the perfect setting to capture genuine moments — calm, quiet, and effortlessly beautiful.
                </p>
                <span id="price">$50.00 | hour</span>
              </div>
              <a
                href="/contact"
                className="primary-button medium light"
                onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}
              >
                Book now
              </a>
            </div>
            <img src="/studio/about.jpg" alt="" />
          </div>
        </section>

        <section ref={reviewContainer} className="section-review">
          <div className="section-wrapper">
            <div className="review-content">
              <p className="review-text">"{reviewItems[currentReviewIndex].review}"</p>
              <p className="reviewer-name">{reviewItems[currentReviewIndex].reviewer}</p>
            </div>
          </div>
        </section>

        <section ref={contactSection} className="section-contact">
          <img src="/studio/main.jpg" alt="Stillacre Studios interior" />
          {/* <div className="contact-overlay">
            <a
              href="/contact"
              className="primary-button large light"
              onClick={(e: any) => mweNavigate(e, handleNavigation, "/contact")}
            >
              BOOK YOUR SESSION
            </a>
          </div> */}
        </section>

        {/* Gallery Modal */}
        {isGalleryOpen && (
          <div className="gallery-modal" onClick={closeGallery}>
            <button className="gallery-close" onClick={closeGallery}>
              <Cross width={32} height={32} />
            </button>

            <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="gallery-navigation">
                <button className="gallery-nav-btn gallery-prev" onClick={prevImage}>
                  <Angle width={32} height={32} />
                </button>

                <div className="gallery-image-container">
                  <img
                    src={galleryItems[currentGalleryIndex].images[currentImageIndex]}
                    alt={`${galleryItems[currentGalleryIndex].title} - Image ${currentImageIndex + 1}`}
                  />
                </div>

                <button className="gallery-nav-btn gallery-next" onClick={nextImage}>
                  <Angle width={32} height={32} />
                </button>
              </div>

              <div className="gallery-modal-info">
                <h3 className="gallery-modal-title">{galleryItems[currentGalleryIndex].title}</h3>
                <p className="gallery-modal-description">{galleryItems[currentGalleryIndex].description}</p>
                <div className="gallery-counter">
                  {currentImageIndex + 1} / {galleryItems[currentGalleryIndex].images.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default StudioRoute;
