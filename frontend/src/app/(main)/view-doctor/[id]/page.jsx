import React from 'react';

const ViewDoctor = () => {
    return (
        <div>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        .work-sans {
                            font-family: 'Work Sans', sans-serif;
                        }
                        #menu-toggle:checked + #menu {
                            display: block;
                        }
                        .hover\\:grow {
                            transition: all 0.3s;
                            transform: scale(1);
                        }
                        .hover\\:grow:hover {
                            transform: scale(1.02);
                        }
                        .carousel-open:checked + .carousel-item {
                            position: static;
                            opacity: 100;
                        }
                        .carousel-item {
                            -webkit-transition: opacity 0.6s ease-out;
                            transition: opacity 0.6s ease-out;
                        }
                        #carousel-1:checked ~ .control-1,
                        #carousel-2:checked ~ .control-2,
                        #carousel-3:checked ~ .control-3 {
                            display: block;
                        }
                        .carousel-indicators {
                            list-style: none;
                            margin: 0;
                            padding: 0;
                            position: absolute;
                            bottom: 2%;
                            left: 0;
                            right: 0;
                            text-align: center;
                            z-index: 10;
                        }
                        #carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
                        #carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
                        #carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {
                            color: #000;
                        }
                    `,
                }}
            />
            <nav id="header" className="w-full z-30 top-0 py-1">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
                    <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
                        <svg
                            className="fill-current text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                        >
                            <title>menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </label>
                    <input className="hidden" type="checkbox" id="menu-toggle" />
                    <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
                        <nav>
                            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                                <li>
                                    <a
                                        className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                                        href="javascript:void(0)"
                                    >
                                        Shop
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                                        href="javascript:void(0)"
                                    >
                                        About
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="order-1 md:order-2">
                        <a
                            className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
                            href="javascript:void(0)"
                        >
                            <svg
                                className="fill-current text-gray-800 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                            >
                                <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z" />
                            </svg>
                            NORDICS
                        </a>
                    </div>
                </div>
            </nav>
            <div className="carousel relative container mx-auto" style={{ maxWidth: 1600 }}>
                <div className="carousel-inner relative overflow-hidden w-full">
                    {/* Slide 1 */}
                    <input
                        className="carousel-open"
                        type="radio"
                        id="carousel-1"
                        name="carousel"
                        aria-hidden="true"
                        hidden
                        defaultChecked={true}
                    />
                    <div
                        className="carousel-item absolute opacity-0"
                        style={{ height: '50vh' }}
                    >
                        <div
                            className="block h-full w-full mx-auto pt-6 md:pt-0 md:items-center bg-cover bg-right"
                            style={{
                                backgroundImage:
                                    'url("https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")',
                            }}
                        >
                            <div className="container mx-auto">
                                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                                    <p className="text-black text-2xl my-4">
                                        Stripy Zig Zag Jigsaw Pillow and Duvet Set
                                    </p>
                                    <a
                                        className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
                                        href="javascript:void(0)"
                                    >
                                        view product
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Add other slides similarly */}
                </div>
            </div>
        </div>
    );
};

export default ViewDoctor;