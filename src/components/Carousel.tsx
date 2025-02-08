import { useState } from "react";

interface IImage {
  name: string;
  id: number;
  imgUrl: string;
}

const images: IImage[] = [
  {
    name: "img_01",
    id: 1,
    imgUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "img_02",
    id: 2,
    imgUrl:
      "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "img_03",
    id: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1667971286579-63a5222780ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
];

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(1);
  const onPrev = () => setActiveImage((prev) => (prev === 1 ? 3 : prev - 1));
  const onNext = () => setActiveImage((prev) => (prev === 3 ? 1 : prev + 1));
  console.log(activeImage);

  return (
    <div className="carousel">
      <ul className="carousel__slides">
        {images.map((image) => (
          <div key={image.id}>
            <input
              type="radio"
              name="radio-buttons"
              id={image.name}
              checked={activeImage === image.id}
              readOnly
            />
            <li className="carousel__slide-container">
              <div className="carousel__slide-img">
                <img src={image.imgUrl} alt={image.name} />
              </div>
              <div className="carousel__controls">
                <label className="carousel__slide-prev" onClick={onPrev}>
                  <span>&lsaquo;</span>
                </label>
                <label className="carousel__slide-next" onClick={onNext}>
                  <span>&rsaquo;</span>
                </label>
              </div>
            </li>
            <div className="carousel__dots">
              {images.map((image) => (
                <label
                  onClick={() => setActiveImage(image.id)}
                  key={image.id}
                  className="carousel__dot"
                  id={`img-dot-${image.id}`}
                />
              ))}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
