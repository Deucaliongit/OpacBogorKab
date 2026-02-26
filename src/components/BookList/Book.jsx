import React from 'react';
import { Link } from 'react-router-dom';
import "./BookList.css";

const Book = (book) => {
  const handleImageError = (e) => {
    e.target.src = "https://perpustakaanbijogja.id/_adm/file_upload/sampul/no-image.jpg";
  };
  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        <img src = {book.cover_img} alt = "cover" onError={handleImageError}/>
      </div>
      <div className='book-item-info text-center'>
        <Link to = {`/book/${book.id}`} {...book}>
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{book.title}</span>
          </div>
        </Link>

        {/* <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Author: </span>
         <span>
            {Array.isArray(book?.author)
              ? book.author.join(", ")
              : "Unknown"}
          </span>
        </div> */}
        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Author: </span>
          <span>
            {/* Perbaikan di sini: Cek jika Array, jika bukan tampilkan langsung stringnya */}
            {Array.isArray(book?.author) 
              ? book.author.join(", ") 
              : (book.author || "Unknown")}
          </span>
        </div>

        <div className='book-item-info-item edition-count fs-15'>
          <span className='text-capitalize fw-7'>Total Editions: </span>
          <span>{book.edition_count}</span>
        </div>

        <div className='book-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>First Publish Year: </span>
          <span>{book.first_publish_year}</span>
        </div>
      </div>
    </div>
  )
}

export default Book