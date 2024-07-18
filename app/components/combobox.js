import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import React, { useState } from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
function titleCase(str) {
    if ((str === null) || (str === '') || typeof str === 'object') {
        return "";
    }
    else {
        str = str.toString();
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
}
function ComboBox(props) {
    const {
        title,
        placeholder,
        onChange,
        onBlur,
        isError,
        value,
        errormsg,
        disabled,
        required,
        data,
        textField,
        onFilterChange,
        nested,
        containerStyle,
        itemRender,
        serverFilter,
        titleTextStyle,
        displayTextStyle,
        orangeColor,
        toUpperCase,
        airportValue,
        iata
    } = props;

    const [query, setQuery] = useState('')
    const [optionSelected, setOptionSelected] = useState(false)
    const filteredData = query === '' ? data : data?.length > 0 && data?.filter((item) => textField ? (item[textField]
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, '')))
        : item
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
    );

    const mainData = serverFilter ? data : filteredData;


    return (
        <div className={containerStyle}>
            <Combobox as="div" value={value} onChange={onChange} disabled={disabled}>
                <div
                    className={`relative ${nested
                        ? `pl-3 py-1 border border-gray-400`
                        : `py-2 shadow-sm focus-within:ring-1 ${orangeColor ? "focus-within:ring-orange-500" : "focus-within:ring-red-600"} border border-gray-300 px-3`
                        }  rounded-md  ${orangeColor ? "focus-within:border-orange-500" : "focus-within:border-red-600"} ${disabled ? "opacity-50" : "opacity-100"} bg-white
              `}
                >
                    <label htmlFor="name" className="label capitalize">
                        <span className={titleTextStyle || "text-base"}>{title}</span>
                        {required ? "*" : null}
                    </label>
                    {<div className="relative mt-1">
                        <Combobox.Input
                            className={`${displayTextStyle || `text-base`} block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 mt-[0.188rem]`}
                            onChange={(event) => {
                                if (!optionSelected) {
                                    setQuery(event.target.value);
                                } else {
                                    optionSelected && setOptionSelected(false)
                                }
                                onFilterChange && onFilterChange(event, textField);
                            }}
                            required={required || false}
                            disabled={disabled || false}
                            onBlur={onBlur}
                            placeholder={placeholder || ""}
                            displayValue={(item) =>
                                item && toUpperCase ? (item[textField] ? item[textField].toUpperCase() : item.toUpperCase()) : iata ? (item[textField] ? item[textField] : item) : titleCase(item[textField] ? item[textField] : item)
                            }
                        />
                        <Combobox.Button
                            className={`absolute inset-y-0 right-0  flex items-center rounded-r-md px-2 focus:outline-none`}
                        >
                            <ChevronUpDownIcon
                                className="h-5 w-5  text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>}

                    {mainData?.length > 0 && (
                        <Combobox.Options
                            className={`absolute z-10 mt-1 max-h-60  left-0 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm [&:first-child]:rounded-t-lg [&:last-child]:rounded-b-lg`}
                        >
                            {mainData.map((item, index) => (
                                <Combobox.Option
                                    key={index}
                                    value={item}
                                    onClick={() => {
                                        !serverFilter && setQuery("")
                                        setOptionSelected(true)
                                    }}
                                    className={({ active }) =>
                                        classNames(
                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                            active ? `${orangeColor ? "bg-orange-400 text-white" : "bg-red-600 text-white"}` : "text-gray-900"
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            {itemRender ? itemRender(item, selected) : <span
                                                className={classNames(
                                                    `${airportValue ? "block" : 'block truncate'}`,
                                                    selected && "font-semibold"
                                                )}
                                            >
                                                {airportValue ?
                                                    item && toUpperCase ? item[textField] ? item?.iata.toUpperCase() + ' - ' + item[textField].toUpperCase() + ', ' + item?.city?.name : item?.iata.toUpperCase() + ' - ' + item.toUpperCase() + ', ' + item?.city?.name : item?.iata.toUpperCase() + ' - ' + titleCase(item[textField] ? item[textField] + ', ' + item?.city?.name : item?.iata.toUpperCase() + ' - ' + item + ', ' + item?.city?.name)
                                                    : item && toUpperCase ? (item[textField] ? item[textField].toUpperCase() : item.toUpperCase()) : iata ? (item[textField] ? item[textField] : item) : titleCase(item[textField] ? item[textField] : item)
                                                }
                                            </span>}

                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                        active ? "text-white" : `${orangeColor ? "text-orange-400" : "text-red-600"}`
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>

            {isError && (
                <p className={`${orangeColor ? "text-orange-600" : "text-red-600"} mt-2 text-sm`} id="email-error">
                    {errormsg}
                </p>
            )}
        </div>
    );
}



export default ComboBox;