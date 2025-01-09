// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="w-full h-auto bg-slate-800 overflow-hidden flex flex-col justify-center items-center p-[30px] gap-5 lg:flex-row lg:gap-[60px] lg:p-[60px]">
    {/* Ícones */}
    <div className="w-[136px] h-[34.46px] relative ">
        <div className="w-[34px] h-[34px] left-0 top-0 absolute">
            <div className="w-[34px] h-[34px] left-0 top-0 absolute bg-white rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)]" />
            <div className="w-3 h-3 left-[11px] top-[11px] absolute overflow-hidden group " ><a href="https://www.facebook.com/?locale=pt_BR"target='_blank' ><img src="/public/images/facebook-1.jpg" alt=""className="w-full grayscale lg:group-hover:grayscale-0 transition duration-300 "  /></a> </div> 
        </div>
        <div className="w-[34px] h-[34px] left-[50px] top-0 absolute">
            <div className="w-[34px] h-[34px] left-0 top-0 absolute bg-white rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)]" />
            <div className="w-[13px] h-[13px] left-[11px] top-[10px] absolute overflow-hidden lg:hover: group"  ><a href="https://www.instagram.com/" target='_blank' ><img src="/public/images/instagram-1.jpg" alt="" className="w-full grayscale lg:group-hover:grayscale-0 transition duration-300 "  /></a> </div>
        </div>
        <div className="w-[34px] h-[34px] left-[102px] top-[0.46px] absolute">
            <div className="w-[34px] h-[34px] left-0 top-0 absolute bg-white rounded-full shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)]" />
            <div className="w-[11px] h-[11px] left-[11px] top-[11px] absolute overflow-hidden group" > <a href="https://www.linkedin.com/" target='_blank' ><img src="/public/images/linkedin-1.jpg" alt="" className="w-full grayscale lg:group-hover:grayscale-0 transition duration-300"  /></a></div>
        </div>
    </div>

    {/* Textos */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-5">
        <div className="text-center text-white text-sm md:text-lg lg:text-xl font-normal font-['Roboto'] leading-7">
            © 2024 Project Manager. All rights reserved.
        </div>
        <div className="text-center text-white text-sm md:text-lg lg:text-xl font-normal font-['Roboto'] leading-7">
            Privacy Policy
        </div>
        <div className="text-center text-white text-sm md:text-lg lg:text-xl font-normal font-['Roboto'] leading-7">
            Terms of Service
        </div>
    </div>
</div>
  );
};

export default Footer;
