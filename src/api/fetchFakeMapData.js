/**
 * A complete Coordinate Pair consisting of a latitude and longitude
 * @typedef {Object} CoordinatePair
 * @property {number} longitude - longitude coordinate
 * @property {number} latitude - latitude coordinate
 */

/**
 * Generates a GeoJSON FeatureCollection of random points based on
 * the center coordinates passed in.
 * @param {CoordinatePair} centerCoordinates - the {@link CoordinatePair} for the map center
 * @return {results} GeoJSON FeatureCollection
 */
const fetchFakeMapData = centerCoordinates => {
  /**
  * Generates a random point within 0.025 radius of map center coordinates.
  * @param {CoordinatePair} centerCoordinates - the {@link CoordinatePair} for the map center
  * @return {CoordinatePair} randomly generated coordinate pair
  */
  const getRandomCoordinate = ({ longitude: centerLon, latitude: centerLat }) => {
    const r = 10 * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.pow(Math.PI, 6);
    const latitude = centerLat + r * Math.cos(theta);
    const longitude = centerLon + r * Math.sin(theta);
    return { longitude, latitude };
  };
  const newFeaturesList = [];
  for (let i = 0; i < 10; i++) {
    const id = i;
    const { longitude, latitude } = getRandomCoordinate(centerCoordinates);
    newFeaturesList.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      properties: {
        id,
        title: `Random Point #${id}`,
        description: `description for Random Point #${id}`,
        icon: `fire-station-15`
      }
    });
  }

  return Promise.resolve({
    type: "FeatureCollection",
    features: newFeaturesList
  });
};

const fetchFakeBarChartData = (labels, data) => {
  return {
    "horizontalBarData": {
      labels: labels,
      datasets: [
        {
          label: '# of Votes',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }, "optionsLocal": {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 1,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Horizontal Bar Chart',
        },
      },
    }
  };
}

export default fetchFakeMapData;

export {
  fetchFakeBarChartData
}