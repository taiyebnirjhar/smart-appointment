import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const tmLogoSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.7965 7.54919C24.8811 7.54919 26.571 5.85925 26.571 3.77459C26.571 1.68994 24.8811 0 22.7965 0C20.7119 0 19.022 1.68994 19.022 3.77459C19.022 5.85925 20.7119 7.54919 22.7965 7.54919Z"
        fill="#F5F5F5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.7965 16.6068C24.8811 16.6068 26.571 14.9171 26.571 12.8327C26.571 10.7483 24.8811 9.05859 22.7965 9.05859C20.7119 9.05859 19.022 10.7483 19.022 12.8327C19.022 14.9171 20.7119 16.6068 22.7965 16.6068Z"
        fill="#F5F5F5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.7965 25.9984C24.8811 25.9984 26.571 24.3085 26.571 22.2238C26.571 20.1392 24.8811 18.4492 22.7965 18.4492C20.7119 18.4492 19.022 20.1392 19.022 22.2238C19.022 24.3085 20.7119 25.9984 22.7965 25.9984Z"
        fill="#F5F5F5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4034 16.6068C15.4877 16.6068 17.1774 14.9171 17.1774 12.8327C17.1774 10.7483 15.4877 9.05859 13.4034 9.05859C11.3191 9.05859 9.62939 10.7483 9.62939 12.8327C9.62939 14.9171 11.3191 16.6068 13.4034 16.6068Z"
        fill="#F5F5F5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.34581 25.9984C6.43042 25.9984 8.12033 24.3085 8.12033 22.2238C8.12033 20.1392 6.43042 18.4492 4.34581 18.4492C2.2612 18.4492 0.571289 20.1392 0.571289 22.2238C0.571289 24.3085 2.2612 25.9984 4.34581 25.9984Z"
        fill="#F5F5F5"
      />
    </svg>
  );

  const paymentIcons = [
    { src: "/assets/footer/visa.svg", alt: "Visa" },
    { src: "/assets/footer/diners-club.svg", alt: "Diners-Club" },
    { src: "/assets/footer/amex.svg", alt: "American Express" },
    { src: "/assets/footer/discover.svg", alt: "Discover" },
    { src: "/assets/footer/mastercard.svg", alt: "Mastercard" },
    { src: "/assets/footer/stripe.svg", alt: "Stripe" },
    { src: "/assets/footer/paypal.svg", alt: "PayPal" },
    { src: "/assets/footer/apple-pay.svg", alt: "Apple Pay" },
    { src: "/assets/footer/google-pay.svg", alt: "Google Pay" },
  ];

  // social logo
  const FBLogoSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_353_4420)">
        <path
          d="M17.5 0H2.5C1.12125 0 0 1.12125 0 2.5V17.5C0 18.8787 1.12125 20 2.5 20H17.5C18.8787 20 20 18.8787 20 17.5V2.5C20 1.12125 18.8787 0 17.5 0Z"
          fill="#1877F2"
        />
        <path
          d="M16.875 10H13.75V7.5C13.75 6.81 14.31 6.875 15 6.875H16.25V3.75H13.75C11.6788 3.75 10 5.42875 10 7.5V10H7.5V13.125H10V20H13.75V13.125H15.625L16.875 10Z"
          fill="#FAFAFA"
        />
      </g>
      <defs>
        <clipPath id="clip0_353_4420">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const IGLogoSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_353_4426)">
        <path
          d="M1.24976 1.35766C-0.321907 2.99016 -0.000240855 4.72432 -0.000240855 9.99266C-0.000240855 14.3677 -0.763574 18.7535 3.23143 19.786C4.47893 20.1068 15.5323 20.1068 16.7781 19.7843C18.4414 19.3552 19.7948 18.006 19.9798 15.6535C20.0056 15.3252 20.0056 4.66599 19.9789 4.33099C19.7823 1.82516 18.2398 0.380991 16.2073 0.0884908C15.7414 0.0209908 15.6481 0.000990812 13.2581 -0.00317585C4.78059 0.000990812 2.92226 -0.376509 1.24976 1.35766Z"
          fill="url(#paint0_linear_353_4426)"
        />
        <path
          d="M10.0008 2.6126C6.97495 2.6126 4.10162 2.34343 3.00412 5.1601C2.55078 6.32343 2.61662 7.83426 2.61662 9.9976C2.61662 11.8959 2.55578 13.6801 3.00412 14.8343C4.09912 17.6526 6.99578 17.3826 9.99912 17.3826C12.8966 17.3826 15.8841 17.6843 16.995 14.8343C17.4491 13.6593 17.3825 12.1709 17.3825 9.9976C17.3825 7.1126 17.5416 5.2501 16.1424 3.85176C14.7258 2.4351 12.8099 2.6126 9.99745 2.6126H10.0008ZM9.33912 3.94343C15.6508 3.93343 16.4541 3.23176 16.0108 12.9793C15.8533 16.4268 13.2283 16.0484 10.0016 16.0484C4.11828 16.0484 3.94912 15.8801 3.94912 9.99426C3.94912 4.0401 4.41578 3.94676 9.33912 3.94176V3.94343ZM13.9424 5.16926C13.7075 5.16926 13.4822 5.26259 13.3161 5.42872C13.1499 5.59484 13.0566 5.82016 13.0566 6.0551C13.0566 6.29003 13.1499 6.51535 13.3161 6.68147C13.4822 6.8476 13.7075 6.94093 13.9424 6.94093C14.1774 6.94093 14.4027 6.8476 14.5688 6.68147C14.735 6.51535 14.8283 6.29003 14.8283 6.0551C14.8283 5.82016 14.735 5.59484 14.5688 5.42872C14.4027 5.26259 14.1774 5.16926 13.9424 5.16926ZM10.0008 6.2051C9.5028 6.20515 9.0097 6.30329 8.54965 6.49391C8.08959 6.68453 7.67159 6.9639 7.3195 7.31607C6.60842 8.0273 6.20901 8.99187 6.20912 9.9976C6.20923 11.0033 6.60885 11.9678 7.32009 12.6789C8.03132 13.39 8.99589 13.7894 10.0016 13.7893C11.0073 13.7892 11.9718 13.3895 12.6829 12.6783C13.394 11.9671 13.7934 11.0025 13.7933 9.99676C13.7932 8.99104 13.3935 8.02655 12.6823 7.31548C11.9711 6.6044 11.0065 6.20499 10.0008 6.2051ZM10.0008 7.53593C13.2549 7.53593 13.2591 12.4593 10.0008 12.4593C6.74745 12.4593 6.74245 7.53593 10.0008 7.53593Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_353_4426"
          x1="1.28811"
          y1="18.7194"
          x2="19.876"
          y2="2.63181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </linearGradient>
        <clipPath id="clip0_353_4426">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const WhatsappLogoSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_353_4432)">
        <path
          d="M17.2727 0H2.72727C1.22104 0 0 1.22104 0 2.72727V17.2727C0 18.779 1.22104 20 2.72727 20H17.2727C18.779 20 20 18.779 20 17.2727V2.72727C20 1.22104 18.779 0 17.2727 0Z"
          fill="#29A71A"
        />
        <path
          d="M14.4085 5.59201C13.3681 4.54121 11.9864 3.89679 10.5127 3.77499C9.03901 3.65319 7.57029 4.06202 6.37147 4.92774C5.17265 5.79346 4.32266 7.05908 3.97481 8.49631C3.62695 9.93355 3.80414 11.4478 4.47441 12.7659L3.81646 15.9602C3.80963 15.992 3.80944 16.0248 3.81589 16.0567C3.82234 16.0886 3.8353 16.1188 3.85396 16.1454C3.88129 16.1858 3.9203 16.217 3.96578 16.2346C4.01127 16.2523 4.06106 16.2557 4.10851 16.2443L7.23919 15.5022C8.55358 16.1555 10.0571 16.3213 11.4823 15.9701C12.9074 15.6189 14.1618 14.7735 15.0221 13.5842C15.8824 12.395 16.2929 10.9391 16.1806 9.47563C16.0682 8.01214 15.4403 6.63598 14.4085 5.59201ZM13.4324 13.3829C12.7125 14.1008 11.7855 14.5746 10.7821 14.7377C9.77866 14.9008 8.74934 14.7449 7.83919 14.292L7.40282 14.0761L5.48351 14.5306L5.48919 14.5068L5.88691 12.575L5.67328 12.1534C5.20823 11.24 5.04418 10.203 5.20463 9.19069C5.36507 8.17842 5.84178 7.2429 6.56646 6.51814C7.47703 5.60785 8.71187 5.09648 9.99941 5.09648C11.287 5.09648 12.5218 5.60785 13.4324 6.51814C13.4401 6.52704 13.4485 6.53539 13.4574 6.54315C14.3567 7.45578 14.8587 8.68693 14.854 9.96818C14.8493 11.2494 14.3383 12.4769 13.4324 13.3829Z"
          fill="white"
        />
        <path
          d="M13.261 11.9644C13.0258 12.3349 12.6542 12.7883 12.1871 12.9008C11.369 13.0985 10.1133 12.9076 8.55077 11.4508L8.53145 11.4337C7.15759 10.1599 6.80077 9.09965 6.88714 8.25875C6.93486 7.78147 7.33259 7.34966 7.66782 7.06784C7.72082 7.0226 7.78366 6.9904 7.85134 6.9738C7.91901 6.9572 7.98962 6.95666 8.05754 6.97223C8.12545 6.9878 8.18878 7.01905 8.24246 7.06347C8.29614 7.10789 8.33868 7.16426 8.36668 7.22806L8.87236 8.36443C8.90522 8.43811 8.9174 8.51935 8.90759 8.59943C8.89778 8.6795 8.86636 8.7554 8.81668 8.81897L8.561 9.15079C8.50614 9.21931 8.47303 9.30267 8.46595 9.39016C8.45886 9.47764 8.47811 9.56525 8.52123 9.6417C8.66441 9.89284 9.00759 10.2622 9.38827 10.6042C9.81555 10.9906 10.2894 11.344 10.5894 11.4644C10.6697 11.4972 10.7579 11.5052 10.8428 11.4874C10.9277 11.4696 11.0052 11.4267 11.0655 11.3644L11.3621 11.0656C11.4194 11.0091 11.4905 10.9689 11.5684 10.9489C11.6462 10.929 11.728 10.93 11.8053 10.9519L13.0065 11.2928C13.0727 11.3132 13.1334 11.3484 13.184 11.3958C13.2346 11.4432 13.2736 11.5015 13.2982 11.5663C13.3228 11.6311 13.3322 11.7007 13.3257 11.7697C13.3193 11.8387 13.2971 11.9053 13.261 11.9644Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_353_4432">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  return (
    <footer className="bg-[#1E3A8A] text-[#F5F5F5] py-12 px-3 md:px-6 ">
      <div className="max-w-[1432px] container mx-auto md:px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center  mb-12">
          {/* Company Info Section */}
          <div className="flex flex-col items-start w-full lg:w-1/3">
            <span className="flex gap-2 items-center mb-3">
              {tmLogoSvg}
              <p className="text-lg xl:text-[28px] font-bold leading-[135%]">
                TM
              </p>
            </span>
            <Link href={"/"}>
              <h1 className="text-xl xl:text-[36px] leading-[120%] font-bold mb-2 text-[#F5F5F5]">
                Trade Makina
              </h1>
            </Link>
            <p className="text-base lg:text-xl text-[#F5F5F5] leading-[120%] mb-6">
              Trade Makina exports quality pre-owned heavy equipment worldwide,
              delivering reliable machines that meet top industry standards.
            </p>
          </div>

          {/* Links Section */}
          <div className="max-lg:grid max-sm:grid-cols-2 max-lg:grid-cols-3  lg:flex  lg:flex-row  justify-between  gap-3 w-full lg:w-1/2 text-[#F5F5F5] leading-[120%]">
            {/* Quick Links */}
            <div className="flex flex-col">
              <h3 className="text-lg xl:text-2xl font-bold mb-4 md:mb-8">
                Quick Links
              </h3>
              <ul className="space-y-2 xl:space-y-3 text-sm xl:text-base">
                <li>
                  <Link
                    href="/"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/all-ads"
                    className="hover:text-gray-400  transition-colors"
                  >
                    All Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-400  transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-in"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Sign In / Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Others */}
            <div className="flex flex-col">
              <h3 className="text-lg xl:text-2xl font-bold mb-4 md:mb-8">
                Others
              </h3>
              <ul className="space-y-2 xl:space-y-3 text-sm xl:text-base">
                <li>
                  <Link
                    href="/verification"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Apply for Verification
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-gray-400 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stay-safe"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Stay Safe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Blogs and Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div className="flex flex-col max-sm:mt-5">
              <h3 className="text-lg xl:text-2xl font-bold mb-4 md:mb-8">
                Socials
              </h3>
              <ul className="space-y-2 xl:space-y-3 text-sm xl:text-base ">
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 hover:text-gray-400 transition-colors"
                  >
                    {FBLogoSvg} Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 hover:text-gray-400 transition-colors"
                  >
                    {IGLogoSvg} Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 hover:text-gray-400 transition-colors"
                  >
                    {WhatsappLogoSvg} WhatsApp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 text-sm lg:text-base mt-8 bg-[#FFFFFF] text-[#2D2D2D] p-4 rounded-xl">
          <p>
            Copyright ©
            <Link
              href="https://www.zorgitgroup.com/"
              target="_blank"
              className="hover:underline transition-colors"
            >
              Zorg IT
            </Link>
            . All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-gray-600 transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:text-gray-600 transition-colors"
            >
              Terms of use
            </Link>
          </div>
        </div>

        {/* Payment and Legal Text */}
        <div className="flex flex-col mt-10 text-sm text-[#F5F5F5B2] leading-[120%]">
          <span className="flex flex-col lg:flex-row max-lg:text-center  justify-between items-center mb-10">
            <p className="max-lg:mb-3">
              We accept online card payments as well as wire transfers.
            </p>
            <div className="flex flex-wrap gap-1.5 lg:gap-2">
              {paymentIcons.map((icon, index) => (
                <Image
                  key={index}
                  src={icon.src}
                  width={30}
                  height={30}
                  alt={icon.alt}
                />
              ))}
            </div>
          </span>
          <p className="text-justify">
            This is a business communication of MBX M it is not a draft
            agreement or contract within the meaning of Section 1731 of Act No.
            89/2012 Coll., the Civil Code. &quot;Representative example for Low
            installment financing: used vehicle, purchase price (incl. VAT) CZK
            1,004,821 prepayment CZK 440,000, total loan amount CZK 524,021,
            loan term 48 monthly installments, annual interest rate 7.69%, APR
            9.99%, monthly loan installment (incl. --) excl. insurance CZK
            12,294,48th installment CZK 813,555, registration fee at the time of
            full repayment CZK 802, total amount due from the consumer CZK
            609,748. If the loan amount equals or exceeds CZK 250,000, we
            require the arrangement of accident insurance. This type of
            financing can be used for cars up to 7 years old.&quot;
            Representative example for a regular loan: used vehicle, purchase
            price (incl. VAT) CZK 1,004,821, prepayment CZK 440,000, total loan
            amount CZK 524,021, loan term 48 monthly installments, annual
            interest rate 8.15%, APR 8.43%, monthly loan installment excl.
            insurance CZK 12,858, registration fee at the time of full repayment
            CZK 802, total amount payable by the consumer CZK 616,643. If the
            loan amount equals or exceeds CZK 250,000, we require the
            arrangement of accident insurance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
