import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface SliderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  images: string[];
}

const ImageSlider = ({ isOpen, setIsOpen, images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // * Elements that won't close the slider on click
  const clickableRefs = useRef<(HTMLImageElement | HTMLButtonElement | HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      setCurrentIndex(0);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (clickableRefs.current.some((ref) => ref?.contains(target))) return;
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="center fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] backdrop-opacity-85">
      <div className="vstack center relative size-full max-h-[1080px] max-w-[1920px] gap-2">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="mx-auto h-[250px] w-full max-w-[1200px] object-contain md:size-[80%]"
          ref={(el) => (clickableRefs.current[0] = el)}
        />
        <div className="center gap-6">
          <button
            onClick={prevImage}
            className="center size-fit rounded-full bg-icon p-2 text-white md:absolute md:left-4 md:top-1/2"
            ref={(el) => (clickableRefs.current[1] = el)}
          >
            <IoChevronBack className="size-6 sm:size-8" />
          </button>
          <button
            onClick={nextImage}
            className="center size-fit rounded-full bg-icon p-2 text-white md:absolute md:right-4 md:top-1/2"
            ref={(el) => (clickableRefs.current[2] = el)}
          >
            <IoChevronForward className="size-6 sm:size-8" />
          </button>
        </div>
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2"
          ref={(el) => (clickableRefs.current[3] = el)}
        >
          {images.map((_, index) => (
            <button
              key={index}
              className={`size-3 rounded-full ${currentIndex === index ? "bg-secondary-200" : "bg-secondary-700"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
