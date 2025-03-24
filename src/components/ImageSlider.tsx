import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface SliderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  images: string[];
  initialIndex?: number;
}

const ImageSlider = ({
  isOpen,
  setIsOpen,
  images,
  initialIndex = 0,
}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const clickableRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(initialIndex);
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (!clickableRefs.current.some((ref) => ref?.contains(e.target as Node))) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen, initialIndex]);

  if (!isOpen || !images.length) return null;

  const navigate = {
    next: () => setCurrentIndex((idx) => (idx + 1) % images.length),
    prev: () => setCurrentIndex((idx) => (idx - 1 + images.length) % images.length),
    goTo: (idx: number) => idx !== currentIndex && setCurrentIndex(idx),
  };

  // * Mark image as loaded
  const handleImageLoad = () => {
    setLoadedImages((prev) => ({ ...prev, [currentIndex]: true }));
  };

  const isCurrentImageLoaded = loadedImages[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      <div className="relative flex h-full max-h-[1080px] w-full max-w-[1920px] flex-col items-center justify-center gap-4">
        <div className="relative mx-auto flex w-full h-[50%] max-w-[1200px] items-center justify-center md:size-[80%]">
          {!isCurrentImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent">
              <div className="border-icon h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
            </div>
          )}
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1} of ${images.length}`}
            className="max-h-full w-full object-contain"
            ref={(el) => {
              clickableRefs.current[0] = el;
            }}
            onLoad={handleImageLoad}
            style={{ opacity: isCurrentImageLoaded ? 1 : 0.3 }}
          />
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={navigate.prev}
            className="bg-icon/90 hover:bg-icon focus:ring-secondary-200 flex size-fit items-center justify-center rounded-full p-2 text-white shadow-md transition-colors duration-200 focus:ring-2 focus:outline-hidden md:absolute md:top-1/2 md:left-4 md:-translate-y-1/2"
            ref={(el) => {
              clickableRefs.current[1] = el;
            }}
            aria-label="Previous image"
          >
            <IoChevronBack className="size-6 sm:size-8" />
          </button>

          <button
            onClick={navigate.next}
            className="bg-icon/90 hover:bg-icon focus:ring-secondary-200 flex size-fit items-center justify-center rounded-full p-2 text-white shadow-md transition-colors duration-200 focus:ring-2 focus:outline-hidden md:absolute md:top-1/2 md:right-4 md:-translate-y-1/2"
            ref={(el) => {
              clickableRefs.current[2] = el;
            }}
            aria-label="Next image"
          >
            <IoChevronForward className="size-6 sm:size-8" />
          </button>
        </div>

        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-3"
          ref={(el) => {
            clickableRefs.current[3] = el;
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              className={`size-2.5 rounded-full transition-colors duration-200 ${
                currentIndex === index
                  ? "bg-secondary-200"
                  : "bg-secondary-700 hover:bg-secondary-500"
              }`}
              onClick={() => navigate.goTo(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>

        <div
          className="absolute right-4 bottom-4 rounded-full bg-black/40 px-3 py-1 text-sm text-white backdrop-blur-xs"
          ref={(el) => {
            clickableRefs.current[4] = el;
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
