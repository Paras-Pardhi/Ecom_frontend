// import React from 'react'

// const Footer = () => {
//   return (
//     <footer className='bg-slate-200'>
//       <div className='container mx-auto p-4'>
//        <p className='text-center font-bold' title="Youtube Channel">Dynamic Coding with Amit</p>
//       </div>
//     </footer>
//   )
// }
// export default Footer
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white">
      <div className="max-w-[1700px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {/* ABOUT */}
          <div>
            <p className="text-gray-400 text-lg font-medium mb-4">ABOUT</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Careers</li>
              <li>WhizzCart Stories</li>
              <li>Press</li>
              <li>Corporate Information</li>
            </ul>
          </div>

          {/* GROUP COMPANIES */}
          <div>
            <p className="text-gray-400 text-lg font-medium mb-4">GROUP COMPANIES</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Myntra</li>
              <li>Cleartrip</li>
              <li>Shopshy</li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <p className="text-gray-400 text-lg font-medium mb-4">HELP</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
              <li>Report Infringement</li>
            </ul>
          </div>

          {/* POLICY */}
          <div className="border-r border-gray-500 pr-4">
            <p className="text-gray-400 text-lg font-medium mb-4">Consumer Policy</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
            </ul>
          </div>

          {/* MAIL US */}
          <div className="pl-4">
            <h3 className="text-gray-400 text-lg font-medium mb-4">Mail Us</h3>
            <p className="text-sm">Whizzcart Internet Private Limited,</p>
            <p className="text-sm">Buildings Alyssa, Washington &</p>
            <p className="text-sm">Dummy Embassy Tech Village,</p>
            <p className="text-sm">Outer Ring Road, Devarabeesanahalli Village,</p>
            <p className="text-sm">ABCDEFG, 560012</p>
            <p className="text-sm">XYX, India</p>
          </div>

          {/* REGISTERED OFFICE */}
          <div>
            <h3 className="text-gray-400 text-lg font-medium mb-4">Registered Office Address:</h3>
            <p className="text-sm">Whizzcart Internet Private Limited,</p>
            <p className="text-sm">Buildings Alyssa, Washington &</p>
            <p className="text-sm">Dummy Embassy Tech Village,</p>
            <p className="text-sm">Outer Ring Road, Devarabeesanahalli Village,</p>
            <p className="text-sm">ABCDEFG, 560012</p>
            <p className="text-sm">XYX, India</p>
            <p className="text-sm">CIN : U51109KA2012PTC066107</p>
            <p className="text-sm">
              Telephone:{" "}
              <a href="#" className="underline">022-49253458</a> /{" "}
              <a href="#" className="underline">088-49253458</a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
