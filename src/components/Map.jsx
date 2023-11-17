import { useState, useEffect } from "react";

import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps"
import { Tooltip } from "react-tooltip";
import * as d3 from 'd3';
import geojson from '../assets/custom.geo.json'
import waterAndSanitation from '../assets/water-and-sanitation.csv?url'

export default function MapChart() {
    const [data, setData] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        d3.csv(waterAndSanitation).then((data) => {
            setData(data);
        });
    }, [])
    return (
        <div>
            <div data-tooltip-id="my-tooltip">
                <ComposableMap projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}>
                    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                    <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                    <Geographies geography={geojson} >
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                return <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    className="my-anchor-element"
                                    onMouseEnter={() => {
                                        setContent(`${geo.properties.name}`);
                                    }}
                                    onMouseLeave={() => {
                                        setContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "lightblue",
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
            <Tooltip id="my-tooltip" anchorSelect=".my-anchor-element" place="top">{content}</Tooltip>
        </div>
    )
}
