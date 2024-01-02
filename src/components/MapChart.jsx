import { useState, useEffect } from "react";

import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps"
import { Tooltip } from "react-tooltip";
import * as d3 from 'd3';
import geojson from '../assets/custom.geo.json'
import waterAndSanitation from '../assets/water-and-sanitation.csv?url'
import { constants } from "../constants/constants";
import { scaleLinear } from "d3-scale"
import SelectBox from "./SelectBox";
import { AiOutlineLoading } from "react-icons/ai";

export default function MapChart() {
    const [loading, setLoading] = useState(false)
    const [waterAndSanitationData, setWaterAndSanitationData] = useState([]);
    const [content, setContent] = useState("");
    const [yearsSelect, setYearsSelect] = useState(constants.years[0])
    const [infoTypesSelect, setInfoTypesSelect] = useState(constants.infoTypes[0]);

    useEffect(() => {
        setLoading(true)
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
            setLoading(false)
        });
    }, [])

    return (
        <div className="bg-[#fff]">
            {loading ? (
                <div className="h-full w-full flex items-center justify-center">
                    <AiOutlineLoading className="h-20 w-20 animate-spin" />
                </div>) : (
                <div>
                    <div data-tooltip-id="my-tooltip">
                        <ComposableMap width={800} height={window.innerHeight - 440} projectionConfig={{
                            rotate: [-10, 0, 0],
                            scale: 100
                        }}>
                            <Sphere stroke="#bbb" strokeWidth={0.5} />
                            <Graticule stroke="#bbb" strokeWidth={0.5} />
                            <Geographies geography={geojson}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const colorScale = scaleLinear().domain([0, 100]).range(['#bbb', "#012A4A"])
                                        const item = waterAndSanitationData.filter((item) => item.Entity === geo.properties.name)[0];
                                        const [dataBasedYear = null] = item?.data.filter((item) => item.Year === yearsSelect) || [];
                                        let infoTypeEn = infoTypesSelect?.en;
                                        let infoTypeTr = infoTypesSelect?.tr;
                                        const dataBasedInfoType = dataBasedYear && dataBasedYear[`${infoTypeEn}`];
                                        return <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={colorScale(dataBasedInfoType)}
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
                                                    fill: dataBasedInfoType && dataBasedInfoType,
                                                    outline: "none"
                                                },
                                                hover: {
                                                    fill: "-moz-initial",
                                                    outline: "none",
                                                    stroke: "#000000",
                                                    strokeWidth: "2px"
                                                },
                                                pressed: {
                                                    fill: "#002146",
                                                    outline: "none"
                                                }
                                            }}
                                        />
                                    })
                                }
                            </Geographies>
                        </ComposableMap>
                    </div>
                    <Tooltip id="my-tooltip" style={{ background: "#ddd", color: "#000" }} anchorSelect=".my-anchor-element" place="right-start" float delayHide={200}>
                        <div className="text-base border-b-2 border-black" >
                            {content.name}
                        </div>
                        <div>
                            {`${content.infoType}: ${content?.data}`}
                        </div>
                    </Tooltip>
                    <div className="pt-4 flex flex-row justify-center gap-10">
                        <div>
                            {constants.infoTypes.map((item, index) => (
                                <div key={index} className="flex items-center mb-4">
                                    <input id={item.en} type="radio" value={item.en} name={item.en} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 hover:cursor-pointer" checked={infoTypesSelect.en === item.en} onChange={(e) => {
                                        const value = constants.infoTypes.filter((item) => item.en === e.target.value)[0]
                                        setInfoTypesSelect(value)
                                    }} />
                                    <label htmlFor={item.en} className="ms-2 text-sm font-medium text-gray-900 hover:cursor-pointer">{item.tr}</label>
                                </div>
                            ))}
                        </div>
                        <SelectBox
                            value={yearsSelect}
                            setValue={setYearsSelect}
                            options={constants.years}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
