import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>Cari Buku Yang Kamu Inginkan</h2><br />
                <p className='header-text fs-18 fw-3'>Perpustakaan umum daerah kabupaten bogor menyediakan koleksi buku untuk anda semua, temukan buku yang anda inginkan disini</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header