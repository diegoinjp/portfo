import { useEffect, useState } from "preact/hooks";

function Carousel() {
  const loopCount = 6
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % loopCount)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    // image carousel
    <div className="relative overflow-hidden w-full">
      <div style={{ 
        transform: `translateX(-${currentIndex * 100}%)`,
       }} className="flex transition-transform ease-in-out duration-300">
        {Array.from({ length: loopCount }, (_, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img
              className="rounded-lg object-cover object-center shadow-lg lg:block w-full h-[400px] lg:h-full"
              src={`profile${index + 1}.webp`}
              alt={`Profile ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel;
