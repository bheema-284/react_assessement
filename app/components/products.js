"use client"
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import ProductsList from "./productslist";
import NewPagination from "./pagination";
import ComboBox from "./combobox";
import ProductDetails from "./productdetails";
const Products = (props) => {
    const { data } = props;
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState("Best Seller");
    const [screen, setScreen] = useState("product");
    const [productDetails, setProductDetais] = useState({})
    const [pageIndex, setPageIndex] = useState(1);
    const pageLimit = 8;
    const inputRef = useRef();

    const searchData = (item) => {
        let filteredData = item.filter((i) => i.title?.toLowerCase().includes(searchText.toLowerCase()));
        if (sortBy === "Low to High") {
            filteredData.sort((a, b) => a.price - b.price);
        } else if (sortBy === "High to Low") {
            filteredData.sort((a, b) => b.price - a.price);
        } else if (sortBy === "Best Seller") {
            filteredData.sort((a, b) => Math.ceil(b.rating) - Math.ceil(a.rating));
        }
        return filteredData;
    }

    const onEnterPress = (e) => {
        if (e.key === "Enter") {
            if (inputRef.current.value.length > 2) {
                setSearchText(inputRef.current.value);
            }
            else {
                setSearchText("");
            }
        }
    };

    const deleteSearch = () => {
        inputRef.current.value = ""
        if (searchText.length >= 3) {
            setSearchText("")
        }
    }

    const indexOfLastData = pageIndex * pageLimit;
    const indexOfFirstData = indexOfLastData - pageLimit;
    const currentData = data?.slice(indexOfFirstData, indexOfLastData);

    const paginationClick = (page_number) => {
        setPageIndex(page_number);
    };

    const onSortByChange = (e) => {
        setSortBy(e)
    }

    const showDetails = (item) => {
        setScreen("details");
        setProductDetais(item)
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = searchText;
        }
    }, [searchText]);


    return (
        <div>
            {screen === "product" ?
                <div>
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between my-5">
                        <div className="sm:flex sm:items-center sm:flex-auto gap-5">
                            <h1 className="text-xl font-semibold text-gray-900">
                                Product List
                            </h1>
                            <div>
                                <div className="relative py-3 border border-gray-300 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                                        <MagnifyingGlassIcon className="h-5 fill-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={"Search By Name"}
                                        name="searchbox"
                                        className="block w-full rounded-md border-gray-300 pl-8 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        ref={inputRef}
                                        onKeyDown={onEnterPress}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <XMarkIcon className="h-4 fill-slate-400 hover:cursor-pointer" onClick={deleteSearch} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ComboBox
                                    title={"Sort By"}
                                    data={["Low to Hight", "High to Low", "Best Seller"]}
                                    onChange={onSortByChange}
                                    value={sortBy}
                                    containerStyle={"w-full"}
                                />
                            </div>
                        </div>
                    </div>
                    {data ? (
                        <>
                            <ProductsList
                                data={searchData(currentData)}
                                showDetails={showDetails}
                            />
                            <NewPagination
                                containerstyle={"w-full fixed bottom-0"}
                                totalRecords={data?.length}
                                recordsPerPage={pageLimit}
                                currentPage={pageIndex}
                                paginationClick={paginationClick}
                            />
                        </>
                    )
                        : null}
                </div> : <ProductDetails
                    data={productDetails}
                    showDetails={showDetails}
                />}
        </div>
    )
}

export default Products;