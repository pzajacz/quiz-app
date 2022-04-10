import React, {useEffect, useState} from "react";
import Imgix from "react-imgix";

function Gallery() {

  const gallery = {
    galleryTitle : 'Test gallery',
    galleryDescription: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth. Monotonectally maximize highly efficient e-commerce with cooperative action items.',
    images: [
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/1_384.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/1_384.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/2_376.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/2_376.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/3_365.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/3_365.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/1_384.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/4_361.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/2_376.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/5_345.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/3_365.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/6_327.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/1_384.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/2_376.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/2_376.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/1_384.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/3_365.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/3_365.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/1_384.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/6_327.jpg'
      },
      {
        title: 'Proactively leverage existing client-focused testing procedures for enterprise e-business. Appropriately grow empowered quality vectors and inexpensive bandwidth.',
        thumbnail: '../images/gallery/2_376.jpg',
        image: 'https://ujszo.com/sites/default/files/image_gallery_images/2_376.jpg'
      }
    ]
  }

  const [currentImage, setCurrentImage] = useState(0);

  function handlePrev() {
    if (currentImage === 0) {
      setCurrentImage(gallery.images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  }

  function handleNext() {
    if (currentImage === gallery.images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }
  useEffect(()=> {
    console.log('effect');
  })

  return (
    <div className={"galleryWrapper"}>
      <h2>{gallery.galleryTitle}</h2>
      <span onClick={handlePrev}> {"<< Prev"} </span>
      <span onClick={handleNext}>{"Next >>"}</span>
      <div className={"mainImage"}>
        <Imgix
          sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={ gallery.images[currentImage].image }
          imgixParams={{
            fit: "crop",
            fm: "jpg",
            ar: "16:9"
          }}
          alt={ gallery.images[currentImage].title }
        />
        <div className={"title"}>{ gallery.images[currentImage].title }</div>
      </div>
      <div className={"imageList"}>
        {gallery.images.map((image, index)=> {
          return (
            <Imgix
              key={index}
              src={ image.image }
              imgixParams={{
                fit: "crop",
                fm: "jpg",
                ar: "16:9"
              }}
              width={100}
              alt={ gallery.images[currentImage].title }
              htmlAttributes={{
                onClick: ()=>{setCurrentImage(index)},
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Gallery;