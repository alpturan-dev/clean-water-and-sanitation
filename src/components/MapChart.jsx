import { useState, useEffect } from "react";

import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps"
import { Tooltip } from "react-tooltip";
import * as d3 from 'd3';
import geojson from '../assets/custom.geo.json'
import waterAndSanitation from '../assets/water-and-sanitation.csv?url'

export default function MapChart() {
    const [waterAndSanitationData, setWaterAndSanitationData] = useState([]);
    const [content, setContent] = useState("");
    const [yearsSelect, setYearsSelect] = useState("2000")
    const [infoTypesSelect, setInfoTypesSelect] = useState({
        en: 'Access to basic drinking water',
        tr: 'Temel içme suyuna erişim'
    });

    let years = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']

    let infoTypes = [
        {
            en: 'Access to basic drinking water',
            tr: 'Temel içme suyuna erişim'
        },
        {
            en: 'Access to basic handwashing facilities',
            tr: 'Temel el yıkama tesislerine erişim'
        },
        {
            en: 'Access to basic sanitation services',
            tr: 'Temel temizlik hizmetlerine (sanitasyon) erişim'
        }
    ]

    useEffect(() => {
        d3.csv(waterAndSanitation).then((data) => {
            const groupedData = data.reduce((acc, obj) => {
                const foundEntity = acc.find(item => item.Entity === obj.Entity);

                if (foundEntity) {
                    const entityDataIndex = acc.findIndex(item => item.Entity === obj.Entity);
                    acc[entityDataIndex].data.push({
                        ...obj // Include all properties from the object
                    });
                } else {
                    acc.push({
                        Entity: obj.Entity,
                        data: [{
                            ...obj // Include all properties from the object
                        }]
                    });
                }

                return acc;
            }, []);
            console.log("groupedData", groupedData);
            setWaterAndSanitationData(groupedData);
        });
    }, [])

    // useEffect(() => {
    //     console.log("year", yearSelect)
    // }, [yearSelect])

    return (
        <div>
            <div className="flex flex-row justify-center gap-10">
                <div className="">
                    <label className="text-[#002146]">Yıl Seçin</label>
                    <select
                        className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        name="yearsSelect"
                        value={yearsSelect}
                        onChange={e => setYearsSelect(e.target.value)}
                    >
                        {years.map((item, index) =>
                            <option key={index} value={item}>{item}</option>
                        )}
                    </select>
                </div>
                <div className="">
                    <label className="text-[#002146]">Veriyi Seçin</label>
                    <select
                        className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        name="infoTypesSelect"
                        value={infoTypesSelect.en}
                        onChange={e => {
                            const value = infoTypes.filter((item) => item.en === e.target.value)[0]
                            setInfoTypesSelect(value)
                        }}
                    >
                        {infoTypes.map((item, index) =>
                            <option key={index} value={item.en}>{item.tr}</option>
                        )}
                    </select>
                </div>
            </div>

            <div data-tooltip-id="my-tooltip">
                <ComposableMap width={900} height={window.innerHeight - 300} projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}>
                    <Sphere stroke="#bbb" strokeWidth={0.5} />
                    <Graticule stroke="#bbb" strokeWidth={0.5} />
                    <Geographies geography={geojson}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const item = waterAndSanitationData.filter((item) => item.Entity === geo.properties.name)[0];
                                const [dataBasedYear = null] = item?.data.filter((item) => item.Year === yearsSelect) || [];
                                let infoTypeEn = infoTypesSelect?.en;
                                let infoTypeTr = infoTypesSelect?.tr;
                                const dataBasedInfoType = dataBasedYear && dataBasedYear[`${infoTypeEn}`];
                                return <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    className="my-anchor-element"
                                    onMouseEnter={() => {
                                        setContent(
                                            {
                                                name: geo.properties.name_tr,
                                                infoType: infoTypeTr && infoTypeTr,
                                                data: dataBasedInfoType ? dataBasedInfoType + '%' : "Veri yok."
                                            }
                                        );
                                    }}
                                    style={{
                                        default: {
                                            fill: dataBasedInfoType ? "#94A3B8" : "#eee",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#002146",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }} />
                            })
                        }
                    </Geographies>
                </ComposableMap>
            </div>
            <Tooltip id="my-tooltip" anchorSelect=".my-anchor-element" place="top" float delayHide={200}>
                <div className=" text-base">
                    {content.name}
                </div>
                <div>
                    {`${content.infoType}: ${content?.data}`}
                </div>
            </Tooltip>
        </div>
    )
}
