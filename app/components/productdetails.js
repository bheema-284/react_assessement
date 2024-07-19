"use client"
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";
const ProductDetails = (props) => {
    const { data } = props;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    console.log('data: ', data);
    const Star = ({ filled }) => (
        <svg className={`w-4 h-4 me-1 ${filled ? 'text-orange-500' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
    );

    const addToCart = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }
    return (
        !data ? <div className="mt-10">No Data Available</div> :
            <div className="flex gap-5 w-3/5 m-auto sm:justify-between border border-gray=300 p-2 mt-10">
                <div className="w-[50%]">
                    <Image className="my-5 aspect-[16/9] object-cover" src={data.thumbnail} alt={"image"} width={300} height={450} />
                </div>
                <div className="w-[50%]">
                    <div className="flex justify-between">
                        <h3 className="text-base font-semibold leading-6 text-gray-900 hover:text-red-500">
                            {data.title || "Not Available"}
                        </h3>
                        <p className="hover:text-indigo-400">{data.category}</p>
                    </div>
                    <span className="mt-2 line-clamp-3 text-sm text-gray-500 hover:text-yellow-500">
                        {data.description || "Not Available"}
                    </span>
                    <div className="flex gap-2">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, index) => (
                                <Star key={index} filled={index < data.rating} />
                            ))}
                        </div>
                        <div className="flex items-center">
                            <ChevronDownIcon className="h-4 fill-gray-400 hover:cursor-pointer" />
                            <p className="text-sm text-green-600 hover:text-orange-600">{data.minimumOrderQuantity}</p>
                        </div>
                    </div>
                    <p className="mt-2">
                        <span className="text-base font-semibold text-gray-900">{`₹ ${data.price || 0}`}</span>
                        <span className="text-sm text-gray-600"> M.R.P: <span className="line-through">₹{(data.price * data.discountPercentage).toFixed(2)}</span> </span>
                        <span className="text-sm text-gray-900">{`(${data.discountPercentage} % off)`}</span>
                    </p>
                    <div className="flex justify-start items-center mt-5">
                        <button
                            type="button"
                            onClick={() => addToCart(data)}
                            className="bg-yellow-300 w-36 focus:outline-green-400 focus:ring-1 focus:shadow-lg focus:ring-green-500 focus:ring-offset-1 hover:bg-yellow-400 px-3 py-2 text-xs rounded-3xl text-black font-medium"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
                <div className="text-center m-auto w-[90%]">
                    <div
                        id="drawer-example"
                        className={`fixed border border-gray-300 rounded-lg shadow-md top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform transform bg-white w-1/3 dark:bg-gray-50 ${isDrawerOpen ? 'translate-x-0 z-50' : 'translate-x-full'}`}
                        tabIndex="-1"
                        aria-labelledby="drawer-label"
                    >
                        <div className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                            <div className="flex justify-between">
                                <h3 className="text-base font-semibold leading-6 text-gray-900 hover:text-red-500">
                                    {data.title || "Not Available"}
                                </h3>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={addToCart}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-3 left-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <div className="flex gap-5 sm:items-center">
                            <div className="px-5">
                                <div className="flex gap-3">
                                    <CheckCircleIcon width={28} height={28} className="text-green-400" aria-hidden="true" />
                                    <p className="text-base font-semibold text-gray-900">Added To the Cart</p>
                                </div>
                                <Image src={data.thumbnail} alt={"image"} width={100} height={50} />
                            </div>
                            <p>
                                <span className="text-base font-semibold text-gray-900">{`₹ ${data.price || 0}`}</span>
                                <span className="text-sm text-gray-600"> M.R.P: <span className="line-through">₹{(data.price * data.discountPercentage).toFixed(2)}</span> </span>
                                <span className="text-sm text-gray-900">{`(${data.discountPercentage} % off)`}</span>
                            </p>
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button
                                type="button"
                                onClick={() => { }}
                                className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1 items-center text-center rounded-xl text-black"
                            >
                                Proceed To Check Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ProductDetails;