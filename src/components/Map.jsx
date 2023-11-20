import { useState, useEffect } from "react";

import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps"
import { Tooltip } from "react-tooltip";
import * as d3 from 'd3';
import geojson from '../assets/custom.geo.json'
import waterAndSanitation from '../assets/water-and-sanitation.csv?url'

export default function MapChart() {
    const [waterAndSanitationData, setWaterAndSanitationData] = useState([]);
    const [content, setContent] = useState("");

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

    return (
        <div>
            <div data-tooltip-id="my-tooltip">
                <ComposableMap width={900} height={window.innerHeight - 200} projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}>
                    <Sphere stroke="#888" strokeWidth={0.2} />
                    <Graticule stroke="#aaa" strokeWidth={0.3} />
                    <Geographies geography={geojson} >
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const item = waterAndSanitationData.filter((item) => item.Entity === geo.properties.name)[0];
                                return <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    className="my-anchor-element"
                                    onMouseEnter={() => {
                                        console.log(item?.data[0]["Access to improved drinking water"])
                                        setContent(
                                            {
                                                name: geo.properties.name,
                                                data: item?.data[0]["Access to improved drinking water"]
                                            }
                                        );
                                    }}
                                    onMouseLeave={() => {
                                        setContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: item?.data[0] ? "#CBD5E1" : "#eee",
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
            <Tooltip id="my-tooltip" anchorSelect=".my-anchor-element" place="top">
                <div className="text-lg">
                    {content.name}
                </div>
                <div>
                    {content.data ? `Access to improved drinking water: ${content.data}` : "No Data"}
                </div>
            </Tooltip>
        </div >
    )
}
