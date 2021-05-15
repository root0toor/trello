import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "../css/map.css";
import fetchFakeMapData from "../api/fetchFakeMapData";

mapboxgl.accessToken = 'pk.eyJ1Ijoibml0aGlua25qYWluIiwiYSI6ImNrb2xjaDlnZTA0NmUyb3F0NWZjZnp0ZzYifQ.TGtgvNrOO3DnuNwmdXeWvA';

export default function CustomMapComponent(props) {
    const mapContainerRef = useRef(null);
    const lng = 135.6387;
    const lat = -25.6170;
    const zoom = 3;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom
        });

        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        map.on("load", async () => {
            const results = await fetchFakeMapData({ longitude: lng, latitude: lat });
            console.log(results)
            map.addSource("random-points-data", {
                type: "geojson",
                data: results
            });
            map.addLayer({
                'id': 'random-points-data',
                'type': 'symbol',
                'source': 'random-points-data',
                'layout': {
                    'icon-image': '{icon}',
                    'icon-allow-overlap': false
                }
            });
            map.on('click', 'random-points-data', function (e) {
                // console.log(props);
                props.funcToChange.dataFunc([...Array(6)].map(e => parseInt(Math.random() * 100) | 0));
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.description;
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });
        });
        return () => map.remove();
    }, [lat]);

    return (
        <div ref={mapContainerRef} className="map-container" />
    );
}