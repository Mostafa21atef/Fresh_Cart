import React from 'react'
export default function Footer() {
  return (
    <>
  <footer className="bg-slate-100 border-gray-200 p-4 w-full fixed left-0 bottom-0 right-0">
  <div className="flex flex-col items-center text-center lg:flex-row lg:w-3/4 mx-auto py-5 justify-between">
    {/* Footer Text */}
    <div className="w-full lg:w-auto">
      <h1 className="text-2xl">
        Made by <span className="text-emerald-500">Mostafa Atef</span>
      </h1>
    </div>
    {/* Social Media Links */}
    <div className="flex items-center gap-5 w-full  justify-center lg:w-auto lg:justify-end mt-6 lg:mt-0">
      <a href="https://github.com/Mostafa21atef?tab=repositories">
        <i className="fa-brands fa-github fa-2xl text-emerald-600"></i>
      </a>
      <a href="https://www.linkedin.com/in/mustafa-atef-6b0473249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
        <i className="fa-brands fa-linkedin fa-2xl text-emerald-600"></i>
      </a>
      <a href="https://www.facebook.com/share/151m5rmamE/">
        <i className="fa-brands fa-facebook fa-2xl text-emerald-600"></i>
      </a>
      <a href="https://www.instagram.com/mustafa_">
        <i className="fa-brands fa-instagram fa-2xl text-emerald-600"></i>
      </a>
    </div>
  </div>
</footer>

        </>
  )
}
