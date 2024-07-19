"use client"
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
const ProductsList = (props) => {
    const { data, showDetails } = props;
    const Star = ({ filled }) => (
        <svg className={`w-4 h-4 me-1 ${filled ? 'text-orange-500' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
    );
    return (
        !data || data.length === 0 ? <div className="mt-10">No Data Available</div> :
            <div className={`${(data.length % 2 !== 0 || data.length % 2 == 0) ? "bg-white" : "bg-slate-200"} "bg-white rounded border border-gray-200 shadow-sm overflow-hidden sm:grid sm:grid-cols-4 sm:divide-y-0"`}>
                {data?.map((item, index) =>
                    <div onClick={() => showDetails(item)} key={index} className="group relative bg-white px-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 cursor-pointer border border-gray-200">
                        <Image className="my-5 w-full aspect-[16/9] object-cover" src={item.thumbnail} alt={"image"} width={242} height={136} />
                        <div className="flex justify-between">
                            <h3 className="text-base font-semibold leading-6 text-gray-900 hover:text-red-500">
                                {item.title || "Not Available"}
                            </h3>
                            <p className="hover:text-indigo-400">{item.category}</p>
                        </div>
                        <span className="mt-2 line-clamp-3 text-sm text-gray-500 hover:text-yellow-500">
                            {item.description || "Not Available"}
                        </span>
                        <div className="flex gap-2">
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <Star key={index} filled={index < item.rating} />
                                ))}
                            </div>
                            <div className="flex items-center">
                                <ChevronDownIcon className="h-4 fill-gray-400 hover:cursor-pointer" />
                                <p className="text-sm text-green-600 hover:text-orange-600">{item.minimumOrderQuantity}</p>
                            </div>
                        </div>
                        <p className="mt-2">
                            <span className="text-base font-semibold text-gray-900">{`₹ ${item.price || 0}`}</span>
                            <span className="text-sm text-gray-600"> M.R.P: <span className="line-through">₹{(item.price * item.discountPercentage).toFixed(2)}</span> </span>
                            <span className="text-sm text-gray-900">{`(${item.discountPercentage} % off)`}</span>
                        </p>
                    </div>
                )}
            </div>
    )
}

export default ProductsList;